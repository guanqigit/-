var util = require('../../utils/util.js');
var app = getApp();
var pages = 0;
Page({
  data: {
    list: [],
    pageindex: 0,
    pagesize: 10,
    searchName: '',
    nav:0
  },
  nav: function (e) {
    var that = this;
    that.setData({
      nav: e.currentTarget.dataset.id
    },function(){
      that.getlist(that.data.id)
    })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  gobackdate: function () {
    wx.navigateTo({
      url: '../usedmachinery/usedmachinery',
    })
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id
    },function(){
      that.getlist(options.id);
    })
  },
  getlist:function(postid){
    var that=this;
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000
    })
    if(that.data.nav==0){
      wx.request({
        url: app.globalData.apiUrl.add1list,
        data: {
          openId: app.globalData.openid,
          site_id: postid
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
            unmber: res.data.totalCount
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
    }else{
      wx.request({
        url: app.globalData.apiUrl.jxxqlist,
        data: {
          openId: app.globalData.openid,
          site_id: postid
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
            unmber: res.data.totalCount
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
      url: '../details1/details1?id=' + e.currentTarget.dataset.id,
    })
  },
  goInfos(e) {
    var that = this;
    wx.navigateTo({
      url: '../details9/details9?id=' + e.currentTarget.dataset.id,
    })
  },
  //
  addnew: function () {
    wx.navigateTo({
      url: '../add1/add1?id=' + this.data.id,
    })
  },
  addnew1: function () {
    wx.navigateTo({
      url: '../add9/add9?id=' + this.data.id,
    })
  },
})