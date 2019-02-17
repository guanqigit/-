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
    storedata:[],
    apiUrl: {
      appApi: "https://www.wxpaying.com/OAuthcenter/OAuthcenterIndex",//获取用户appid
      saveuseinfo: "https://www.wxpaying.com/OAuthcenter/NoExistsUser",//保存用户信息
      indexApi: "https://www.wxpaying.com/Home/Index",//首页
      CreateSite: "https://www.wxpaying.com/Site/CreateSite",//添加工程
      GetSiteType: "https://www.wxpaying.com/Site/GetSiteType",//工程类别
      GetStructureType: "https://www.wxpaying.com/Site/GetStructureType",//结构类型
      UploadImageApi: "https://www.wxpaying.com/FileManage/UploadImage",//上传图片
      SgxcGetList: "https://www.wxpaying.com/LaborSituation/GetList",//施工现场劳动力
      sgload: "https://www.wxpaying.com/LaborSituation/Load",//施工现场劳动力选项加载
      sgadd:"https://www.wxpaying.com/LaborSituation/Add",//施工现场劳动力添加
      WcgclcGetList: "https://www.wxpaying.com/CompletionWork/GetList",//完成工程量
      WcgclcGetListadd: "https://www.wxpaying.com/CompletionWork/Add",//完成工程量添加
      CljcGetList: "https://www.wxpaying.com/Arrival/GetList",//材料进场情况
      CljcAdd: "https://www.wxpaying.com/Arrival/Add",//材料进场情况添加
      GetSiteDetails: "https://www.wxpaying.com/Site/GetSiteDetails",//详情
      add1: "https://www.wxpaying.com/MechanicalUse/Add",//机械添加
      add1list: "https://www.wxpaying.com/MechanicalUse/GetList",//机械列表
      add2list: "https://www.wxpaying.com/Safety/GetList",//安全文明施工列表
      add2: "https://www.wxpaying.com/Safety/Add",//安全文明施工添加
      photolist: "https://www.wxpaying.com/ConstructionSite/GetList",//施工现场照片列表
      photoadd: "https://www.wxpaying.com/ConstructionSite/Add",//施工现场照片添加
      GetModel: "https://www.wxpaying.com/MechanicalUse/GetModel",//机械详情
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
        
    }
  }
})