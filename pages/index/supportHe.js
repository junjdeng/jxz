const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    selectIndex: 0,
    textareaMaxCounts:30,
    textareacurrentCounts:0
  },
  selectNum: function (e) {
    this.setData({
      selectIndex: e.currentTarget.dataset.index
    })
  },
  textareaInput: function (event){
    // console.log(event.detail);
    var textareaValue = event.detail.value
    if (event.detail.cursor>this.data.textareaMaxCounts){
      wx.showToast({
        title: '留言最多'+this.data.textareaMaxCounts+'个字！',
        icon: 'none',
        duration: 1000
      })
      textareaValue = textareaValue.substr(0, textareaValue.length - 1)
   }

    this.setData({
      textareacurrentCounts: event.detail.cursor,
      textareaValue: textareaValue
    })
  },
  getOrderDetail: function () {
    var _this = this
    djRequest.djPost("/activityOrderDetail", { "order_sn": _this.data.order_sn }, function (res) {
      if (res.code == 0) {
        console.log(res);
        _this.setData({
          order: res.data,
        })
      }
    });
  },
  formSubmit: function (e) {
    //console.log(e.detail.value);
    var data = e.detail.value;
    if (!util.isNotNull(data.total_amount, "支持金额")) return;
    if (data.total_amount > (this.data.order.total_amount - this.data.order.paid_amount)) {
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
              util.djToast("您已经成功支持了TA!")
              wx.navigateBack();
            },
            fail(res) {
              util.djToast("支付失败！")
              wx.navigateBack();
            }
          })
        } else {
          util.djToast(_res.msg)
        }
      })
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
    this.setData({
      order_sn: options.order_sn
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

  }
})