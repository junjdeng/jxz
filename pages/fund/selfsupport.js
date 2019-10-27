const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    //current: 'tab1'
    reset:0,
    order_sn:null
  },
  // handleChange({ detail }) {
  //   this.setData({
  //     current: detail.key
  //   });
  // },

  formSubmit:function(e){
    console.log(e.detail.value);
    var data = e.detail.value;
    if (!util.isNotNull(data.total_amount, "支持金额")) return;
    if (data.total_amount > this.data.reset) {
      util.djToast("支持金额不能大于最大支持金额")
      return
    }

    var _this = this
    djRequest.djPost("/supportActivityOrder", data,
      function (res) {
        console.log(res);
        var _res = res;
        if (res.code == 0) {
            var pay_data = res.data.pay_data;
            wx.requestPayment({
              timeStamp: String(pay_data.timeStamp),
              nonceStr: pay_data.nonceStr,
              package: pay_data.package,
              signType: 'MD5',
              paySign: pay_data.paySign,
              success(res) {
                wx.navigateBack();
              },
              fail(res) {
                wx.navigateBack();
              }
          })
        }else{
          util.djToast(_res.msg)
        }
      })
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
    this.setData({
      reset:options.reset,
      order_sn: options.order_sn
    })
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