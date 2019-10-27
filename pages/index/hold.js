const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    html:""
  },
  navTo: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },

  getHoldConfig: function () {
    var _this = this
    djRequest.djGet("/getHoldConfig", {}, function (res) {
      //console.log(res);
      if (res.code == 0) {
        _this.setData({
          html: res.data.content.replace(/\<img/gi, '<img style="width:100% !important;height:auto" '),
        })

        wx.setStorage({
          key: 'contact_list',
          data: res.data.contact_list,
        })
      }
    });
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
    this.getHoldConfig();
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