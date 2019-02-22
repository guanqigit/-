var util = require('../../utils/util.js');
var app = getApp();
var pages = 0;
Page({
  data: {
    list: [],
    pageindex: 0,
    pagesize: 10,
    searchName: '',
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id,
      projuctname: options.name,
    })
  },
  nav1: function () {
    var that = this;
    wx.navigateTo({
      url: '../allorders/allorders?id=' + that.data.id + '&&type=1',
    })
  },
  nav2: function () {
    var that = this;
    wx.navigateTo({
      url: '../allorders1/allorders?id=' + that.data.id + '&&type=2',
    })
  },
  nav3: function () {
    var that = this;
    wx.navigateTo({
      url: '../allorders2/allorders?id=' + that.data.id + '&&type=3',
    })
  },
  nav4: function () {
    var that = this;
    wx.navigateTo({
      url: '../allorders3/allorders?id=' + that.data.id + '&&type=4',
    })
  },
  nav5: function () {
    var that = this;
    wx.navigateTo({
      url: '../allorders4/allorders?id=' + that.data.id + '&&type=5',
    })
  },
  nav6: function () {
    var that = this;
    wx.navigateTo({
      url: '../allorders5/allorders?id=' + that.data.id + '&&type=6',
    })
  },
  nav7: function () {
    var that = this;
    wx.navigateTo({
      url: '../allorders6/allorders?id=' + that.data.id + '&&type=7',
    })
  },
  nav8: function () {
    wx.navigateTo({
      url: '../allorders7/allorders',
    })
  },
  nav9: function () {
    var that=this;
    wx.navigateTo({
      url: '../details/details?id=' + that.data.id,
    })
  },
  onShareAppMessage: function () {
    return {
      title: '好项目大家一起做',
      path: 'pages/index/index?id=' + that.data.id + '&openid=' + app.globalData.openid,
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  
})