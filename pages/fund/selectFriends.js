const app = getApp()
const djRequest = require('../../utils/request.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    list: [],
    index: 0,
    selectIndexArr: [],
  },

  checkboxChange(e) {
   // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      selectIndexArr: e.detail.value
    })
  },

  getLinkManList: function() {
    var _this = this
    djRequest.djPost("/linkmanList", {
      "start": 0,
      "limit": 200
    }, function(res) {
      if (res.code == 0) {
        //console.log(res);
        var list = res.data.list;
        for (var i = 0; i < list.length; i++) {
          var obj = list[i];
          if (_this.data.selectIndexArr.indexOf(obj.id) > -1) {
            obj.checked = true
          } else {
            obj.checked = false
          }
        }
        // console.log(list);
        _this.setData({
          list: list,
        })
      }
    });
  },
  sureClick() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      selectedIndexs: this.data.selectIndexArr
    })
    wx.navigateBack()
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function(options) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    var arr = prevPage.data.selectedIndexs;
    var tempArr = [];
    for(var i = 0; i < arr.length; i++){
        tempArr.push(parseInt(arr[i]));
    }
    this.setData({
      selectIndexArr: tempArr
    })
    this.getLinkManList();
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