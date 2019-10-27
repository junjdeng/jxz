//app.js
App({
  onLaunch: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.userCode = res.code
      }
    })
  },
  globalData: {
    userCode: null,
    userInfo:null,
    loginUserInfo:null,
    encryptedData:null,
    iv:null,
    userPhone:""
  }
})