var util = require('../../utils/util.js');
var app = getApp();
var pages = 0;
Page({
  data: {
    list: [],
    pageindex: 0,
    pagesize: 10,
    searchName: '',
    nav: 0
  },
  nav: function (e) {
    var that = this;
    that.setData({
      nav: e.currentTarget.dataset.id,
      pageindex: 0
    }, function () {
      if (e.currentTarget.dataset.id == 0) {
        that.getlsit(that.data.id)
      } else {
        that.getlsits(that.data.id)
      }
    })

  },
  gobackdate: function () {
    wx.navigateTo({
      url: '../usedmachinery/usedmachinery?id='+this.data.id+'&&name='+this.data.name,
    })
  },
  searchs: function () {
    var that = this;
    that.setData({
      pageindex: 0,
      searchName: that.data.searchName
    })
    that.onLoad();
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000
    })
    var that = this;
    that.setData({
      id: options.id,
      name:options.name
    })
    that.getlsit(options.id)
    that.getlsits(options.id)
  },
  getlsit: function (id) {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl.SgxcGetList,
      data: {
        site_id: id,
        openId: app.globalData.openid,
        pageIndex: that.data.pageindex,
        pageSize: that.data.pagesize
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          list: res.data.list,
        })
      },
      fail: function () {
        wx.showToast({
          title: '加载失败',
          image: '../../image/chacha.png',
          duration: 2000
        })
      },
      complete: function () {
        wx.hideToast();
      }
    })
  },
  getlsits: function (id) {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl.ryxqGetList,
      data: {
        site_id: id,
        openId: app.globalData.openid,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          lists: res.data.list,
        })
      },
      fail: function () {
        wx.showToast({
          title: '加载失败',
          image: '../../image/chacha.png',
          duration: 2000
        })
      },
      complete: function () {
        wx.hideToast();
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.shares,
      path: 'pages/index/index',
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  //上拉加载
  onReachBottom: function () {
    var that = this;
    that.data.pageindex += 1;
    that.getlsit(that.data.id);
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.data.pageindex = 0;
    that.getlsit(that.data.id);
  },
  goInfo(e) {
    var that = this;
    wx.navigateTo({
      url: '../details6/details6?id=' + e.currentTarget.dataset.id,
    })
  },
  goInfos(e) {
    var that = this;
    wx.navigateTo({
      url: '../details7/details7?id=' + e.currentTarget.dataset.id,
    })
  },
  //
  addnew: function () {
    wx.navigateTo({
      url: '../add6/add6?id=' + this.data.id,
    })
  },
  addnew1: function () {
    wx.navigateTo({
      url: '../add10/add10?id=' + this.data.id,
    })
  },
})