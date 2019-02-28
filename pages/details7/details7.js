var app = getApp()
Page({
  data: {
    infodata: {
    },
    imgList: [],
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl.ryxqGetModel,
      data: {
        openId: app.globalData.openid,
        need_id: options.id,
      },
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {    
        that.setData({
          infodata: res.data.list,
          merchant_img: res.data.images,
          //foactid: res.data.model.factory_id
        })
      }, fail: function () {
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
  gobackdate: function () {
    wx.navigateTo({
      url: '../usedmachinery/usedmachinery',
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
  comment: function () {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl.CreateUserCollectionApi,
      data: {
        car_id: that.data.commentid,
        user_openid: app.globalData.openid,
      },
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        var msg = JSON.stringify(res.data.msg)
        wx.showToast({
          title: msg,
          icon: 'success',
          duration: 2000
        })
      }, fail: function (res) {
        var msg = JSON.stringify(res.data.msg)
        wx.showToast({
          title: msg,
          image: '../../image/chacha.png',
          duration: 2000
        })
      },
      complete: function () {
        // wx.hideToast();
        // wx.stopPullDownRefresh();
      }
    })
  },
  phone: function () {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl.CallPhoneHandleApi,
      data: {
        openid: app.globalData.openid
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.makePhoneCall({
            phoneNumber: that.data.infodata.factory_spare3 //仅为示例，并非真实的电话号码
          })
        } 
        if (res.data.code == -2){
          wx.showToast({
            title: res.data.msg,
          })
          setTimeout(function(){
            wx.navigateTo({
              url: '../manaddress/manaddress',
            })
          })
        }
        if (res.data.code == -1) {
          wx.showToast({
            title: res.data.msg,
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../zhuce/zhuce',
            })
          })
        }
      },
      fail: function () {

      },
      complete: function () {

      }
    })

  },
  preview: function (e) {
    var eximglist = this.data.merchant_img
    var eximglists = [];
    for (var i = 0; i < eximglist.length; i++) {
      eximglists.push(eximglist[i])
    }
    var current = e.target.dataset.src;
    wx.previewImage({
      current: "http://test.cqmotuoche.cn/" + current, // 当前显示图片的http链接
      urls: eximglists // 需要预览的图片http链接列表
    })
  },
})