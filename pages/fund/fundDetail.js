const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');
var config = require('../../utils/config.js');

Page({
  imagePath: '',
  data: {
    current: 'tab1',
    visible: false,
    visible1: false,
    order_sn:null,
    order:null,
    resetTime:"",
    supportList:[],
    rangeList1:[],
    rangeList2: [],
    rangeList3: [],
    my_rank:null,
    erCodeUrl:'',
    erCodeImageUrl:'',
    image1Url:'',
    image2Url: '',
    shareImgUrl:'',
    type:'1',
    orderself:false,
    operation:null,
  },

  toWebUrl: function (e) {
    wx.navigateTo({ url: "../../pages/start/webView?url=" + e.currentTarget.dataset.url })
  },
  
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
   if(detail.key == "tab1"){
     this.getRangeList("speed");
   } else if (detail.key == "tab2") {
     this.getRangeList("popular");
   } else if (detail.key == "tab3") {
     this.getRangeList("rich");
   }
  },

  showModal() {
    this.setData({
      visible: !this.data.visible
    });
    this.setData({
      template: this.palette()
    });

    // if (this.data.visible == false){
    //   this.showModal1();
    // }
  },
  showModal1() {
    this.setData({
      visible1: !this.data.visible1
    });
    this.setData({
      template1: this.paletteAttr()
    });

  },
  navTo: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url })
  },

  getOrderDetail: function () {
    var _this = this
    djRequest.djPost("/activityOrderDetail", { "order_sn": _this.data.order_sn}, function (res) {
      if (res.code == 0) {
        //console.log(res);
        var date3 = new Date(res.data.end_date).getTime() - new Date().getTime()  //时间差的毫秒数
        var days = Math.floor(date3 / (24 * 3600 * 1000))+2
        _this.setData({
          order: res.data,
          resetTime: days
        })
        _this.getRangeList("speed");
      }
    });
  },

  getSupportList: function () {
    var _this = this
    djRequest.djPost("/getSupportList", {"start": 0, "limit": 5,"order_sn": _this.data.order_sn }, function (res) {
      if (res.code == 0) {
        console.log(res);
        _this.setData({
          supportList: res.data.list,
        })
      }
    });
  },

  getRangeList: function (type) {
    var _this = this
    djRequest.djPost("/getActivityRankList", { "start": 0, "limit": 2, "type": type, "activity_id": _this.data.order.activity_id}, function (res) {
      if (res.code == 0) {
      //  console.log(res);
        if (_this.data.current == "tab1") {
          _this.setData({
            rangeList1: res.data.list,
            my_rank: res.data.my_rank
          })
        } else if (_this.data.current == "tab2") {
          _this.setData({
            rangeList2: res.data.list,
            my_rank: res.data.my_rank
          })
        } else if (_this.data.current == "tab3") {
          _this.setData({
            rangeList3: res.data.list,
            my_rank: res.data.my_rank
          })
        }
      }
    });
  },

  onImgOK(e) {
    　//debugger;
    this.setData({
      shareImgUrl: e.detail.path
    })
   // console.log(e.detail.path);
  },

  onErCodeImgOK(e) {
    this.setData({
     erCodeImageUrl:e.detail.path
    })
    console.log(e);
  },

  paletteImg1OK(e) {
    this.setData({
      image1Url: e.detail.path
    })
    console.log(e);
  },

  paletteImg2OK(e) {
    this.setData({
      image2Url: e.detail.path
    })
    console.log(e);
  },

  saveImage() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImgUrl,
    });
  },
  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function (options) {

    let path = '/pages/fund/fundShared';
    let param = encodeURIComponent('order_sn=' + options.order_sn +'&refer='+config.Code);
    let url = "https://act.yingtxx.cn/getReferQrcode?path=" + path + "&totalImg=0" + "&param=" + param + '&time=' + Date.parse(new Date());
    this.setData({
      erCodeUrl: url,
      order_sn: options.order_sn,
      type:options.type,
      save_info: options.save_info,
    })
    if(options.orderself){
      wx.setNavigationBarTitle({
        title: '订单详情',
      })

      this.setData({
        orderself:true
      })
    }

    this.setData({
      erCodeTemplate: this.paletteErCodeImg()
    })

    this.getOrderDetail();
    this.getSupportList();
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
  onShareAppMessage: function (opt) {
    if(opt.from === 'button'){
      console.log(this.data.shareImgUrl,333);
      this.newActivityShare();
      return {
        title: '践行师邀请您参与' + this.data.order.title + '的众筹活动，知行合一，从我做起！！',
        path: 'pages/fund/fundShared?order_sn=' + this.data.order_sn + '&refer=' + config.Code,
        imageUrl:this.data.shareImgUrl
      };
    }else{
      this.newActivityShare();
      return {
        title: '践行师邀请您参与' + this.data.order.title + '的众筹活动，知行合一，从我做起！！',
        path: 'pages/fund/fundShared?order_sn=' + this.data.order_sn + '&refer=' + config.Code,
      }
    } 
  },

  newActivityShare: function () {
    var _this = this
    djRequest.djPost("/newActivityShare", { "activity_id": _this.data.order.activity_id}, function (res) {
      if (res.code == 0) {
        console.log(res);
      }
    });
  },


 /**--------------------分享画板---------------------------*/
   //画二维码
  paletteErCodeImg() {
    return ({
      width: '150rpx',
      height: '150rpx',
      views: [
        {
          type: 'image',
          url: this.data.erCodeUrl,
          css: {
            color: 'red',
            width: '150rpx',
            height: '150rpx',
          },
        }
      ],
    });
  },

  //画头部图
  paletteImg1() {
    return ({
      width: '710rpx',
      height: '300rpx',
      views: [
        {
          type: 'image',
          url: this.data.order.cover_url,
          css: {
            color: 'red',
            width: '710rpx',
            height: '300rpx',
          },
        }
      ],
    });
  },


  //画头像
  paletteImg2() {
    return ({
      width: '80rpx',
      height: '80rpx',
      views: [
        {
          type: 'image',
          url: app.globalData.userInfo.avatarUrl,
          css: {
            color: 'red',
            width: '80rpx',
            height: '80rpx',
          },
        }
      ],
    });
  },


  //画分享界面
  palette() {
    var reset_amount =  this.data.order.total_amount - this.data.order.paid_amount;
    // debugger;
    return ({
      width: '710rpx',
      height: '900rpx',
      views: [
        {
          type: 'image',
          url: this.data.order.cover_url,
          css: {
            width: '710rpx',
            height: '300rpx',
          },
        },
        {
          type: 'text',
          text: this.data.order.title,
          css: [{
            top: '320rpx',
            left: '20rpx',
            color: '#333',
            fontSize: '32rpx',
            align: 'left',
            fontWeight: 'bold',
          }],
        },
        {
          type: 'image',
          url: app.globalData.userInfo.avatarUrl,
          css: {
            top: '380rpx',
            left: '20rpx',
            width: '80rpx',
            height: '80rpx',
          },
        },
        {
          type: 'text',
          text: app.globalData.userInfo.nickName,
          css: [{
            top: '400rpx',
            left: '120rpx',
            align: 'left',
            width: '200rpx',
            fontSize: '32rpx',
            lineHeight: '50rpx',
            color: '#333333'
          }],
        },
        {
          type: 'text',
          text: '我正在参加践行师举行的赛事，谢谢您来支持我!',
          css: [{
            top: '470rpx',
            left: '20rpx',
            color: '#333',
            fontSize: '28rpx',
            align: 'left'
          }],
        },
        {
          type: 'text',
          text: this.data.order.total_amount,
          css: [{
            top: '540rpx',
            left: '120rpx',
            color: '#FF4F00',
            fontSize: '50rpx',
            align: 'center'
          }],
        },
        {
          type: 'text',
          text: this.data.order.paid_amount,
          css: [{
            top: '540rpx',
            left: '360rpx',
            color: '#FF4F00',
            fontSize: '50rpx',
            align: 'center'
          }],
        },
        {
          type: 'text',
          text: reset_amount+'',
          css: [{
            top: '540rpx',
            left: '580rpx',
            color: '#FF4F00',
            fontSize: '50rpx',
            align: 'center'
          }],
        },
        {
          type: 'text',
          text: ' 目标金额（元）',
          css: [{
            top: '610rpx',
            left: '120rpx',
            color: '#888888',
            fontSize: '30rpx',
            align: 'center'
          }],
        },
        {
          type: 'text',
          text: ' 已筹金额（元）',
          css: [{
            top: '610rpx',
            left: '360rpx',
            color: '#888888',
            fontSize: '30rpx',
            align: 'center'
          }],
        },
        {
          type: 'text',
          text: ' 还需金额（元）',
          css: [{
            top: '610rpx',
            left: '580rpx',
            color: '#888888',
            fontSize: '30rpx',
            align: 'center'
          }],
        },
        {
          type: 'text',
          text: '邀朋友筹千里就找践行师',
          css: [{
            bottom: '110rpx',
            left: '20rpx',
            align: 'left',
            width: '420rpx',
            fontSize: '36rpx',
            lineHeight: '50rpx',
            color: '#333333'
          }],
        },
        {
          type: 'text',
          text: '长按识别小程序，立即帮忙',
          css: [{
            bottom: '40rpx',
            left: '20rpx',
            align: 'left',
            width: '400rpx',
            fontSize: '28rpx',
            lineHeight: '50rpx',
            color: '#d5d5d5'
          }],
        },
        {
          type: 'image',
          url: this.data.erCodeImageUrl,
          css: {
            bottom: '40rpx',
            right: '40rpx',
            color: 'red',
            width: '150rpx',
            height: '150rpx',
          },
        }
      ],
    });
  },

  //画分享关注
  paletteAttr() {
    return ({
      width: '650rpx',
      height: '900rpx',
      borderRadius: "8rpx",
      background: '../../images/bg3.png',
      views: [
        {
          type: 'text',
          text: "关注我们",
          css: [{
            top: '70rpx',
            left: '305rpx',
            color: '#fff',
            fontSize: '40rpx',
            align: 'center',
            fontWeight: 'bold',
          }],
        },
        {
          type: 'text',
          text: '后续为您带来更多的服务！',
          css: [{
            top: '200rpx',
            left: '145rpx',
            align: 'left',
            width: '400rpx',
            fontSize: '32rpx',
            lineHeight: '50rpx',
            color: '#302C3D'
          }],
        },
        {
          type: 'image',
          url: '../../images/code.png',
          css: {
            top: '380rpx',
            left: '145rpx',
            color: 'red',
            width: '360rpx',
            height: '360rpx',
          },
        }
      ],
    });
  }
})