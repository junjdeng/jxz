const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({
  /*------------------ 页面的初始数据---------------------------*/
  data: {
    num: 1,
    orderType: 0,
    isLimitNum: false,
    selectedIndex: 0,
    act: null,
    register:null
  },
  handleChange1({detail}) {
    this.setData({
      num: detail.value
    })
  },
  switch1Change(e) {
    this.setData({
      isLimitNum: e.detail.value
    })
  },
  navTo: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  submitOrder:function(){ 
    if (this.data.register == null){
      util.djToast("请添加个人信息")
      return
    }

    var obj = {
      "team_id": this.data.act.team_list[this.data.selectedIndex].team_id,   //团队ID
      "activity_id": this.data.act.id,   //活动ID
      "count": this.data.num,   //购买数量 
      "buy_type":parseInt(this.data.orderType)   //购买方式 0自付 1众筹
    }
    var params = Object.assign(this.data.register, obj);
    console.log(params);
    var _this = this
    djRequest.djPost("/addActivityOrder", params,
      function (res) {
         console.log(res);
        var _res = res;
        if (res.code == 0) {
          if (_this.data.orderType == 1){
            wx.showModal({
              title: '',
              showCancel: false,
              content: '您已成功发起众筹',
              confirmText: '查看详情',
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../fund/fundDetail?order_sn=' + _res.data.order_sn + '&buy_type=' + parseInt(_this.data.orderType),
                  })
                } else if (res.cancel) {
                  //console.log('用户点击取消')
                }
              }
            })
          }else{
            var pay_data = res.data.pay_data;
            wx.requestPayment({
              timeStamp: String(pay_data.timeStamp),
              nonceStr: pay_data.nonceStr,
              package: pay_data.package,
              signType: 'MD5',
              paySign: pay_data.paySign,
              success(res) { 
                wx.showModal({
                  title: '',
                  showCancel: false,
                  content: '订单支付完成',
                  confirmText: '查看详情',
                  success(res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '../fund/fundDetail?order_sn=' + _res.data.order_sn + '&buy_type=' + parseInt(_this.data.orderType),
                      })
                    } else if (res.cancel) {
                      //console.log('用户点击取消')
                    }
                  }
                })
              },
              fail(res) { 
               // wx.navigateBack();
              }
            })
          }
        }else{
          util.djToast(res.msg);
        }
      });
  },
  /**---------------- 生命周期函数--监听页面加载------------------*/
  onLoad: function(options) {
    this.setData({
      orderType: options.type
    })
    //获取缓存
    var _this = this
    wx.getStorage({
      key: 'act',
      success: function(res) {
        console.log(res.data)
        _this.setData({
          act: res.data
        })
      }
    })
  },
  onReady: function() {

  },
  onShow: function() {
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