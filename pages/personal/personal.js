// pages/personal/personal.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    isShowCompany: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
  },
  //登录后获取到页面数据
  getInfo: function(){
    app.get('/account/my').then(res=>{
      // 测试数据
      res = {
        "data": {
          "login": true,
          "avatar": "",
          "companyName": "123",
          "companies": [
            {
              "aliAccountId": 111111,
              "deleted": 0,
              "gmtCreate": 1513841991000,
              "gmtModified": 1513841988000,
              "id": 1,
              "name": "测试用公司1"
            }, 
            {
              "aliAccountId": 111111,
              "deleted": 0,
              "gmtCreate": 1513841991000,
              "gmtModified": 1513841988000,
              "id": 1,
              "name": "测试用公司1"
            }
          ],
          "customerServices": [
            {
              "name": "胖子",
              "phone": "123456789"
            }
          ],
          "phone": '18156'
        },
        "status": 200
      }
      if (res.status == 200) {
        // 根据公司列表长度判断是否显示公司列表选项
        var companyLength = res.data && res.data.companies && res.data.companies.length;
        this.setData({
          info: res.data,
          isShowCompany: Boolean(companyLength)
        })
      }
    })
  },
  toCompany: function(){
    wx.navigateTo({
      url: "./companyList/companyList?lists=" + JSON.stringify(this.data.info.companies)
    })
  },
  callPhone: function(){
    if (!this.data.info.phone){
      return
    }
    wx.makePhoneCall({
      phoneNumber: this.data.info.phone
    })
  },
  // 退出登录事件
  logOut: function(){
    wx.showModal({
      title: '提示',
      content: '确认退出登录？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})