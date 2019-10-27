const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  data: {
    list:[]
  },
  navTo: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },

  getLinkManList: function () {
    var _this = this
    djRequest.djPost("/linkmanList", { "start": 0, "limit": 200 }, function (res) {
      if (res.code == 0) {
        // console.log(res);
        _this.setData({
          list: res.data.list,
        })
      }
    });
  },

  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function (options) {
    
  },
  onReady: function () {

  },
  onShow: function () {
    this.getLinkManList();
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