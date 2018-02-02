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
    params: {
      amountOnSale: '1000',
      color: '红色',
      freightTemplate: '10',
      images: [
        'img/ibank/2017/568/558/4255855865_1192362946.jpg',
        'img/ibank/2017/568/558/4255855865_1192362946.jpg',
        'img/ibank/2017/568/558/4255855865_1192362946.jpg',
        'img/ibank/2017/568/558/4255855865_1192362946.jpg',
        'img/ibank/2017/568/558/4255855865_1192362946.jpg'
      ],
      list: [
        {
          attributeName: '货号',
          value: 'ppr'
        },
        {
          attributeName: '材质',
          value: '橡胶'
        },
        {
          attributeName: '品牌',
          value: 'ZUK'
        },
        {
          attributeName: '颜色',
          value: '家装、工程迈捷国标管(白色）,亚皇绿色抗菌管,亚皇高端家装管'
        }
      ],
      maxPrice: 145.84,
      minPrice: 45.23,
      minOrderQuantity: 100,
      sendGoodsAddress: '河南',
      sendGoodsCity: '郑州',
      skuInfos: '管；20*2.3冷水管；25*2.3冷水管；20*2.3',
      subject: 'ppr冷热水管厂家 ppr管材 排水管 自来水管 多种规格pp-r给水管',
      unit: '米'
    }
  },
  showNorm() {
    this.setData({
      show: !this.data.show
    });
  },
  productList(productId) {
    app
      .get('/product/detail', { productId: productId })
      .then(e => {
        console.log(e.data);
        if (e.status == 200) {
          this.setData({
            params: e.data
          });
        }
        //   if (e.status == 401) {
        //     wx.showModal({
        //         title: '提示',
        //         content: '登录超时或未登录，请重新登录',
        //         success: res => {
        //             if (res.confirm) {
        //                 app.reset();
        //                 wx.switchTab({
        //                     url: '/pages/personal/personal'
        //                 })
        //             } else if (res.cancel) {
        //             }
        //         }
        //     })
        //     return;
        // }
        console.log(e.list);
      })
      .catch(res => {
        console.log(res);
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.productList(536498208299);
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
