/*
 * @Author: Mad Dragon 
 * @E-Mail: 395548460@qq.com 
 * @Date: 2018-05-24 09:16:06 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-05-25 13:47:55
 */
// pages/home/erp/goodsInfo/album.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    subscript: '',
    productId: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('album-options', options)
    let subscript = options.subscript || 0;
    let productId = options.productId || '';
    this.setData({
      subscript: subscript,
      productId: productId
    })
    this.getList();
  },
  getList() {
    app
      .get('/product/getproductalbumlist')
      .then(e => {
        if (e.status !== 200) {
          app.utils.showModel('相册列表', e.msg);
        }
        if (e.status == 401) {
          wx.showModal({
            title: '提示',
            content: '登录超时或未登录，请重新登录',
            success: res => {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/personal/personal'
                })
              } else if (res.cancel) {
              }
            }
          })
          return;
        }
        this.setData({
          list: e.data
        })
      })
      .catch(res => {
        console.log(res);
        app.utils.showModel('相册列表', res.msg);
      });
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
  // 返回按钮
  backIndex() {
    let productId = this.data.productId || '';
    let subscript = this.data.subscript || 0;
    wx.redirectTo({
      url: '/pages/home/erp/goodsInfo/editGoodsInfo?pageType=edit&&productId=' + productId
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})