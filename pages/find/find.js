const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    current: 'tab1',
    comlist: [],
    artlist: [],
    videolist: [],
    start: 0,
    limit: 10,
    haveNext: 1,
    isFromBackAdd:false
  },

  preImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.url] // 需要预览的图片http链接列表
    })
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key,
      comlist: [],
      artlist: [],
      videolist: [],
      start: 0,
      haveNext: 1
    });
    if (detail.key == 'tab1'){
      this.getMomentList();
    } else if (detail.key == 'tab2'){
      this.getArticleList();
    } else if (detail.key == 'tab3'){
      this.getVideoList();
   }
  },

  navTo: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },

  getMomentList: function () {
    var _this = this
    djRequest.djPost("/momentList", { "start": _this.data.start, "limit": _this.data.limit }, function (res) {
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

  getVideoList: function () {
    var _this = this
    djRequest.djPost("/videoList", { "start": _this.data.start, "limit": _this.data.limit }, function (res) {
      if (res.code == 0) {
        console.log(res);
        var tempArr = _this.data.videolist.concat(res.data.list)
        _this.setData({
          videolist: tempArr,
          haveNext: res.data.have_next,
        })
      }
    });
  },

  getArticleList: function () {
    var _this = this
    djRequest.djPost("/articleList", { "start": _this.data.start, "limit": _this.data.limit }, function (res) {
      if (res.code == 0) {
        console.log(res);
        var tempArr = _this.data.artlist.concat(res.data.list)
        _this.setData({
          artlist: tempArr,
          haveNext: res.data.have_next,
        })
      }
    });
  },

  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
    this.getMomentList();
  },
  onReady: function () {

  },
  onShow: function () {
    if (this.data.isFromBackAdd){
      this.setData({
        current: "tab1"
      })
      this.onPullDownRefresh();
    }
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {
    this.setData({
      start: 0,
      haveNext:1
    })
    if (this.data.current == 'tab1') {
      this.setData({
        comlist: []
      })
      this.getMomentList();
    } else if (this.data.current == 'tab2') {
      this.setData({
        artlist: []
      })
      this.getArticleList();
    } else if (this.data.current == 'tab3') {
      this.setData({
        videolist: []
      })
      this.getVideoList();
    }
  },
  onReachBottom: function () {
    if(this.data.haveNext == 0){
      return;
    }

    this.setData({
      start: this.data.start + this.data.limit
    })

    if (this.data.current == 'tab1') {
      this.getMomentList();
    } else if (this.data.current == 'tab2') {
      this.getArticleList();
    } else if (this.data.current == 'tab3') {
      this.getVideoList();
    }
  },
  onShareAppMessage: function () {

  }
})