// pages/home/erp/goodsInfo/goodsInfo.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    ALI: app.ALI,
    show: 0,
    productId:'',
    params: {
      // amountOnSale: '1000',
      // freightTemplate: '1',
      // images: [
      //   'img/ibank/2017/568/558/4255855865_1192362946.jpg',
      //   'img/ibank/2017/568/558/4255855865_1192362946.jpg',
      //   'img/ibank/2017/568/558/4255855865_1192362946.jpg',
      //   'img/ibank/2017/568/558/4255855865_1192362946.jpg',
      //   'img/ibank/2017/568/558/4255855865_1192362946.jpg'
      // ],
      // list: [
      //   {
      //     attributeName: '货号',
      //     attributeValue: 'ppr'
      //   },
      //   {
      //     attributeName: '材质',
      //     attributeValue: '橡胶'
      //   },
      //   {
      //     attributeName: '品牌',
      //     attributeValue: 'ZUK'
      //   },
      //   {
      //     attributeName: '颜色',
      //     attributeValue: '家装、工程迈捷国标管(白色）,亚皇绿色抗菌管,亚皇高端家装管'
      //   }
      // ],
      // skuList: [
      //   {
      //     attributeName: '货号',
      //     attributeValue: 'ppr'
      //   },
      //   {
      //     attributeName: '材质',
      //     attributeValue: '橡胶'
      //   },
      //   {
      //     attributeName: '品牌',
      //     attributeValue: 'ZUK'
      //   },
      //   {
      //     attributeName: '颜色',
      //     attributeValue: '家装、工程迈捷国标管(白色）,亚皇绿色抗菌管,亚皇高端家装管'
      //   }
      // ],
      // maxPrice: 145.84,
      // minPrice: 45.23,
      // minOrderQuantity: 100,
      // provinceName: '河南',
      // cityName: '郑州',
      // skuInfos: '管；20*2.3冷水管；25*2.3冷水管；20*2.3',
      // subject: 'ppr冷热水管厂家 ppr管材 排水管 自来水管 ',
      // unit: '米'
    }
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
  onLoad: function(options) {
    this.setData({
      productId: options.productId,
    });
    this.productList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
