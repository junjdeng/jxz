const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  data: {
      list:[]
  },
  
  getMyTripInfo:function(){
    var _this = this
    djRequest.djGet("/getLastActivity", {}, function (res) {
      if (res.code == 0) {
        // console.log(res);
        _this.setData({
          list:res.data.list
        })
      }
    });

  },
  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function (options) {
    this.getMyTripInfo();
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