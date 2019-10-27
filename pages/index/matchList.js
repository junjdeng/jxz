const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    list:[],
    start: 0,
    limit: 10,
    haveNext: 1,
  },
  navTo: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },
  //赛事列表
  getMatchList: function () {
    var _this = this
    djRequest.djPost("/matchList", { "start": _this.data.start, "limit": _this.data.limit }, function (res) {
      console.log(res);
      if (res.code == 0) {
        var tempArr = _this.data.list.concat(res.data.list)
        _this.setData({
          list: tempArr,
          haveNext: res.data.have_next,
        })
      }
    });
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
    this.getMatchList();
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
    this.setData({
      start: 0,
      haveNext: 1,
      list: []
    })
    this.getMatchList();
  },
  onReachBottom: function () {
    if (this.data.haveNext == 0) {
      return;
    }
    this.setData({
      start: this.data.start + this.data.limit
    })
    
    this.getMatchList();
  },
  onShareAppMessage: function () {

  }
})