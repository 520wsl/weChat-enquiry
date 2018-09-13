// pages/customer/customer.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    isShowSelect:false
  },
  toCustomerDetail:function (){
    wx.navigateTo({
      url: "/pages/customer/info/info"
    })
  },
  setIsShowSelect(){
    this.setData({
      isShowSelect: !this.data.isShowSelect
    })
  },
  toSearchWord(){
    wx.navigateTo({
      url: '/pages/customer/searchWord',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

})