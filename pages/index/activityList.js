const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
     id:null,
     list:[],
     match:null,
     haveNext: 0
  },
  navTo: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },

  getActivityList: function () {
    var _this = this
    djRequest.djPost("/activityList", { "match_id": _this.data.id, "start": 0,"limit": 100 }, function (res) {
      if (res.code == 0) {
        _this.setData({
          list: res.data.list
        })
      }
    });
  },

  getMatchDetail: function () {
    var _this = this
    djRequest.djPost("/matchInfo", { "id": _this.data.id }, function (res) {
      if (res.code == 0) {
        _this.setData({
          match: res.data,
        })
      }
    });
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.getActivityList();
    this.getMatchDetail();
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