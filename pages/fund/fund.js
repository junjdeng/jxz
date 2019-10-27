const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    current: 'tab1',
    state: "paying",
    list1:[],
    list2:[],
    list3:[],
    haveNext: 0,
  },
  handleChange({ detail }) {
    var state = "paying"
    if(detail.key == "tab1"){
      state = "paying"
    } else if (detail.key == "tab2"){
      state = "success"
    } else if (detail.key == "tab3") {
      state = "fail"
    }
    this.setData({
      current: detail.key,
      state:state
    });
    this.getOrderList();
  },
  navTo: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },

  getOrderList:function(){
    var _this = this
    //"state": "success",    //订单状态 paying=进行中 success=成功 fail=失败
    // "buy_type": 1    //0自付  1众筹  不传默认所有
    djRequest.djPost("/activityOrderList", { "start": 0, "limit": 200, "state": _this.data.state,"buy_type": 1}, function (res) {
      if (res.code == 0) {
         console.log(res);
        if (_this.data.current == "tab1") {
          _this.setData({
            list1: res.data.list,
          })
        } else if (_this.data.current == "tab2") {
          _this.setData({
            list2: res.data.list,
          })
        } else if (_this.data.current == "tab3") {
          _this.setData({
            list3: res.data.list,
          })
        }
      }
    });
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
     
  },
  onReady: function () {

  },
  onShow: function () {
    this.getOrderList();
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