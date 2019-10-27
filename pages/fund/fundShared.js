const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');
var config = require('../../utils/config.js');
Page({
  data: {
    current: 'tab1',
    visible: false,
    attr: false,
    share: true,
    order_sn: null,
    order: null,
    resetTime: "",
    supportList: [],
    rangeList1: [],
    rangeList2: [],
    rangeList3: [],
    my_rank: null
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    if (detail.key == "tab1") {
      this.getRangeList("speed");
    } else if (detail.key == "tab2") {
      this.getRangeList("popular");
    } else if (detail.key == "tab3") {
      this.getRangeList("rich");
    }
  },
  showModal() {
    this.setData({
      visible: !this.data.visible
    });
  },
  navTo: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },

  swithchTo: function (e) {
    wx.switchTab({
      url: e.currentTarget.dataset.url 
    })
  },

  
  getOrderDetail: function () {
    var _this = this
    djRequest.djPost("/activityOrderDetail", { "order_sn": _this.data.order_sn }, function (res) {
      if (res.code == 0) {
        //console.log(res);
        var date3 = new Date(res.data.end_date).getTime() - new Date().getTime()  //时间差的毫秒数
        var days = Math.floor(date3 / (24 * 3600 * 1000)) +2;
        _this.setData({
          order: res.data,
          resetTime: days
        })
        _this.getSupportList();
        _this.getRangeList("speed");
        wx.clearStorage("shared_order_sn");
      }
    });
  },

  getSupportList: function () {
    var _this = this
    djRequest.djPost("/getSupportList", { "start": 0, "limit": 5, "order_sn": _this.data.order_sn }, function (res) {
      if (res.code == 0) {
        console.log(res);
        _this.setData({
          supportList: res.data.list,
        })
      }
    });
  },

  getRangeList: function (type) {
    var _this = this
    djRequest.djPost("/getActivityRankList", { "start": 0, "limit": 5, "type": type, "activity_id": _this.data.order.activity_id }, function (res) {
      if (res.code == 0) {
        //  console.log(res);
        if (_this.data.current == "tab1") {
          _this.setData({
            rangeList1: res.data.list,
            my_rank: res.data.my_rank
          })
        } else if (_this.data.current == "tab2") {
          _this.setData({
            rangeList2: res.data.list,
            my_rank: res.data.my_rank
          })
        } else if (_this.data.current == "tab3") {
          _this.setData({
            rangeList3: res.data.list,
            my_rank: res.data.my_rank
          })
        }
      }
    });
  },

  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function (options) {
    if (options.refer != undefined && options.refer != ''){
      config.Refer = options.refer
    }
    this.setData({
      order_sn: options.order_sn
    })

    wx.setStorage({
      key: 'shared_order_sn',
      data: options.order_sn,
    })

    this.getOrderDetail();
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
    this.newActivityShare();
    return {
      title: '践行师邀请您参与' + this.data.order.title + '的众筹活动，知行合一，从我做起！！',
      path: 'pages/fund/fundShared?order_sn=' + this.data.order_sn,
    };
  },
  newActivityShare: function () {
    var _this = this
    djRequest.djPost("/newActivityShare", { "activity_id": _this.data.order.activity_id }, function (res) {
      if (res.code == 0) {
        console.log(res);
      }
    });
  },
})