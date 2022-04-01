// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo){
      this.setData({
        userInfo: userInfo
      })
    }
  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  url_tongbu_tap:function(e){
    console.log(e);
    var that=this;
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo){
      wx.showToast({
        icon: "none",
        title: '当前已同步微信信息',
        duration: 2500
      })
    }else{
      wx.setStorageSync("userInfo", e.detail.userInfo);
      that.setData({
        userInfo: e.detail.userInfo
      })
      wx.showToast({
        icon:"none",
        title: '已同步微信信息',
        duration:2500
      })
    }
    
  },
  mycollect_tap:function(){
    wx.showToast({
      icon:"none",
      title: '暂无收藏',
      duration:2500
    })
  },
  authorize_tap:function(){
    wx.openSetting({
      
    })
  },
  update_app_tap:function(){
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate);
      if (!res.hasUpdate){
         wx.showToast({
           icon:"none",
           title: '当前已是最新版',
           duration:2500
         })
      }
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })
  }
})