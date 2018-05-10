// pages/personal/companyList/companyList.js
import utils from '../../../utils/utils';
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    lists: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getList()
  },
  getList: function () {
    app.get('/company/list').then(res => {
      if (res.status == 401) {
        wx.showModal({
          title: '提示',
          content: '登录超时或未登录，请重新登录',
          success: res => {
            if (res.confirm) {
              app.reset();
              wx.switchTab({
                url: '/pages/personal/personal'
              })
            } else if (res.cancel) {
            }
          }
        })
        return;
      }
      if (res.status === 200) {
        app.globalData.companies = res.data
        this.setData({
          lists: app.globalData.companies
        })
      }
    })
  },
  // 选择公司
  changeCompany: function (event) {
    // console.log('changeCompany', event)
    wx.showModal({
      title: '提示',
      content: '是否切换公司?',
      success: function (res) {
        if (res.confirm) {
          if (wx.showLoading) {
            wx.showLoading({ title: '加载中...' });
          }
          app.setcompany(event.currentTarget.dataset.aliaccountid, () => {
            if (wx.hideLoading) {
              wx.hideLoading();
            }
          })
          wx.setStorage({
            key: 'searchList',
            data: [],
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  }
})