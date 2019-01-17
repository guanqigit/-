var app = getApp();
var tcity = require("../../utils/citys.js");
Page({
  data: {
    pics: [],
    index: 0,
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
    if (e.currentTarget.dataset.id == 4) {
      this.setData({
        bz: e.detail.value
      })
    }
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
    var mechanical_remarks = that.data.bz;
    var imgs = that.data.pics;
    if (imgs == '') {
      wx.showToast({
        title: '请先上传图片',
        image: '../../image/chacha.png'
      })
      return;
    }
    if (imgs.length > 10) {
      wx.showToast({
        title: '请最多上传10张图片',
        image: '../../image/chacha.png'
      })
      return;
    } else {
      wx.showLoading({
        title: '正在提交',
      })
      console.log(app.globalData.apiUrl.photoadd)
      wx.request({
        url: app.globalData.apiUrl.photoadd,
        data: {
          openid: app.globalData.openid,
          constructionSite_remarks: mechanical_remarks,
          images: imgs,
          site_id: that.data.id
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
              url: '../allorders3/allorders?id=' + that.data.id + '&type=1',
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
      id: options.id
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