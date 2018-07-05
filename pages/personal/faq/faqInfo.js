// pages/personal/faq/faqInfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    faqid:0,
    lists: [
      {
        title: '询盘数据页面显示代码错误',
        id: '1'
      },
      {
        title: '为什么收不到询盘推送？',
        id: '2'
      },
      {
        title: '为什么无法进入我的商品和我的订单？',
        id: '3'
      },
      {
        title: '绑定手机时，提示未绑定公司怎么办？',
        id: '4'
      },
      {
        title: '手机验证码问题',
        id: '5'
      },
      {
        title: '页面提示服务器错误',
        id: '6'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let faqid = options.faqid || 0;
    console.log('options', options)
    let title = this.data.lists[faqid]['title'];
    this.setData({
      faqid
    })
    wx.setNavigationBarTitle({
      title: title,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})