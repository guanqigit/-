var app = getApp();
var tcity = require("../../utils/citys.js");
Page({
  data: {
    mcxh: '',
    jxdj: '',
    parm: '',
    sgbw:'',
    pics:[],
    false: false
  },
  //项目名称
  name: function (e) {
    var that = this;
    if (e.currentTarget.dataset.id ==0) {
      this.setData({
        sgbw: e.detail.value
      })
    }
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
        parm: e.detail.value
      })
    }
  },
  remove: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.pics.splice(index, 1)
    this.setData({
      pics: this.data.pics
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
    var work_today = that.data.mcxh;
    var work_workload = that.data.sgbw; 
    var work_tomorrow = that.data.jxdj;
    var work_coordination = that.data.parm;
    var images = that.data.pics;
    if (work_today == '') {
      wx.showToast({
        title: ' 请填写今天施工进度完成情况',
        icon: 'none',
        mask: true
      })
      return;
    } else {
      wx.showLoading({
        title: '正在提交',
      })
      wx.request({
        url: app.globalData.apiUrl.WcgclcGetListadd,
        data: {
          openid: app.globalData.openid,
          work_today: work_today,
          work_workload: work_workload,
          work_tomorrow: work_tomorrow,
          work_coordination: work_coordination,
          site_id: that.data.id,
          images:images
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
              url: '../allorders4/allorders?id=' + that.data.id + '&type=1',
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