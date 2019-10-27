const app = getApp()
const djRequest = require('../../utils/request.js');
const config = require('../../utils/config.js');
const util = require('../../utils/util.js');

Page({
  data: {
    isFromBack:false
  },
  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function(options) {
    // 获取用户信息
    var _this = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              util.login()
            }
          })
        } else {
          wx.navigateTo({
            url: '../start/auth',
          })
        }
      }
    })
  },
  onReady: function() {

  },
  onShow: function() {
     if(this.data.isFromBack){
       util.login();
     }
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  }
})