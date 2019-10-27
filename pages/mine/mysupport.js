const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  data: {
     list:[],
  },
  getMySupportList: function() {
    var _this = this
    djRequest.djGet("/getMySupport", {}, function(res) {
      if (res.code == 0) {
        _this.setData({
          list:res.data.list
        })
      }
    });
  },
  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function(options) {
    this.getMySupportList();
  },
  onReady: function() {

  },
  onShow: function() {

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