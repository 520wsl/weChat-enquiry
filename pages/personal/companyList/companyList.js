// pages/personal/companyList/companyList.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      lists: JSON.parse(options.lists)
    })
  },
  changeCompany: function(event){
    app.post('/auth/setcompany', { aliAccountId: event.target.dataset.id})
    wx.navigateTo({
      url: '../personal'
    })
    // wx.navigateBack()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})