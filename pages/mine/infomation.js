// pages/mine/infomation.js
const app = getApp()
const djRequest = require('../../utils/request.js')
const util = require('../../utils/util.js')
Page({
  data: {
    birthday: util.getCurrentDate(),
    area: ['广东省', '广州市', '海珠区'],
    cover:"",
    selected_img:"",
    name:""
  },
  bindDateChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birthday: e.detail.value
    })
  },

  bindRegionChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      area: e.detail.value,
    })
  },

  selectImg() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var filePath = res.tempFilePaths[0];
        that.setData({
          selected_img: filePath,
        });
        //上传图片
        djRequest.djUpload(filePath, function (res) {
          console.log(JSON.parse(res));
          res = JSON.parse(res);
          if (res.code == 0) {
            that.setData({
              cover: res.data.filename,
            });
          }
        })
      },
      fail: function (error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function () {

      }
    });
  },

  formSubmit(e) {
    var data = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', data)
    // 校验表单
    if (!util.isNotNull(data.header_img, "头像")) return;
    var _this = this
    djRequest.djPost("/updateUserInfo", data, function (res) {
      //console.log(res);
      if (res.code == 0) {
        wx.navigateBack();
      }
    });
  },


  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function (options) {
    this.setData({
      selected_img: app.globalData.loginUserInfo.header_img,
      cover: app.globalData.loginUserInfo.header_img,
      birthday: app.globalData.loginUserInfo.birthday == '' ? util.getCurrentDate(): app.globalData.loginUserInfo.birthday,
      sex: app.globalData.loginUserInfo.sex,
      area: app.globalData.loginUserInfo.area.length == 0 ? ['广东省', '广州市', '海珠区']: app.globalData.loginUserInfo.area,
      note: app.globalData.loginUserInfo.note,
      name: app.globalData.loginUserInfo.name,
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