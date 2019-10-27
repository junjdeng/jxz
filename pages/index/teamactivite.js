const app = getApp()
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    group_url:""
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
    var _this = this;
    wx.getStorage({
      key: 'sysConfig',
      success: function(res) {
        _this.setData({
          group_url: res.data.group_url
        })
      },
    })
  },
  onReady: function () {

  },
  onShow: function () {

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