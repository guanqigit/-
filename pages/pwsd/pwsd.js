var app = getApp();
Page({
  data: {
    code: '',
    psd: '',
    codestate:0
  },
  clause: function () {
    wx.navigateTo({
      url: '../clause/clause',
    })
  },
  creat: function () {
    wx.navigateTo({
      url: '../businesscooperation/businesscooperation',
    })
  },
  about: function () {
    wx.navigateTo({
      url: '../after/after',
    })
  },
  code: function (e) {
    console.log(e.detail.value)
    this.setData({
      code: e.detail.value
    })
  },
  psd: function (e) {
    this.setData({
      psd: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  submit: function () {
    var that = this;
    if (that.data.code == '' || !that.data.code) {
      wx.showToast({
        title: '请填写管理账号',
        icon: 'none',
        mask: true
      })
      return
    }
    if (that.data.psd == '' || !that.data.psd) {
      wx.showToast({
        title: '请填写管理密码',
        icon: 'none',
        mask: true
      })
      return
    }
    wx.request({
      url: app.globalData.apiUrl.UserPwdHandle,
      data: {
        openId: app.globalData.openid,
        userName: that.data.code,
        userPwd: that.data.psd,
      },
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        wx.showToast({
          title: '提交成功',
        })
        setTimeout(function(){
          wx.navigateBack()
        },1500)
      }, fail: function () {

      },
      complete: function () {

      }
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl.UserPwdShow,
      data: {
        openId: app.globalData.openid,
      },
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        if (res.data.model.login_name){
          that.setData({
            codestate: 1,
          })
        }
        that.setData({
          code: res.data.model.login_name,
          psd: res.data.model.login_pwd,
        })
      }, fail: function () {

      },
      complete: function () {

      }
    })
  },
})