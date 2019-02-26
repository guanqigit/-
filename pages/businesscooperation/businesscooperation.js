var app = getApp();
var tcity = require("../../utils/citys.js");
Page({
  data: {
    pics: [],
    site_engineeringType: "",
    site_structureType: "",
    date: '2018-09-01',
    dates: '2018-09-01',
    gcname: '',
    gcaddress: '',
    jsname: '',
    jsuser: '',
    jsphone: '',
    sgname: '',
    sguser: '',
    sgphone: '',
    jlname: '',
    jluser: '',
    jlphone: '',
    sjname: '',
    sjuser: '',
    sjphone: '',
    kcname: '',
    kcuser: '',
    kcphone: '',
    jzmj: '',
    gczj: '',
    jianjie: '',
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
        gcname: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        gcaddress: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 3) {
      this.setData({
        jsname: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 4) {
      this.setData({
        jsuser: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 5) {
      this.setData({
        jsphone: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 6) {
      this.setData({
        sgname: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 7) {
      this.setData({
        sguser: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 8) {
      this.setData({
        sgphone: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 9) {
      this.setData({
        jlname: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 10) {
      this.setData({
        jluser: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 11) {
      this.setData({
        jlphone: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 12) {
      this.setData({
        sjname: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 13) {
      this.setData({
        sjuser: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 14) {
      this.setData({
        sjphone: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 15) {
      this.setData({
        kcname: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 16) {
      this.setData({
        kcuser: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 17) {
      this.setData({
        kcphone: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 18) {
      this.setData({
        jzmj: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 19) {
      this.setData({
        gczj: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 20) {
      this.setData({
        jianjie: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 21) {
      this.setData({
        site_engineeringType: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == 22) {
      this.setData({
        site_structureType: e.detail.value
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
  //合作方式
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
    })
  },
  bindPickerChanges: function (e) {
    this.setData({
      index1: e.detail.value,
    })
  },
  //创建时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChanges: function (e) {
    this.setData({
      dates: e.detail.value
    })
  },
  submit: function () {
    var that = this;
    var site_name = that.data.gcname;
    var site_address = that.data.gcaddress;
    var site_companyName = that.data.jsname;
    var site_companyContact = that.data.jsuser;
    var site_companyTell = that.data.jsphone;
    var site_constructionName = that.data.sgname;
    var site_constructionContact = that.data.sguser;
    var site_constructionTell = that.data.sgphone;
    var site_supervisionName = that.data.jlname;
    var site_supervisionContact = that.data.jluser;
    var site_supervisionTell = that.data.jlphone;
    var site_designName = that.data.sjname;
    var site_designContact = that.data.sjuser;
    var site_designTell = that.data.sjphone;
    var site_surveyName = that.data.kcname;
    var site_surveyContact = that.data.kcuser;
    var site_surveyTell = that.data.kcphone;
    var site_engineeringType = that.data.site_engineeringType;//工程类别 
    var site_structureType = that.data.site_structureType;//结构类型
    var site_constructionArea = that.data.jzmj;
    var site_projectCosts = that.data.gczj;
    var site_Introduction = that.data.jianjie;
    var site_startTime = that.data.date;//开工日期
    var site_completion = that.data.dates;//计划竣工日期
    var imgs = that.data.pics;
    if (imgs == '') {
      wx.showToast({
        title: ' 请上传图片',
        icon: 'none',
        mask: true
      })
      return;
    }
    if (imgs.length > 10) {
      wx.showToast({
        title: '请最多上传10张图片',
        icon: 'none',
        mask: true
      })
      return;
    }
    if (site_name == '') {
      wx.showToast({
        title: ' 请填写工程名称',
        icon: 'none',
        mask: true
      })
      return;
    } else {
      wx.showLoading({
        title: '正在提交',
      })
      wx.request({
        url: app.globalData.apiUrl.CreateSite,
        data: {
          openid: app.globalData.openid,
          site_name: site_name,
          site_address: site_address,
          site_companyName: site_companyName,
          site_companyContact: site_companyContact,
          site_companyTell: site_companyTell,
          site_constructionName: site_constructionName,
          site_constructionContact: site_constructionContact,
          site_constructionTell: site_constructionTell,
          site_supervisionName: site_supervisionName,
          site_supervisionContact: site_supervisionContact,
          site_supervisionTell: site_supervisionTell,
          site_designName: site_designName,
          site_designContact: site_designContact,
          site_designTell: site_designTell,
          site_surveyName: site_surveyName,
          site_surveyContact: site_surveyContact,
          site_surveyTell: site_surveyTell,
          site_engineeringType: site_engineeringType,//工程类别
          site_structureType: site_structureType,//结构类型
          site_constructionArea: site_constructionArea,
          site_projectCosts: site_projectCosts,
          site_Introduction: site_Introduction,
          site_startTime: site_startTime,//开工日期
          site_completion: site_completion,//计划竣工日期
          images: imgs,
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
              url: '../index/index',
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
  onLoad: function () {
    var that = this;
    var time = new Date().getFullYear() + '-' + ((new Date().getMonth()) + 1) + '-' + new Date().getDate();
    that.setData({
      date:time,
      dates:time,
    })
    // wx.request({
    //   url: app.globalData.apiUrl.GetSiteType,
    //   data: {},
    //   method: 'POST',
    //   header: { "Content-Type": "application/x-www-form-urlencoded" },
    //   success: function (res) {
    //     var list = [];
    //     for (var i = 0; i < res.data.list.length; i++) {
    //       list.push(res.data.list[i].siteType_name)
    //     }
    //     that.setData({
    //       array: list,
    //       gclxlist:res.data.list
    //     })
    //   }, fail: function () {
    //   },
    //   complete: function () {

    //   }
    // })
    // wx.request({
    //   url: app.globalData.apiUrl.GetStructureType,
    //   data: {},
    //   method: 'POST',
    //   header: { "Content-Type": "application/x-www-form-urlencoded" },
    //   success: function (res) {
    //     var list = [];
    //     for (var i = 0; i < res.data.list.length; i++) {
    //       list.push(res.data.list[i].siteType_name)
    //     }
    //     that.setData({
    //       array1: list,
    //       gczjlist: res.data.list
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