const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    current: "tab1",
    act:null,
    resetTime:"",
    timerID:null,
    status:"报名已截止",
    activity_id:""
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },
  navTo: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },

  myHelper:function(){
    var _this = this
    djRequest.djPost("/checkActivityOrder", { "activity_id": _this.data.activity_id }, function (res) {
        console.log(res);
      if (res.code == 0) {
        if (res.data.order_sn == ""){
          wx.navigateTo({
            url: '../../pages/index/sureOrder?type=1&save_info=0'
          })
        }else{
          wx.navigateTo({
            url: '/pages/fund/fundDetail?order_sn=' + res.data.order_sn +'&type=1save_info=0'
          })
        }
      }
    })
  },

  getActivityDetail: function(id) {
    var _this = this
    djRequest.djPost("/activityDetail", { "id": id}, function (res) {
      //  console.log(res);
      if (res.code == 0) {
        _this.setData({
          act:res.data
        })
        //缓存战队列表
        wx.setStorage({
          key: 'team_list',
          data: res.data.team_list,
        })

        //缓存活动
        wx.setStorage({
          key: 'act',
          data: res.data,
        })
        _this.setAInterval();
      }
    })
  },

  setAInterval:function(){
    var date1 = new Date();  //开始时间
    var date2 = new Date(this.data.act.end_date);    //结束时间
    var date3 = 24 * 3600 * 1000 + (date2.getTime() - date1.getTime())   //时间差的毫秒数
    var _this = this;
    var timerID =  setInterval(function(){
       date3 = date3-1000
      _this.setData({
        resetTime: util.getResetDHMS(date3)
      })
    },1000)

    _this.setData({
      timerID:timerID
    })
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function(options) {
    this.setData({
      status:options.status,
      activity_id: options.id
    })
    this.getActivityDetail(options.id);
  },
  onReady: function() {

  },
  onShow: function() {

  },
  onHide: function() {

  },
  onUnload: function() {
    clearInterval(this.data.timerID);
  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  }
})