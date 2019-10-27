const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    list:[],
    selectIndex: 0
  },
  radioChange(e) {
    this.setData({
      selectIndex: e.detail.value
    })
  },
  sureClick(e) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      selectedIndex: e.currentTarget.dataset.index,
      selectMatch: this.data.list[e.currentTarget.dataset.index]
    })
    wx.navigateBack()
  },

  //赛事列表
  getMatchList: function () {
    var _this = this
    djRequest.djPost("/matchList", { "start":0, "limit": 999 }, function (res) {
      console.log(res);
      if (res.code == 0) {
        _this.setData({
          list: res.data.list
        })
      }
    });
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
     this.setData({
       selectIndex: prevPage.data.selectedIndex
    })
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

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})