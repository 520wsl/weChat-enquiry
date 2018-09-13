// pages/customer/searchWord.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    searchName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // 搜索结果
  searchHandle(e) {
    this.setData({
      searchName: e.detail.value
    });
  },
  // 跳转页面
  jumpPage(e) {
      wx.redirectTo({
        url: '/pages/customer/searchlist?keyword=' + this.data.searchName
    });
    return;
  },
})