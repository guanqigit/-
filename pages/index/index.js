var util = require('../../utils/util.js');
var app = getApp();
var pages = 0;
Page({
  data: {
    list: [],
    pageindex: 0,
    pagesize: 10,
    searchName: '',
    bindgetusercode: false,
    searchtxt: '',

  },
  gouserinfo: function () {
    wx.navigateTo({
      url: '../member-message/member-message',
    })
  },
  creatpuct:function(){
    wx.navigateTo({
      url: '../businesscooperation/businesscooperation',
    })
  },
  //搜索
  search: function (e) {
    var that = this;
    that.setData({
      searchtxt: e.detail.value
    })
  },
  searchs: function () {
    var that = this;
    that.getlist();
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //获取用户信息
  onGotUserInfo: function (e) {
    var that = this;
    var data = JSON.parse(e.detail.rawData);
    var datas = e.detail;
    if (e.detail.errMsg == 'getUserInfo:ok') {
      console.log(e)
      wx.request({
        url: app.globalData.apiUrl.saveuseinfo,
        data: {
          openId: app.globalData.openid,
          wxcode: e.detail.userInfo.nickName,
          userimg: e.detail.userInfo.avatarUrl
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          that.setData({
            bindgetusercode: false
          }, function () {
            that.onLoad();
          })
        },
        fail: function () {

        },
        complete: function () {

        }
      })
    }
  },
  // onShow: function () {
  //   this.onLoad();
  // },
  onLoad: function (options) {
    console.log(options)
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000
    })
    var that = this;
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    wx.login({
      success: function (data) {
        console.log(data.code)
        if (data.code) {
          wx.request({
            url: app.globalData.apiUrl.appApi,//获取数据
            data: {
              code: data.code,
            },
            method: 'post',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              app.globalData.openid = res.data.openId;
              if (options.id && options.openid != res.data.openId) {
                wx.request({
                  url: app.globalData.apiUrl.ShareHandle,//获取数据
                  data: {
                    auth_initiate: options.openid,/// 发起者的openId auth_initiate 
                    auth_warrant: res.data.openId,/// 授权者的openId auth_warrant 
                    site_id: options.id,/// 工程Id site_id 
                  },
                  method: 'post',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  success: function () {
                    console.log('分享授权啦')
                  }, fail: function () { }
                });
              }
              if (res.data.code == 1000) {
                that.setData({
                  bindgetusercode: true
                })
              } else {
                that.getlist();
              }
            }, fail: function () { }
          });
        }
      }
    });

  },
  getlist: function () {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl.indexApi,
      data: {
        openId: app.globalData.openid,
        site_name: that.data.searchtxt,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
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
  // //上拉加载
  // onReachBottom: function () {
  //   var that = this;
  //   that.data.pageindex += 1;
  //   that.onLoad();
  // },
  // //下拉刷新
  // onPullDownRefresh: function () {
  //   var that = this;
  //   that.data.pageindex = 0;
  //   that.onLoad();
  // },
  goInfo(e) {
    var that = this;
    wx.navigateTo({
      url: '../usedmachinery/usedmachinery?id=' + e.currentTarget.dataset.id + '&&name=' + e.currentTarget.dataset.name,
    })
  },
  //
  addnew: function () {
    wx.navigateTo({
      url: '../businesscooperation/businesscooperation',
    })
  },

})