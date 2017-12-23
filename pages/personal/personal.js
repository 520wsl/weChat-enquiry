// pages/personal/personal.js
import utils from '../../utils/utils';
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
    // 公司列表长度大于1时显示选择公司链接
    if (app.globalData.customeInfo && app.globalData.customeInfo.companies){
      this.setData({
        isShowCompany: app.globalData.customeInfo.companies.length > 1 ? true : false
      })
    }
    this.getInfo();
  },
  //获取页面数据
  getInfo: function(){
    app.get('/account/my').then(res=>{
      if (res.status == 200) {
        this.setData({
          info: res.data
        })
      }else{
        utils.showModel('获取页面数据失败：', res.errMsg)
        return
      }
    })
  },
  // 点击登录
  login: function(){
    app.login()
  },
  // 选择公司列表
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