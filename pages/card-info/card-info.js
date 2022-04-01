// pages/card/card-info/card-info.js
// import { dg, requestUtil, API_HOST, _DuoguanData, _} from '../export.js';

Page({
  data: {
    glo_is_load:true
  },
  onLoad: function(options) {
    console.log(11111)
    console.log(options);
    let avatarUrl = options.avatarUrl;
    let user_name = options.user_name;
    let user_zhiwu = options.user_zhiwu;
    let user_gongsi = options.user_gongsi;
    let user_phone = options.user_phone;
    let user_email = options.user_email;
    let user_address = options.user_address;
    let user_jianjie = options.user_jianjie;
    let user_card_info={};
    user_card_info.avatarUrl = avatarUrl;
    user_card_info.user_true_name = user_name;
    user_card_info.user_zhiwu = user_zhiwu;
    user_card_info.user_gongsi = user_gongsi;
    user_card_info.user_true_phone = user_phone;
    user_card_info.user_email = user_email;
    user_card_info.address = user_address;
    user_card_info.user_jianjie = user_jianjie;
    this.setData({
      user_card_info: user_card_info,
      glo_is_load:false
    })

  },
  onReady: function() {

  },
  onShow: function() {

  },

  initgetCardMyInfo: function(data) {
    var that = this;

    that.setData({
      card_info: data,
    })
    wx.hideToast();
    //它人的名片
    var data = {
      cid: that.data.this_card_id,
      _: Date.now()
    };
    let requestUrl = this.data.baseUrl + "/Api/getUserCard.html";
    requestUtil.get(requestUrl, data, (Info) => {
      that.initgetCardUserInfo(Info);
      this.setData({
        imglist: Info.imglist || []
      })
    }, that)
  },

  //获取用户信息
  initgetCardUserInfo: function(data) {
    var that = this
    var myCard = that.data.card_info;
    var my_name = '';
    if (myCard.id > 0) {
      my_name = myCard.user_true_name
    } else {
      my_name = myCard.nickname
    }
    that.setData({
      user_card_info: data,
      g_share_title: my_name + '向您推荐了' + data.user_true_name,
      glo_is_load: false
    })
    wx.setNavigationBarTitle({
      title: data.user_true_name + '的名片'
    })
  },

  //view操作
  card_view_bind: function(e) {
    var that = this

  },
  initgetCardViewInfo: function(data) {
    var that = this
    that.setData({
      btn_disabled: false,
      submitIsLoading: false,
    })
    var data = {
      _: Date.now()
    };
    let requestUrl = this.data.baseUrl + "/Api/getMyCard.html";
    requestUtil.get(requestUrl, data, (data) => {
      that.initgetCardMyInfo(data)
    }, that);
  },
  //打电话
  call_phone_bind: function(e) {
    var t_phone = e.currentTarget.id;
    if (t_phone != '') {
      wx.makePhoneCall({
        phoneNumber: t_phone
      })
    }
  },
  onShareAppMessage: function() {
    var that = this
    return {
      title: that.data.g_share_title,
      desc: '',
      path: '/pages/card/card-info/card-info?cid=' + that.data.this_card_id
    }
  },
  import_myphone_bind: function() {
    var that = this;
    wx.addPhoneContact({
      firstName: that.data.user_card_info.user_true_name || '',
      organization: that.data.user_card_info.user_gongsi || '',
      title: that.data.user_card_info.user_zhiwu || '',
      mobilePhoneNumber: that.data.user_card_info.user_true_phone || '',
      email: that.data.user_card_info.user_email || ''
    });
  },
  //预览图片
  previewImg: function(e) {
    let index = e.currentTarget.dataset.index;
    let images = this.data.imglist;
    wx: wx.previewImage({
      current: images[index],
      urls: images,
    })
  },

  go_home_bind: function() {
    let url = '/pages/card/card';
    wx.switchTab({
      url: url,
      fail: function() {
        wx.navigateTo({
          url: url
        })
      }
    })
  },

  goHomePage: function(e) {
      wx.switchTab({
        url: '/pages/home/home',
      })
  },

  /**
   * 地图上显示信息
   */
  openLocation: function(e) {
    let dataset = e.currentTarget.dataset;
    let latitude = parseFloat(dataset.latitude || 0);
    let longitude = parseFloat(dataset.longitude || 0);
    let address = dataset.address;
    let name = "我的地址";
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      address: address,
      name: name,
    });
  },
})