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
    pics: [],
    isload: false
  },
  //项目名称
  name: function (e) {
    var that = this;
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        post1: e.detail.value,
        isload: true
      }, function () {
        that.getonland(e.detail.value);
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
  setname: function (e) {
    this.setData({
      post1: e.currentTarget.dataset.name,
      isload: false
    })
  },
  getonland: function (postdata) {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl.GetRawMaterial,
      data: {
        searchName: postdata,
      },
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        console.log(res)
        that.setData({
          loadlist: res.data.list
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
    var arrival_name = that.data.post1;
    var arrival_count = that.data.post2;
    var arrival_unitPrice = that.data.post3;
    var arrival_Signer = that.data.post4;
    var arrival_part = that.data.post5;
    var arrival_remarks = that.data.post6;
    var images = that.data.pics
    if (images.length == 0) {
      wx.showToast({
        title: ' 请上传图片',
        image: '../../image/chacha.png'
      })
      return;
    }
    if (arrival_name == '' || arrival_count == '' || arrival_unitPrice == '' || arrival_Signer == '' || arrival_part == '') {
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
        url: app.globalData.apiUrl.CljcAdd,
        data: {
          images: images,//图片
          openid: app.globalData.openid,
          arrival_name: arrival_name,/// 材料名称
          arrival_count: arrival_count,// 数量
          arrival_unitPrice: arrival_unitPrice,// 单价
          arrival_Signer: arrival_Signer,// 签收人
          arrival_part: arrival_part,// 使用部位
          arrival_remarks: arrival_remarks,// 备注信息
          site_id: that.data.id,
          modes: modes,// 规格型号
          number: number,// 货单号
          carnumber: carnumber,// 车牌号
          supplier: supplier,// 供应商
          unit: unit,// 单位
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
              url: '../allorders2/allorders?id=' + that.data.id + '&type=1',
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