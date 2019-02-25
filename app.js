App({
  globalData: {
    openid: '',
    wxcode: '',
    userimg: '',
    sex: '',
    province: '',
    city: '',
    shares: '',
    country: '',
    // 配置文件
    companyname: '',
    shorthandname: '',
    appid: '',
    entid: '',
    mername: '',
    storeid: '',
    // 设置全局门店地址信息
    storedata: [],
    apiUrl: {
      // appApi: "https://www.iant.cn/workcalendar/OAuthcenter/OAuthcenterIndex",//获取用户appid
      // saveuseinfo: "https://www.iant.cn/workcalendar/OAuthcenter/NoExistsUser",//保存用户信息
      // indexApi: "https://www.iant.cn/workcalendar/Home/Index",//首页
      // CreateSite: "https://www.iant.cn/workcalendar/Site/CreateSite",//添加工程
      // GetSiteType: "https://www.iant.cn/workcalendar/Site/GetSiteType",//工程类别
      // GetStructureType: "https://www.iant.cn/workcalendar/Site/GetStructureType",//结构类型
      // UploadImageApi: "https://www.iant.cn/workcalendar/FileManage/UploadImage",//上传图片
      // SgxcGetList: "https://www.iant.cn/workcalendar/LaborSituation/GetList",//施工现场劳动力
      // sgload: "https://www.iant.cn/workcalendar/LaborSituation/Load",//施工现场劳动力选项加载
      // sgadd: "https://www.iant.cn/workcalendar/LaborSituation/Add",//施工现场劳动力添加
      // WcgclcGetList: "https://www.iant.cn/workcalendar/CompletionWork/GetList",//完成工程量
      // WcgclcGetListadd: "https://www.iant.cn/workcalendar/CompletionWork/Add",//完成工程量添加
      // CljcGetList: "https://www.iant.cn/workcalendar/Arrival/GetList",//材料进场情况
      // ClxqGetList: "https://www.iant.cn/workcalendar/MaterialDemand/GetList",//材料需求列表
      // CljcAdd: "https://www.iant.cn/workcalendar/Arrival/Add",//材料情况添加
      // ClxqAdd: "https://www.iant.cn/workcalendar/MaterialDemand/Add",//材料需求添加
      // ClxqGetModel: "https://www.iant.cn/workcalendar/MaterialDemand/GetModel",//材料需求详情
      // GetSiteDetails: "https://www.iant.cn/workcalendar/Site/GetSiteDetails",//详情
      // add1: "https://www.iant.cn/workcalendar/MechanicalUse/Add",//机械添加
      // JxxqAdd: "https://www.iant.cn/workcalendar/MechanicalDemand/Add",//机械需求添加
      // add1list: "https://www.iant.cn/workcalendar/MechanicalUse/GetList",//机械列表
      // jxxqlist: "https://www.iant.cn/workcalendar/MechanicalDemand/GetList",//机械需求列表
      // add2list: "https://www.iant.cn/workcalendar/Safety/GetList",//安全文明施工列表
      // add2: "https://www.iant.cn/workcalendar/Safety/Add",//安全文明施工添加
      // photolist: "https://www.iant.cn/workcalendar/ConstructionSite/GetList",//施工现场照片列表
      // photoadd: "https://www.iant.cn/workcalendar/ConstructionSite/Add",//施工现场照片添加
      // GetModel: "https://www.iant.cn/workcalendar/MechanicalUse/GetModel",//机械详情
      // JxxqGetModel: "https://www.iant.cn/workcalendar/MechanicalDemand/GetModel",//机械需求详情
      // clGetModel: "https://www.iant.cn/workcalendar/Arrival/GetModel",//材料进场情况详情
      // photoGetModel: "https://www.iant.cn/workcalendar/ConstructionSite/GetModel",//施工现场照片详情
      // wcGetModel: "https://www.iant.cn/workcalendar/CompletionWork/GetModel",//施工现场照片详情
      // aqGetModel: "https://www.iant.cn/workcalendar/Safety/GetModel",//安全文明施工详情
      // sgGetModel: "https://www.iant.cn/workcalendar/LaborSituation/GetModel",//施工现场劳动力详情
      // GetEquipmentType: "https://www.iant.cn/workcalendar/Dictionary/GetEquipmentType",//机械名称选项
      // GetRawMaterial: "https://www.iant.cn/workcalendar/Dictionary/GetRawMaterial",//材料名称预加载
      // ryxqGetList: "https://www.iant.cn/workcalendar/StaffingNeeds/GetList",//人员需求列表
      // ryxqAdd: "https://www.iant.cn/workcalendar/StaffingNeeds/Add",//人员需求添加
      // GetPart: "https://www.iant.cn/workcalendar/Dictionary/GetPart",//人员需求添加班组加载项
      // ryxqGetModel: "https://www.iant.cn/workcalendar/StaffingNeeds/GetModel",//人员需求详情
      // UserPwdShow: "https://www.iant.cn/workcalendar/UserManage/UserPwdShow",//密码管理加载
      // UserPwdHandle: "https://www.iant.cn/workcalendar/UserManage/UserPwdHandle",//密码管理提交
      // GetUnit: "https://www.iant.cn/workcalendar/Dictionary/GetUnit",//单位加载项
      // ShareHandle: "https://www.iant.cn/workcalendar/WeChatShare/ShareHandle",//分享邀请
      // JudgeProject: "https://www.iant.cn/workcalendar/Home/JudgeProject",//判断是否是自己的项目

//////////////////////////////////////////////////////////////////////////////////////////////////

      appApi: "https://www.wxpaying.com/OAuthcenter/OAuthcenterIndex",//获取用户appid
      saveuseinfo: "https://www.wxpaying.com/OAuthcenter/NoExistsUser",//保存用户信息
      indexApi: "https://www.wxpaying.com/Home/Index",//首页
      CreateSite: "https://www.wxpaying.com/Site/CreateSite",//添加工程
      GetSiteType: "https://www.wxpaying.com/Site/GetSiteType",//工程类别
      GetStructureType: "https://www.wxpaying.com/Site/GetStructureType",//结构类型
      UploadImageApi: "https://www.wxpaying.com/FileManage/UploadImage",//上传图片
      SgxcGetList: "https://www.wxpaying.com/LaborSituation/GetList",//施工现场劳动力
      sgload: "https://www.wxpaying.com/LaborSituation/Load",//施工现场劳动力选项加载
      sgadd: "https://www.wxpaying.com/LaborSituation/Add",//施工现场劳动力添加
      WcgclcGetList: "https://www.wxpaying.com/CompletionWork/GetList",//完成工程量
      WcgclcGetListadd: "https://www.wxpaying.com/CompletionWork/Add",//完成工程量添加
      CljcGetList: "https://www.wxpaying.com/Arrival/GetList",//材料进场情况
      ClxqGetList: "https://www.wxpaying.com/MaterialDemand/GetList",//材料需求列表
      CljcAdd: "https://www.wxpaying.com/Arrival/Add",//材料情况添加
      ClxqAdd: "https://www.wxpaying.com/MaterialDemand/Add",//材料需求添加
      ClxqGetModel: "https://www.wxpaying.com/MaterialDemand/GetModel",//材料需求详情
      GetSiteDetails: "https://www.wxpaying.com/Site/GetSiteDetails",//详情
      add1: "https://www.wxpaying.com/MechanicalUse/Add",//机械添加
      JxxqAdd: "https://www.wxpaying.com/MechanicalDemand/Add",//机械需求添加
      add1list: "https://www.wxpaying.com/MechanicalUse/GetList",//机械列表
      jxxqlist: "https://www.wxpaying.com/MechanicalDemand/GetList",//机械需求列表
      add2list: "https://www.wxpaying.com/Safety/GetList",//安全文明施工列表
      add2: "https://www.wxpaying.com/Safety/Add",//安全文明施工添加
      photolist: "https://www.wxpaying.com/ConstructionSite/GetList",//施工现场照片列表
      photoadd: "https://www.wxpaying.com/ConstructionSite/Add",//施工现场照片添加
      GetModel: "https://www.wxpaying.com/MechanicalUse/GetModel",//机械详情
      JxxqGetModel: "https://www.wxpaying.com/MechanicalDemand/GetModel",//机械需求详情
      clGetModel: "https://www.wxpaying.com/Arrival/GetModel",//材料进场情况详情
      photoGetModel: "https://www.wxpaying.com/ConstructionSite/GetModel",//施工现场照片详情
      wcGetModel: "https://www.wxpaying.com/CompletionWork/GetModel",//施工现场照片详情
      aqGetModel: "https://www.wxpaying.com/Safety/GetModel",//安全文明施工详情
      sgGetModel: "https://www.wxpaying.com/LaborSituation/GetModel",//施工现场劳动力详情
      GetEquipmentType: "https://www.wxpaying.com/Dictionary/GetEquipmentType",//机械名称选项
      GetRawMaterial: "https://www.wxpaying.com/Dictionary/GetRawMaterial",//材料名称预加载
      ryxqGetList: "https://www.wxpaying.com/StaffingNeeds/GetList",//人员需求列表
      ryxqAdd: "https://www.wxpaying.com/StaffingNeeds/Add",//人员需求添加
      GetPart: "https://www.wxpaying.com/Dictionary/GetPart",//人员需求添加班组加载项
      ryxqGetModel: "https://www.wxpaying.com/StaffingNeeds/GetModel",//人员需求详情
      UserPwdShow: "https://www.wxpaying.com/UserManage/UserPwdShow",//密码管理加载
      UserPwdHandle: "https://www.wxpaying.com/UserManage/UserPwdHandle",//密码管理提交
      GetUnit: "https://www.wxpaying.com/Dictionary/GetUnit",//单位加载项
      ShareHandle: "https://www.wxpaying.com/WeChatShare/ShareHandle",//分享邀请
      JudgeProject: "https://www.wxpaying.com/Home/JudgeProject",//判断是否是自己的项目

    },
    onLaunch: function (options) {
      console.log(options)
    },
  }
})