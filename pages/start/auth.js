const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onGotUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo;
    app.globalData.encryptedData = e.detail.encryptedData;
    app.globalData.iv = e.detail.iv;

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      isFromBack: true
    })
    // prevPage.login();
    //最后，记得返回刚才的页面
    wx.navigateBack()
  },

  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function (options) {
   
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