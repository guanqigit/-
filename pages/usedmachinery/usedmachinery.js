var util = require('../../utils/util.js');
var app = getApp();
var pages = 0;
Page({
  data: {
    list: [],
    pageindex: 0,
    pagesize: 10,
    searchName: '',
    btncode: false
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl.JudgeProject,
      data: {
        openId: app.globalData.openid,
        site_id: options.id,
      },
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            btncode: true
          })
        } else {
          wx.hideShareMenu()
        }
        console.log(options.name)
        that.setData({
          id: options.id,
          projuctname: options.name,
        })
      }, fail: function () {

      },
      complete: function () {

      }
    })

  },
  goback: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要退出该项目吗？',
      cancelText: "取消",//默认是“取消”
      cancelColor: '#000',//取消文字的颜色
      confirmText: "确定",//默认是“确定”
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          wx.request({
            url: app.globalData.apiUrl.CancelShareHandle,
            data: {
              openId: app.globalData.openid,
              site_id: that.data.id,
            },
            method: 'POST',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            success: function (res) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: '已成功退出该项目',
                  icon: 'none',
                  mask: true,
                  success: function () {
                    setTimeout(function () {
                      wx.navigateTo({
                        url: '../index/index',
                      })
                    }, 1000)
                  }
                })
              }
            }, fail: function () {

            },
            complete: function () {

            }
          })

        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },
  nav1: function () {
    var that = this;
    wx.navigateTo({
      url: '../allorders/allorders?id=' + that.data.id + '&&name=' + that.data.projuctname + '&&type=1',
    })
  },
  nav2: function () {
    var that = this;
    wx.navigateTo({
      url: '../allorders1/allorders?id=' + that.data.id + '&&name=' + that.data.projuctname + '&&type=2',
    })
  },
  nav3: function () {
    var that = this;
    wx.navigateTo({
      url: '../allorders2/allorders?id=' + that.data.id + '&&name=' + that.data.projuctname + '&&type=3',
    })
  },
  nav4: function () {
    var that = this;
    wx.navigateTo({
      url: '../allorders3/allorders?id=' + that.data.id + '&&name=' + that.data.projuctname +  '&&type=4',
    })
  },
  nav5: function () {
    var that = this;
    wx.navigateTo({
      url: '../allorders4/allorders?id=' + that.data.id + '&&name=' + that.data.projuctname + '&&type=5',
    })
  },
  nav6: function () {
    var that = this;
    wx.navigateTo({
      url: '../allorders5/allorders?id=' + that.data.id + '&&name=' + that.data.projuctname + '&&type=6',
    })
  },
  nav7: function () {
    var that = this;
    wx.navigateTo({
      url: '../allorders6/allorders?id=' + that.data.id + '&&name=' + that.data.projuctname + '&&type=7',
    })
  },
  nav8: function () {
    wx.navigateTo({
      url: '../allorders7/allorders',
    })
  },
  nav9: function () {
    var that = this;
    wx.navigateTo({
      url: '../details/details?id=' + that.data.id,
    })
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '好项目大家一起做',
      path: '/pages/index/index?id=' + that.data.id + '&openid=' + app.globalData.openid,
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },

})