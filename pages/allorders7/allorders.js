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
  //搜索
  search: function (e) {
    var that = this;
    that.setData({
      searchName: e.detail.value
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
  onLoad: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000
    })
    var that = this;
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    wx.request({
      url: app.globalData.apiUrl.GetBusinessListApi,
      data: {
        searchName: that.data.searchName,
        openid: app.globalData.openid,
        pagesize: that.data.pagesize,
        pageindex: that.data.pageindex
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        var list = [];
        // time = time.split(' ')[0].replace(/\//g, '-')
         for (var i = 0; i < res.data.list.length; i++) {
           res.data.list[i].factory_image = res.data.list[i].factory_image.split(',')[0];
        //   if(res.data.listModel[i].merchant_beginTime == time){
        //     res.data.listModel[i].new=0
        //   }
         }
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
    that.onLoad();
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.data.pageindex = 0;
    that.onLoad();
  },
  goInfo(e) {
    var that = this;
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id ,
    })
  },
  //
  addnew:function(){
    wx.navigateTo({
      url: '../businesscooperation/businesscooperation',
    })
  },
  //添加
  add: function () {
    wx.request({
      url: app.globalData.apiUrl.functionOpenApi,
      data: {
        openid: app.globalData.openid,
        icon_id:1
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.navigateTo({
            url: '../businesscooperation/businesscooperation',
          })
         
        }
        if (res.data.code == -1) {
          wx.showToast({
            title: res.data.msg,
            image: '../../image/chacha.png'
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../zhuce/zhuce'
            })
          }, 1000)
        }
        if (res.data.code == -2) {
          wx.showToast({
            title: res.data.msg,
            image: '../../image/chacha.png'
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../manaddress/manaddress'
            })
          }, 1000)
        }
      },
      fail: function () {

      },
      complete: function () {

      }
    })

  },
})