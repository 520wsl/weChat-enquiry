// pages/personal/faq/faq.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    lists: [
      {
      title: '1、询盘数据页面显示代码错误',
      id: '1'
    }, 
      {
        title: '2、为什么收不到询盘推送？',
        id: '2'
      }, 
      {
        title: '3、为什么无法进入我的商品和我的订单？',
        id: '3'
      }, 
      {
        title: '4、绑定手机时，提示未绑定公司怎么办？',
        id: '4'
      },
      {
        title: '5、手机验证码问题',
        id: '5'
      },
      {
        title: '6、页面提示服务器错误',
        id: '6'
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {},
  toInfo(res) {
    let faqid = res.currentTarget.dataset.faqid || '';
    console.log('faqid', faqid)
    wx.navigateTo({
      url: "./faqInfo?faqid=" + faqid
    })
  }
})