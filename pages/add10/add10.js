var app = getApp();
var tcity = require("../../utils/citys.js");
var timer = require("../../utils/util.js");
Page({
  data: {
    count: '',
    pic: '',
    userbw: '',
    mess: '',
    index: 0,
    array: [],
    pics: [],
    multiIndex: [0, 0],
    multiArray: [[], []],
    objectMultiArray: []
  },
  //项目名称
  name: function (e) {
    var that = this;
    if (e.currentTarget.dataset.id == 0) {
      this.setData({
        count: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        pic: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        userbw: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 3) {
      this.setData({
        mess: e.detail.value
      })
    }
  },
  bindDateChange(e) {
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
    var laborSituation_count = that.data.part_id;
    var laborSituation_weather = that.data.count;
    var price = that.data.pic;
    var part = that.data.userbw;
    var remark = that.data.mess;
    var images = that.data.pics;
    if (laborSituation_weather == '') {
      wx.showToast({
        title: ' 请填写完整信息',
        image: '../../image/chacha.png'
      })
      return;
    } else {
      wx.showLoading({
        title: '正在提交',
      })
      wx.request({
        url: app.globalData.apiUrl.ryxqAdd,
        data: {
          openid: app.globalData.openid,
          classId: laborSituation_count,//班组名称
          count: laborSituation_weather,//人员数量
          arrival: that.data.date,//进场时限
          price: price,//单价
          part: part,//使用部位
          remark: remark,//备注
          images: images,
          site_id:that.data.id
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
              url: '../allorders6/allorders?id=' + that.data.id + '&type=1',
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
  bindMultiPickerChange: function (e) {
    this.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1],
      part_id: this.data.list[e.detail.value[0]].list[e.detail.value[1]].Id
    })
    console.log(this.data.list[e.detail.value[0]].list[e.detail.value[1]].Id)
  },
  bindMultiPickerColumnChange: function (e) {
    var that = this;
    switch (e.detail.column) {
      case 0:
        var list = [];
        for (var i = 0; i < that.data.objectMultiArray.length; i++) {
          console.log(that.data.objectMultiArray[i].part_id, that.data.list[e.detail.value].Id)
          if (that.data.objectMultiArray[i].part_id == that.data.list[e.detail.value].Id) {
            list.push(that.data.objectMultiArray[i].name)
          }
        }
        that.setData({
          "multiArray[1]": [],
          "multiIndex[0]": e.detail.value,
          "multiIndex[1]": 0
        }, function () {
          that.setData({
            "multiArray[1]": list,
          })
        })
    }

  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id,
      date: (timer.formatTime(new Date()).split(" "))[0]
    })
    wx.request({
      url: app.globalData.apiUrl.GetPart,
      data: {},
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        for (var i = 0; i < res.data.data.length; i++) {
          that.data.multiArray[0].push([res.data.data[i].name])
          for (var s = 0; s < res.data.data[i].list.length; s++) {
            that.data.objectMultiArray.push({
              'id': res.data.data[i].list[s].Id,
              'name': res.data.data[i].list[s].name,
              'part_id': res.data.data[i].Id
            })
          }
        }
        for (var i = 0; i < res.data.data[0].list.length; i++) {
          that.data.multiArray[1].push([res.data.data[0].list[i].name])
        }
        that.setData({
          multiArray: that.data.multiArray,
          objectMultiArray: that.data.objectMultiArray,
          list: res.data.data,
          part_id: res.data.data[0].list[0].Id
        })
      }, fail: function () {

      },
      complete: function () {

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
  }
})
