var app = getApp();
var tcity = require("../../utils/citys.js"); 
var timer = require("../../utils/util.js");
Page({
  data: {
    pics: [],
    index: 0,
    date: 'null',
    mcxh: '',
    jxdj: '',
    sybw: '',
    bz: '',
  },
  remove: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.pics.splice(index, 1)
    this.setData({
      pics: this.data.pics
    })
  },
  //项目名称
  name: function (e) {
    var that = this;
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        mcxh: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        jxdj: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 3) {
      this.setData({
        sybw: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 4) {
      this.setData({
        bz: e.detail.value
      })
    }
  },
  //使用时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  uploadimg: function () {//这里是选取图片的方法
    var that = this;
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          that.un(tempFilePaths[i])
        }
      }
    })
  },
  un: function (data) {
    var that = this;
    var pics = that.data.pics
    wx.uploadFile({
      url: app.globalData.apiUrl.UploadImageApi,
      filePath: data,//临时路径
      name: 'fileName',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        console.log(res.data)
        var data = res.data;
        if (data != undefined) {
          pics.push(data)
        }
        that.setData({
          pics: pics
        })
      },
      fail: function (err) {
        wx.showToast({
          title: '上传失败，请重新上传',
          image: '../../image/chacha.png'
        })
      },
      complete: function () {
      }
    })
  },
  submit: function () {
    var that = this;
    var safety_modify = that.data.mcxh;
    var safety_completeTime = that.data.date;
    var safety_coordination = that.data.jxdj;
    var sitePart = that.data.sybw;
    var remark = that.data.bz;
    var images=that.data.pics;
    if (images.length == 0) {
      wx.showToast({
        title: ' 请先上传图片',
        image: '../../image/chacha.png'
      })
      return;
    }else if (safety_modify == '') {
      wx.showToast({
        title: ' 请上传图片',
        icon: 'none',
        mask: true
      })
      return;
    } else {
      wx.showLoading({
        title: '正在提交',
      })
      wx.request({
        url: app.globalData.apiUrl.add2,
        data: {
          openId: app.globalData.openid,/// 创建者的openId
          site_id: that.data.id,/// 工地Id
          images: images,
          safety_modify: safety_modify, /// 需要整改的安全问题 
          safety_completeTime: safety_completeTime, /// 预计完成整改的时间
          safety_coordination: safety_coordination, /// 完成整改需要协调的问题
          sitePart: sitePart,/// 施工部位 sitePart 
          remark: remark,/// 备注 remark  

        },
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {
          wx.hideLoading();
          wx.showToast({
            title: '添加成功',
            icon: "success"
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../allorders5/allorders?id=' + that.data.id + '&type=1',
            })
          }, 1000)
        }, fail: function () {
          wx.showToast({
            title: '添加失败',
            image: "../../image/chacha.png"
          })
        },
        complete: function () {

        }
      })
    }
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id,
      date: (timer.formatTime(new Date()).split(" "))[0]
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
  }
})