var app = getApp();
var tcity = require("../../utils/citys.js");
var timer = require("../../utils/util.js");
Page({
  data: {
    pics: [],
    date: 'null',
    mcxh: '',
    jxdj: '',
    sybw: '',
    bz: '',
    gg: '',
    post1: '',
    post2: '',
    post3: '',
    post4: '',
    post5: '',
    post6: '',
    time: '00:00',
    times: '00:00',
    multiIndex: [0, 0],
    multiArray: [[], []],
    objectMultiArray: []
  },
  remove: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.pics.splice(index, 1)
    this.setData({
      pics: this.data.pics
    })
  },
  bindMultiPickerChange: function (e) {
    console.log(156345)
    this.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1],
      part_id: this.data.list[e.detail.value[0]].list[e.detail.value[1]].Id
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var that = this;
    var data = that.data.list;
    switch (e.detail.column) {
      case 0:
        var arraydata = [];
        for (var i = 0; i < that.data.objectMultiArray.length; i++) {
          if (that.data.objectMultiArray[i].part_id == data[e.detail.value].Id) {
            arraydata.push(that.data.objectMultiArray[i].part_name)
          }
        }
        that.setData({
          "multiArray[1]": [],
        }, function () {
          that.setData({
            "multiArray[1]": arraydata,
            "multiIndex[0]": e.detail.value,
            "multiIndex[1]": 0
          })
        })

    }
  },
  //项目名称
  name: function (e) {
    var that = this;
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        post1: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        post2: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 3) {
      this.setData({
        post3: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 4) {
      this.setData({
        post4: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 5) {
      this.setData({
        post5: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 6) {
      this.setData({
        post6: e.detail.value
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
  //使用日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  //使用时间
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindTimeChanges(e) {
    this.setData({
      times: e.detail.value
    })
  },
  submit: function () {
    var that = this;
    var mechanical_name = that.data.part_id;
    var number = that.data.post1;
    var mechanical_model = that.data.post2;
    var handle = that.data.post3;
    var mechanical_usageTime = that.data.date;
    var mechanical_beginUsageTime = that.data.time;
    var mechanical_endUsageTime = that.data.times;
    var mechanical_unitPrice = that.data.post4;
    var mechanical_Part = that.data.post5;
    var mechanical_remarks = that.data.post6;
    var imgs = that.data.pics;
    if (mechanical_model == '') {
      wx.showToast({
        title: ' 请填写规格型号',
        icon: 'none',
        mask: true
      })
      return;
    } else {
      wx.showLoading({
        title: '正在提交',
      })
      wx.request({
        url: app.globalData.apiUrl.add1,
        data: {
          user_openId: app.globalData.openid,/// 创建者的openId
          site_id: that.data.id,// 工地Id
          images: imgs,///图片
          mechanical_name: mechanical_name,///机械名称
          number: number,/// 机械编号
          mechanical_model: mechanical_model,/// 规格型号
          handle: handle,/// 经手人
          useTime: mechanical_usageTime,/// 使用日期
          mechanical_beginUsageTime: mechanical_beginUsageTime,/// 使用开始时间
          mechanical_endUsageTime: mechanical_endUsageTime,/// 使用结束时间
          mechanical_unitPrice: mechanical_unitPrice,/// 机械单价
          mechanical_Part: mechanical_Part,/// 使用部位/使用部位
          mechanical_remarks: mechanical_remarks,/// 备注
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
              url: '../allorders/allorders?id=' + that.data.id + '&type=1',
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
              'part_name': res.data.data[i].list[s].name,
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