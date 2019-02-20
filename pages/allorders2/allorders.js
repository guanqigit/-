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
      nav: e.currentTarget.dataset.id
    },function(){
      that.getlist(that.data.id)
    })
    
  },
  gobackdate: function () {
    wx.navigateBack({
      delta: 1
    })
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
      id: options.id
    })
    that.getlist(options.id)
  },
  getlist: function (id) {
    var that = this;
    if (that.data.nav == 0) {
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 2000
      })
      wx.request({
        url: app.globalData.apiUrl.CljcGetList,
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
          console.log(res)
          var list = [];
          if (that.data.pageindex == 0) {
            list = res.data.list;

          } else {
            list = that.data.list;
            for (var i = 0; i < res.data.list.length; i++) {
              list.push(res.data.list[i])
            }
          }
          that.setData({
            list: list,
            unmber: res.data.totalCount,
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
    } else {
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 2000
      })
      wx.request({
        url: app.globalData.apiUrl.ClxqGetList,
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
          console.log(res)
          var list = [];
          if (that.data.pageindex == 0) {
            list = res.data.list;

          } else {
            list = that.data.list;
            for (var i = 0; i < res.data.list.length; i++) {
              list.push(res.data.list[i])
            }
          }
          that.setData({
            list: list,
            unmber: res.data.totalCount,
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
    }

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
    that.getlist(that.data.id);
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.data.pageindex = 0;
    that.getlist(that.data.id);
  },
  goInfo(e) {
    var that = this;
    wx.navigateTo({
      url: '../details2/details2?id=' + e.currentTarget.dataset.id,
    })
  },
  //
  addnew: function () {
    wx.navigateTo({
      url: '../add4/add4?id=' + this.data.id,
    })
  },
  addnew1: function () {
    wx.navigateTo({
      url: '../add8/add8?id=' + this.data.id,
    })
  },
})