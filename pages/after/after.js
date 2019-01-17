// pages/updatesex/updatesex.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infodata: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
  },
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '13070177478',
    })
  },
  address: function () {
    const latitude = 39.9412400000
    const longitude = 116.3092800000
    wx.openLocation({
      latitude,
      longitude,
      name: '北京市海淀区',
      address: '北京市海淀区昌运宫7号楼1幢三层',
      scale: 15
    })
  }
})