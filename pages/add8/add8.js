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
    objectMultiArray: [],
    name: '',
    isload: false
  },
  //项目名称
  setdata: function (e) {
    var that = this;
    if (e.currentTarget.dataset.id == 1) {
      that.setData({
        post1: e.detail.value,
        isload: true
      }, function () {
        that.getonland(e.detail.value);
      })
    }
    if (e.currentTarget.dataset.id == 2) {
      that.setData({
        post2: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 3) {
      that.setData({
        post3: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 4) {
      that.setData({
        post4: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 5) {
      that.setData({
        post5: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 6) {
      that.setData({
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
  remove: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.pics.splice(index, 1)
    this.setData({
      pics: this.data.pics
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
    var name = that.data.post1;
    var modelStr = that.data.post2;
    var count = that.data.post3;
    var price = that.data.post4;
    var partId = that.data.post5;
    var remark = that.data.post6;
    var part_id = that.data.part_id;
    var images = that.data.pics;
    if (name == '') {
      wx.showToast({
        title: ' 请填写材料名称',
        icon: 'none',
        mask: true
      })
      return;
    } 
    else if (count == '') {
      wx.showToast({
        title: ' 请填写数量',
        image: '../../image/chacha.png'
      })
      return;
    } else {
      wx.showLoading({
        title: '正在提交',
      })
      wx.request({
        url: app.globalData.apiUrl.ClxqAdd,
        data: {
          openId: app.globalData.openid,/// 用户openId openId
          site_id: that.data.id, /// 工程Id site_id 
          images: images,//图片
          name: name,//材料名称
          modelStr: modelStr,/// 规格型号
          unitStr: that.data.array[that.data.index],/// 单位/(如盒/箱/其他) 
          count: count,///  /// 数量
          price: price,/// 单价/元
          timeStr: that.data.date,/// 进厂时限 
          partId: partId,/// 施工部位
          remark: remark,/// 备注

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
            wx.navigateBack()
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
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value,
    })
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  onLoad: function (options) {
    var that = this;
    var time = new Date().getFullYear() + '-' + ((new Date().getMonth())+1)+'-'+new Date().getDate();
    that.setData({
      id: options.id,
      date: time
    })
    wx.request({
      url: app.globalData.apiUrl.GetUnit,
      data: {},
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        var arr = [];
        for (var i in res.data.list) {
          arr.push(res.data.list[i].Name)
        }
        that.setData({
          array: arr,
          Unitlist: res.data.list
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
    // wx.request({
    //   url: app.globalData.apiUrl.sgload,
    //   data: {},
    //   method: 'POST',
    //   header: { "Content-Type": "application/x-www-form-urlencoded" },
    //   success: function (res) {
    //     for (var i = 0; i < res.data.list.length; i++) {
    //       that.data.multiArray[0].push([res.data.list[i].part_name])
    //       for (var s = 0; s < res.data.list[i].item.length; s++) {
    //         that.data.objectMultiArray.push({
    //           'id': res.data.list[i].item[s].part_id,
    //           'part_name': res.data.list[i].item[s].part_name,
    //           'part_id': res.data.list[i].part_id
    //         })
    //       }
    //     }
    //     for (var i = 0; i < res.data.list[0].item.length; i++) {
    //       that.data.multiArray[1].push([res.data.list[0].item[i].part_name])
    //     }
    //     that.setData({
    //       multiArray: that.data.multiArray,
    //       objectMultiArray: that.data.objectMultiArray,
    //       list: res.data.list,
    //       part_id: res.data.list[0].item[0].part_id
    //     })
    //   }, fail: function () {

    //   },
    //   complete: function () {

    //   }
    // })
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
