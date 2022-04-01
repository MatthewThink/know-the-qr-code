// pages/card/card.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    glo_is_load: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let user_card = wx.getStorageSync("user_card");
    let userInfo = wx.getStorageSync("userInfo");
    this.setData({
      glo_is_load: false,
      card_info: user_card ? user_card : "",
      userInfo: userInfo
    })
  },
  cardEdit:function(){
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo){
      wx.navigateTo({
        url: '/pages/card-edit/card-edit',
      })
    }else{
      wx.showToast({
        icon: "none",
        title: '您拒绝了授权,请前往个人中心重新授权',
        duration: 2500
      })
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    let user_card = wx.getStorageSync("user_card");
    let userInfo = wx.getStorageSync("userInfo");
    return {
      title: '你好,这是我的名片,请惠存',
      path: '/pages/card-info/card-info?avatarUrl=' + userInfo.avatarUrl + "&user_name=" + user_card.user_name + "&user_zhiwu=" + user_card.user_zhiwu + "&user_gongsi=" + user_card.user_gongsi + "&user_phone=" + user_card.user_phone + "&user_email=" + user_card.user_email + "&user_address=" + user_card.user_address + "&user_jianjie=" + user_card.user_jianjie
    }
  },
  onGotUserInfo:function(e){
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {return;}
    let data = e.detail.userInfo;
    if (!data){
      wx.showToast({
        icon:"none",
        title: '拒绝授权,请前往个人中心重新授权',
        duration:2500
      })
    }else{
      wx.setStorageSync("userInfo", e.detail.userInfo);
      wx.navigateTo({
        url: '../card-edit/card-edit',
      })
    }
   
  },
  // edit_card_bind: function(e) {
  //   console.log(1212)
  //   let userInfo= wx.getStorageSync("userInfo");
  //   if (userInfo){
  //     wx.navigateTo({
  //       url: '/pages/card-edit/card-edit',
  //     })
  //   }else{
  //     wx.showToast({
  //       icon: "none",
  //       title: '您拒绝了授权,请前往个人中心重新授权',
  //       duration: 2500
  //     })
  //   }
  
  // },
  //递名片摁钮
  show_share_bind: function() {
    var that = this
    that.setData({
      is_show_share: true
    })
    setTimeout(function() {
      that.hide_share_bind();
    }, 1000)
  },
})