const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  data: {
    comlist: [],
    start: 0,
    limit: 100,
    haveNext: 1,
  },

  getMomentList: function () {
    var _this = this
    djRequest.djPost("/myMoment", { "start": _this.data.start, "limit": _this.data.limit }, function (res) {
      if (res.code == 0) {
        console.log(res);
        var tempArr = _this.data.comlist.concat(res.data.list)
        _this.setData({
          comlist: tempArr,
          haveNext: res.data.have_next,
        })
      }
    });
  },

  preImage:function(e){
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.url] // 需要预览的图片http链接列表
    })
  },

  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function (options) {
     this.getMomentList();
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