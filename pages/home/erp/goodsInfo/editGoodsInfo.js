// pages/home/erp/goodsInfo/editGoodsInfo.js
// pages/home/erp/goodsInfo/goodsInfo.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    ALI: app.ALI,
    show: false,
    productId: '',
    params: {}
  },
  showNorm() {
    this.setData({
      show: !this.data.show
    });
  },
  productList(productId) {
    if (wx.showLoading) {
      wx.showLoading({ title: '加载中...' });
    }
    app
      .get('/product/detail', { productId: this.data.productId })
      .then(e => {
        if (e.status == 200) {
          if (wx.hideLoading) {
            wx.hideLoading();
          }
          e.data.maxformatData = this.formatData(e.data.maxPrice);
          e.data.minformatData = this.formatData(e.data.minPrice);
          this.setData({
            params: e.data
          });
        }
        if (e.status == 401) {
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
      })
      .catch(res => {
        console.log(res);
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      productId: options.productId,
    });
    // this.productList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '四喜E伙伴',
      path: '/pages/share/goodsInfo/goodsInfo?productId=' + this.data.productId + '&aliAccountId=' + app.globalData.customeInfo.aliAccountId
    }
  },
  formatData(v) {
    if (v) {
      v = v.toFixed(2);
      let cache = v.split('.');
      let vInt = cache[0];
      let vDouble = cache[1];
      return {
        vInt, vDouble
      }
    }
    return v;
  }
});
