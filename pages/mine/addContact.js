const app = getApp()
const djRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');

var defaultContact = {
  area: "",
  arrive_code: "",
  arrive_time: util.getCurrentDate(),
  arrive_type: "",
  back_code: "",
  back_time: util.getCurrentDate(),
  ban_medication: "",
  blood_type: "",
  company: "",
  cover: "",
  cover_url: "",
  email: "",
  emergency_contact: "",
  emergency_contact_phone: "",
  have_baby_time: 0,
  have_dianxian: 0,
  have_ganbing: 0,
  have_guanjiebing: 0,
  have_shoushu: 0,
  have_tangniaobing: 0,
  have_xiaochuan: 0,
  have_xinzangbing: 0,
  have_zhongshu: 0,
  height: "",
  id_card: "",
  is_single: 0,
  job: "",
  muslim: 0,
  name: "",
  need_fuzhuqi: 0,
  need_yidaosu: 0,
  note: "",
  phone: "",
  qitabing: 0,
  sex: 1,
  weight: "",
  wx_code: "",
  xiong: "",
  yao: "",
}

Page({
  data: {
    selected_img: "",
    cover: "",
    region: ['广东省', '广州市', '海珠区'],
    bloodType: ['A', 'B', 'AB', 'O'],
    bloodTypeIndex: 0,
    arrive_time: util.getCurrentDate(),
    back_time: util.getCurrentDate(),
    contactInfo: defaultContact
  },

  bindRegionChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  bloodPickerChange(e) {
    this.setData({
      bloodTypeIndex: e.detail.value
    })
  },

  bindDateChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      arrive_time: e.detail.value
    })
  },

  bindDateChange1(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      back_time: e.detail.value
    })
  },

  selectImg() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        var filePath = res.tempFilePaths[0];
        that.setData({
          selected_img: filePath,
        });
        //上传图片
        djRequest.djUpload(filePath, function(res) {
          console.log(JSON.parse(res));
          res = JSON.parse(res);
          if (res.code == 0) { 
            that.setData({
              cover: res.data.filename, 
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

  formSubmit(e) {
    var data = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', data)
    // 校验表单
    if (!util.isNotNull(data.cover, "头像")) return;
    if (!util.isNotNull(data.name, "姓名")) return;
    if (!util.isNotNull(data.id_card, "身份证号")) return;
    if (!util.validateIdCard(data.id_card)) {
      util.djToast("身份证号码格式错误！");
      return;
    };
    if (!util.isNotNull(data.phone, "手机号")) return;
    if (!util.availablePhone(data.phone)) return;
    if (!util.isNotNull(data.wx_code, "微信号")) return;
    if (!util.isNotNull(data.company, "公司(学校)名")) return;
    if (!util.isNotNull(data.job, "职位名")) return;
    if (!util.isNotNull(data.height, "身高")) return;
    if (!util.isNotNull(data.weight, "体重")) return;
    if (!util.isNotNull(data.xiong, "胸围")) return;
    if (!util.isNotNull(data.yao, "腰围")) return;
    if (!util.isNotNull(data.arrive_type, "到达方式")) return;
    if (!util.isNotNull(data.arrive_code, "到达班次")) return;
    if (!util.isNotNull(data.emergency_contact, "紧急联系人")) return;
    if (!util.isNotNull(data.emergency_contact_phone, "紧急联系人电话")) return;
    if (!util.availablePhone(data.emergency_contact_phone)) return;
    if (data.agree.length == 0) {
      util.djToast("请同意报名通知再保存！");
      return;
    }

    var _this = this
    djRequest.djPost("/saveLinkman", data, function(res) {
      //console.log(res);
      if (res.code == 0) {
        wx.navigateBack();
      }
    });
  },

  // 获取联系人信息
  getContactInfo: function(id) {
    var _this = this
    djRequest.djPost("/linkmanInfo", {
      "id": id
    }, function(res) {
      console.log(res);
      if (res.code == 0) {
        var index = _this.data.bloodType.indexOf(res.data.blood_type);
        _this.setData({
          contactInfo: res.data,
          selected_img:res.data.cover_url,
          cover:res.data.cover,
          arrive_time:res.data.arrive_time,
          back_time:res.data.back_time,
          bloodTypeIndex:index,
          region:res.data.area,
        })
      }
    });
  },

  /**--------------------生命周期函数--监听页面加载---------------------------*/
  onLoad: function(options) {
    if (options.id) {
      wx.setNavigationBarTitle({
        title: '编辑联系人信息'
      })
      this.getContactInfo(options.id);
    }
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