const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');

Page({
  data: {
    userinfo:null,
    visible: false,
    current: 'tab1',
    sum:0,
    list1: [],
    list2: [],
    showsum:0,
  },
  navTo: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },
  showModal1(){
    this.setData({
      visible: false
    });
  },
  showModal() {
   if (this.data.userinfo.bank_card.length == 0) { util.djToast("您先完善提现银行卡信息！");  return; } 
   if (this.data.sum < 1) { util.djToast("您暂时没有可提现的积分！");  return; } 

   var _this = this;
   if(_this.data.visible == false){
     wx.showModal({
       title: '申请积分提现',
       content: '本次提现积分：' + _this.data.sum + '积分',
       success(res) {
         if (res.confirm) {
          _this.applyWithDraw();
         } else if (res.cancel) {
           // console.log('用户点击取消')
         }
       }
     })
   }else{
     _this.setData({
       visible: !_this.data.visible
     });
   }
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    if (detail.key == "tab1") {
      this.getLogList()
    } else if (detail.key == "tab2") {
      this.getPromotionCashLog()
    } 
  },
  applyWithDraw: function () {
    var _this = this
    _this.setData({
      showsum: _this.data.sum
    })
    djRequest.djGet("/newPromotionCash", { "amount": _this.data.sum}, function (res) {
     // console.log(res);
      if (res.code == 0) {
        _this.setData({
          sum:0,
          visible: !_this.data.visible
        });
      }else{
        util.djToast(res.msg);
      }
    });
  },
  getLogList: function () {
    var _this = this
    djRequest.djGet("/promotionLog", { "start": "0", "limit": "10" }, function (res) {
      console.log(res);
      if (res.code == 0) {
        _this.setData({
          list1: res.data.list,
          sum:res.data.sum
        })
      }
    });
  },
  getPromotionCashLog: function () {
    var _this = this
    djRequest.djGet("/promotionCashLog", { "start": "0", "limit": "10" }, function (res) {
      console.log(res);
      if (res.code == 0) {
        _this.setData({
          list2: res.data.list
        })
      }
    });
  },
  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function (options) {
    this.setData({
      userinfo: app.globalData.loginUserInfo
    })
    this.getLogList()
  },
  onReady: function () {

  },
  onShow: function () {
    this.setData({
      userinfo: app.globalData.loginUserInfo
    })
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