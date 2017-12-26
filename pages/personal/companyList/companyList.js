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
    // app.get('/company/list').then(res => {
    //   // console.log(res);
    //   if (res.status === 200) {
    //     this.setData({
    //       lists: res.data
    //     })
    //   } else {
    //     utils.showModel('获取公司失败', res.msg)
    //   }
    // })
    if (app.globalData.companies)
      this.setData({
        lists: app.globalData.companies
      })
  },
  // 选择公司
  changeCompany: function (event) {
    console.log('changeCompany', event)
    wx.showModal({
      title: '提示',
      content: '是否切换公司?',
      success: function (res) {
        if (res.confirm) {
          app.setcompany(event.currentTarget.dataset.aliaccountid)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})