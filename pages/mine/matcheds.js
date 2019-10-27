const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({
  data: {
    list: [],
    haveNext:0
  },
  getOrderList: function() {
    var _this = this
    djRequest.djPost("/activityOrderList", {
      "start": 0,
      "limit": 200,
      "state": "finish"
    }, function(res) {
      if (res.code == 0) {
       // console.log(res);
        _this.setData({
          list: res.data.list,
        })
      }
    });
  },

  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function(options) {
     this.getOrderList();
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