const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    list: [],
    haveNext: 0,
  },
  navTo: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },
  getOrderList: function () {
    var _this = this
    //"state": "success",    //订单状态 paying=进行中 success=成功 fail=失败
    // "buy_type": 1    //0自付  1众筹  不传默认所有
    djRequest.djPost("/activityOrderList", { "start": 0, "limit": 200, "state": "success", "buy_type": 0 }, function (res) {
      if (res.code == 0) {
        console.log(res);
        _this.setData({
          list: res.data.list,
        })
      }
    });
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
     this.getOrderList();
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