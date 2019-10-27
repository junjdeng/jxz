const app = getApp()
const util = require('../../utils/util.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    register:null
  },
  formSubmit:function(e){
    var data = e.detail.value;
    //console.log('form发生了submit事件，携带数据为：', data)
    // 校验表单
    if (!util.isNotNull(data.name, "姓名")) return;
    if (!util.isNotNull(data.id_card, "身份证号")) return;
    if (!util.isNotNull(data.phone, "手机号")) return;
    if (!util.availablePhone(data.phone)) return;
    if (!util.isNotNull(data.address, "联系地址")) return; 
    wx.setStorage({
      key: 'register',
      data: data,
    })
    wx.navigateBack()
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
    var _this = this
    wx.getStorage({
      key: 'register',
      success: function (res) {
       // console.log(res.data)
        _this.setData({
          register: res.data
        })
      }
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