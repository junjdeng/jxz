const app = getApp()
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    items: [],
    selectIndex:0
  },
  radioChange(e) {
    this.setData({
      selectIndex: e.detail.value
    })
  },
  sureClick(e){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      selectedIndex: e.currentTarget.dataset.index
    })
    wx.navigateBack()
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function (options) {
    this.setData({
      selectIndex: options.selectedIndex
    })
    //获取缓存中的战队列表
    var _this = this
    wx.getStorage({
      key: 'team_list',
      success: function (res) {
        console.log(res.data)
        _this.setData({
          items:res.data
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