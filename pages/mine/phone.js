const app = getApp()
Page({
  data: {
     phone:""
  },
  navTo: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },

  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function (options) {
    
  },
  onReady: function () {

  },
  onShow: function () {
    this.setData({
      phone: app.globalData.userPhone
    })
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})