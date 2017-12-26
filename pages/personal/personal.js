// pages/personal/personal.js
import utils from '../../utils/utils';
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    info: {},
    avatarUrl: '',
    companyName: '',
    services: [],
    isShowCompany: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 公司列表长度大于1时显示选择公司链接
    this.login();
    this.getServices();
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
  getServices: function () {
    app
      .get('/common/services')
      .then(res => {
        if (res.status !== 200) {
          console.log('获取客服接口', res)
          return;
        }
        this.setData({
          services: res.data
        })
      })
  },
  //获取页面数据
  getInfo: function () {
    console.log('res', app.globalData.customeInfo)
    if (app.globalData.customeInfo && app.globalData.customeInfo.companyName) {
      this.setData({
        info: app.globalData.customeInfo,
        companyName: app.globalData.customeInfo.companyName,
        isShowCompany: app.globalData.customeInfo.companies.length > 1 ? true : false
      })
    }
    if (app.globalData.userInfo && app.globalData.userInfo.avatarUrl) {
      let avatarUrl = app.globalData.userInfo.avatarUrl || ''
      this.setData({
        avatarUrl: avatarUrl
      })
    }
  },
  // 点击登录
  login: function () {
    app.login()
  },
  // 选择公司列表
  toCompany: function () {
    wx.navigateTo({
      url: "./companyList/companyList"
    })
  },
  callPhone: function (res) {
    if (!res.currentTarget.dataset.phone) {
      return
    }
    wx.makePhoneCall({
      phoneNumber: res.currentTarget.dataset.phone
    })
  },
  // 退出登录事件
  logOut: function () {
    wx.showModal({
      title: '提示',
      content: '确认退出登录？',
      success: res => {
        if (res.confirm) {
          this.setData({
            info: {},
            avatarUrl: '',
            companyName: '',
            isShowCompany: false
          })

        } else if (res.cancel) {
          return
        }
      }
    })
  }
})