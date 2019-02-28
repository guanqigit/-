var app = getApp();
var tcity = require("../../utils/citys.js");
Page({
  data: {
    post1: '',
    post2: '',
    post3: '',
    post4: '',
    post5: '',
    post6: '',
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
    }
    if (e.currentTarget.dataset.id == 5) {
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
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  submit: function () {
    var that = this;
    var material_name = that.data.part_id;
    var material_model = that.data.post1;
    var material_count = that.data.post2;
    var material_price = that.data.post3;
    var material_useTime = that.data.post4;
    var material_part = that.data.post5;
    var material_remark = that.data.post6;
    var images = that.data.pics;
    if (material_model == '') {
      wx.showToast({
        title: ' 请填写规格型号',
        icon: 'none',
        mask: true
      })
      return;
    } 
    else if (material_count == '') {
      wx.showToast({
        title: ' 请填写数量',
        icon: 'none',
        mask: true
      })
      return;
    } else {
      wx.showLoading({
        title: '正在提交',
      })
      wx.request({
        url: app.globalData.apiUrl.JxxqAdd,
        data: {
          openId: app.globalData.openid,
          images: images,
          site_id: that.data.id,/// 工程Id 
          material_name: material_name,/// 名称 material_name 
          material_model: material_model,/// 规格型号 material_model 
          material_count: material_count,/// 数量 material_count 
          material_price: material_price,/// 单价 material_price 
          material_time: that.data.date,/// 进场时限 material_time 
          material_useTime: material_useTime,/// 时间 material_useTime 
          material_part: material_part,/// 施工部位 material_part 
          material_remark: material_remark,/// 备注 material_remark 
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
  bindMultiPickerChange: function (e) {
    this.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1],
      part_id: this.data.list[e.detail.value[0]].item[e.detail.value[1]].part_id
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var that = this;
    switch (e.detail.column) {
      case 0:
        var list = []
        for (var i = 0; i < that.data.objectMultiArray.length; i++) {
          if (that.data.objectMultiArray[i].part_id == that.data.list[e.detail.value].part_id) {
            list.push(that.data.objectMultiArray[i].part_name)
          }
        }
        that.setData({
          "multiArray[1]": list,
          "multiIndex[0]": e.detail.value,
          "multiIndex[1]": 0
        })

    }
  },
  onLoad: function (options) {
    var that = this;
    var time = new Date().getFullYear() + '-' + ((new Date().getMonth()) + 1) + '-' + new Date().getDate();
    that.setData({
      id: options.id,
      date: time
    })
    wx.request({
      url: app.globalData.apiUrl.sgload,
      data: {},
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        for (var i = 0; i < res.data.list.length; i++) {
          that.data.multiArray[0].push([res.data.list[i].part_name])
          for (var s = 0; s < res.data.list[i].item.length; s++) {
            that.data.objectMultiArray.push({
              'id': res.data.list[i].item[s].part_id,
              'part_name': res.data.list[i].item[s].part_name,
              'part_id': res.data.list[i].part_id
            })
          }
        }
        for (var i = 0; i < res.data.list[0].item.length; i++) {
          that.data.multiArray[1].push([res.data.list[0].item[i].part_name])
        }
        that.setData({
          multiArray: that.data.multiArray,
          objectMultiArray: that.data.objectMultiArray,
          list: res.data.list,
          part_id: res.data.list[0].item[0].part_id
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
