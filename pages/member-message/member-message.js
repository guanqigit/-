var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    
  },
  clause: function () {
    wx.navigateTo({
      url: '../clause/clause',
    })
  },
  creat:function(){
    wx.navigateTo({
      url: '../businesscooperation/businesscooperation',
    })
  },
  pawd: function () {
    wx.navigateTo({
      url: '../pwsd/pwsd',
    })
  },
  about: function () {
    wx.navigateTo({
      url: '../after/after',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
  },
})