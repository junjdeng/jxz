const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');

Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    current: 'tab1',
    activity_id:"",
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
  getRangeList: function (type) {
    var _this = this
    djRequest.djPost("/getActivityRankList", { "start": 0, "limit": 100, "type": type, "activity_id": _this.data.activity_id }, function (res) {
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
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
    this.setData({
      activity_id: options.activity_id
    })
    this.getRangeList("speed");
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