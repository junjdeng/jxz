const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    id:null,
    artData:{},
    html: ''
  },
  getArticleInfo: function () {
    var _this = this
    djRequest.djPost("/articleInfo", { "id": _this.data.id}, function (res) {
      if (res.code == 0) {
        _this.setData({
          artData: res.data,
          html: res.data.content.replace(/\<img/gi, '<img style="width:100%;height:auto" '),
        })
      }
    });
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getArticleInfo() 
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