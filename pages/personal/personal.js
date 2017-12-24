// pages/personal/personal.js
import utils from '../../utils/utils';
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    avatarUrl: '',
    companyName: '',
    isShowCompany: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 公司列表长度大于1时显示选择公司链接
    app.login();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getInfo();
    // console.log('aaaaaaaaaaaaaaaaaaaaa=>')
    // app.login();
    // app.ifBindPhone();
  },
  //获取页面数据
  getInfo: function () {
    console.log('res', app.globalData.customeInfo)
    if (app.globalData.customeInfo && app.globalData.customeInfo.companyName) {
      this.setData({
        info: app.globalData.customeInfo,
        avatarUrl: app.globalData.userInfo.avatarUrl || '',
        companyName: app.globalData.customeInfo.companyName,
        isShowCompany: app.globalData.customeInfo.companies.length > 1 ? true : false
      })
    }
  },
  // 点击登录
  login: function () {
    app.ifcheckSession()
  },
  // 选择公司列表
  toCompany: function () {
    wx.navigateTo({
      url: "./companyList/companyList"
    })
  },
  callPhone: function () {
    if (!this.data.info.phone) {
      return
    }
    wx.makePhoneCall({
      phoneNumber: this.data.info.phone
    })
  },
  // 退出登录事件
  // logOut: function(){
  //   wx.showModal({
  //     title: '提示',
  //     content: '确认退出登录？',
  //     success: function (res) {
  //       if (res.confirm) {

  //       } else if (res.cancel) {
  //         return
  //       }
  //     }
  //   })
  // }
})