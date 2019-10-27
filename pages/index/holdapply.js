const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    selectedIndex: 0,
    selectMatch: null,
    visible: false,
    contact_list:[]
  },
  showModal(){
    this.setData({
      visible: !this.data.visible
    });
  },
  navTo: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },
  sureKnow:function(){
    this.showModal();
    wx.navigateBack({
      delta: 2
    })
  },
  formSubmit: function (e) {
    var data = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', data)
    // 校验表单
    if (!util.isNotNull(data.match_id, "赛事信息选择")) return;
    if (!util.isNotNull(data.company, "申办单位")) return;
    if (!util.isNotNull(data.people_count, "预计人数")) return;
    if (!util.isNotNull(data.phone, "手机号")) return;
    if (!util.availablePhone(data.phone)) return;

    var _this = this
    djRequest.djPost("/applyActivity", data, function (res) {
      console.log(res);
      if (res.code == 0) {
       _this.showModal();
      }
    });
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
    var _this = this;
     wx.getStorage({
       key: 'contact_list',
       success: function(res) {
         _this.setData({
           contact_list:res.data
         })
       },
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