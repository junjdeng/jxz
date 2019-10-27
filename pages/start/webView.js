const app = getApp()
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    url: ""
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
    // console.log(options.url);
    this.setData({
      url: options.url
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