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
    if (app.globalData.companies)
      this.setData({
        lists: app.globalData.companies
      })
  },
  // 选择公司
  changeCompany: function (event) {
    console.log('changeCompany', event)
    app.setcompany(event.currentTarget.dataset.aliaccountid)
  }
})