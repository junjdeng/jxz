const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    supportList: [],     
  },
  getSupportList: function (order_sn) {
    var _this = this
    djRequest.djPost("/getSupportList", { "start": 0, "limit": 100, "order_sn": order_sn }, function (res) {
      if (res.code == 0) {
        console.log(res);
        _this.setData({
          supportList: res.data.list,
        })
      }
    });
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
    this.getSupportList(options.order_sn);
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