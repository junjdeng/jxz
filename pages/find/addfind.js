const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    showImg: false,
    selected_img: '',
    cover: '',
    textValue: '',
  },
  selectImg() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        // console.log(res);
        // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
        var filePath = res.tempFilePaths[0];
        //将刚才选的照片/拍的 放到下面view视图中
        that.setData({
          selected_img: filePath, //把照片路径存到变量中，
          showImg: true //让展示照片的view显示
        });
        //上传图片
        djRequest.djUpload(filePath, function(res) {
          console.log(JSON.parse(res));
          res = JSON.parse(res);
          if (res.code == 0) {
            that.setData({
              cover: res.data.filename
            });
          }
        })

      },
      fail: function(error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function() {

      }
    });
  },
  textareaBlur(e) {
    this.setData({
      textValue: e.detail.value
    })
  },
  formSubmit() {
    if (this.data.textValue.length == 0) {
      util.djToast('发布内容不能为空')
      return;
    }

    if (this.data.textValue.length > 100) {
      util.djToast('发布文字内容不能超过100字')
      return;
    }

    if (this.data.cover.length == 0) {
      util.djToast('请选择照片')
      return;
    }
    var _this = this
    djRequest.djPost("/addMoment", {
        "content": _this.data.textValue,
        "cover": _this.data.cover
      },
      function(res) {
        console.log(res);
        if (res.code == 0) {
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];  //上一个页面
          prevPage.setData({
            isFromBackAdd: true
          })
          wx.navigateBack()
        }
      });
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function(options) {

  },
  onReady: function() {

  },
  onShow: function() {

  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  }
})