const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({
  data: {
    phone:"",
    isSended:false,
    sendTips:"获取验证码",
    cerCode:""
  },

  navTo: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },

  phoneChange:function(e){
    this.setData({
      phone:e.detail.value
    })
  },

  cerCodeChange:function(e){
    this.setData({
      cerCode: e.detail.value
    })
  },

  //发送短信验证码
  sendCode: function () {
    if (this.data.isSended) return;
    if (!util.availablePhone(this.data.phone)) return;
   
    var limitTime = 60
    var set = setInterval(function () {
      _this.setData({
        isSended: true,
        sendTips: "(" + --limitTime + ")秒后重新获取"
      })
    }, 1000);

    setTimeout(function () {
      _this.setData({
        isSended: false,
        sendTips: "获取验证码"
      })
      clearInterval(set);
    }, 60000);
  
    var _this = this
    djRequest.djPost("/sendSms", {"phone": this.data.phone, "sms_type":"bind_phone"}, function (res) {
      if (res.code == 0) {
        console.log(res);
        util.djToast("验证码已发送，请注意查收！")
      }else{
        util.djToast(res.msg);
        _this.setData({
          isSended: false,
          sendTips: "获取验证码"
        })
        clearInterval(set);
      }
    });
  },

  sureBlind:function(){
    if (!util.availablePhone(this.data.phone)) return;
    if (!util.isNotNull(this.data.cerCode,"验证码")) return;
    
    var _this = this
    djRequest.djPost("/bindPhone", { "phone": _this.data.phone, "code": _this.data.cerCode }, function (res) {
      if (res.code == 0) {
       // console.log(res);
        app.globalData.userPhone = _this.data.phone
        wx.navigateBack();
      }else{
        util.djToast(res.msg);
      }
    });
  },
  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function (options) {

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