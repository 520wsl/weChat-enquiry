// pages/home/erp/logisticsInfo/logisticsInfo.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    show: [],
    goodsList: [],
    orderId:'',
    params:[
      {
        "aliProductVos": [
        {
        "maxPrice": null,
        "minPrice": null,
        "productId": null,
        "productImage": null,
        "productName": "高档防真植物壁挂 防真人造9头绣球壁挂花 办公 室内 婚庆装饰",
        "quantity": "3.0",
        "unit": "束"
        },
        {
        "maxPrice": null,
        "minPrice": null,
        "productId": null,
        "productImage": null,
        "productName": "高档防真植物壁挂 防真人造9头绣球壁挂花 办公 室内 婚庆装饰",
        "quantity": "3.0",
        "unit": "束"
        },
        {
        "maxPrice": null,
        "minPrice": null,
        "productId": null,
        "productImage": null,
        "productName": "高档防真植物壁挂 防真人造9头绣球壁挂花 办公 室内 婚庆装饰",
        "quantity": "3.0",
        "unit": "束"
        },
        {
        "maxPrice": null,
        "minPrice": null,
        "productId": null,
        "productImage": null,
        "productName": "高档防真植物壁挂 防真人造9头绣球壁挂花 办公 室内 婚庆装饰",
        "quantity": "3.0",
        "unit": "束"
        },
        {
        "maxPrice": null,
        "minPrice": null,
        "productId": null,
        "productImage": null,
        "productName": "高档防真植物壁挂 防真人造9头绣球壁挂花 办公 室内 婚庆装饰",
        "quantity": "3.0",
        "unit": "束"
        },
        {
        "maxPrice": null,
        "minPrice": null,
        "productId": null,
        "productImage": null,
        "productName": "高档防真植物壁挂 防真人造9头绣球壁挂花 办公 室内 婚庆装饰",
        "quantity": "3.0",
        "unit": "束"
        }
        ],
        "logisticsBillNo": "3101619509830",
        "logisticsCompanyName": "韵达快运",
        "logisticsStepFirst": {
        "acceptTime": "2018-01-26 19:07:31",
        "date": null,
        "remark": "在天津武清区公司进行揽件扫描",
        "time": null
        },
        "logisticsSteps": [
        {
        "acceptTime": "2018-02-01 20:30:36",
        "date": "2018-02-01",
        "remark": "快件已被 ,已签收 签收",
        "time": "20:30:36"
        },
        {
        "acceptTime": "2018-02-01 15:53:36",
        "date": "2018-02-01",
        "remark": "在福建浦城县公司进行派件扫描；派送业务员：孙桂友；联系电话：18063714530",
        "time": "15:53:36"
        },
        {
        "acceptTime": "2018-02-01 14:19:04",
        "date": "2018-02-01",
        "remark": "到达目的地网点福建浦城县公司，快件将很快进行派送",
        "time": "14:19:04"
        },
        {
        "acceptTime": "2018-01-31 19:42:59",
        "date": "2018-01-31",
        "remark": "从福建三明分拨中心发出，本次转运目的地：福建浦城县公司",
        "time": "19:42:59"
        },
        {
        "acceptTime": "2018-01-31 09:06:18",
        "date": "2018-01-31",
        "remark": "在福建晋江分拨中心进行装车扫描，即将发往：福建三明分拨中心",
        "time": "09:06:18"
        },
        {
        "acceptTime": "2018-01-31 08:56:13",
        "date": "2018-01-31",
        "remark": "在分拨中心福建晋江分拨中心进行卸车扫描",
        "time": "08:56:13"
        },
        {
        "acceptTime": "2018-01-26 23:17:57",
        "date": "2018-01-26",
        "remark": "在天津分拨中心进行装车扫描，即将发往：福建晋江分拨中心",
        "time": "23:17:57"
        },
        {
        "acceptTime": "2018-01-26 21:36:22",
        "date": "2018-01-26",
        "remark": "在分拨中心天津分拨中心进行称重扫描",
        "time": "21:36:22"
        },
        {
        "acceptTime": "2018-01-26 19:07:31",
        "date": "2018-01-26",
        "remark": "在天津武清区公司进行揽件扫描",
        "time": "19:07:31"
        }
        ]
        },
        {
          "aliProductVos": [
          {
          "maxPrice": null,
          "minPrice": null,
          "productId": null,
          "productImage": null,
          "productName": "高档防真植物壁挂 防真人造9头绣球壁挂花 办公 室内 婚庆装饰",
          "quantity": "3.0",
          "unit": "束"
          },
          {
          "maxPrice": null,
          "minPrice": null,
          "productId": null,
          "productImage": null,
          "productName": "高档防真植物壁挂 防真人造9头绣球壁挂花 办公 室内 婚庆装饰",
          "quantity": "3.0",
          "unit": "束"
          },
          {
          "maxPrice": null,
          "minPrice": null,
          "productId": null,
          "productImage": null,
          "productName": "高档防真植物壁挂 防真人造9头绣球壁挂花 办公 室内 婚庆装饰",
          "quantity": "3.0",
          "unit": "束"
          },
          {
          "maxPrice": null,
          "minPrice": null,
          "productId": null,
          "productImage": null,
          "productName": "高档防真植物壁挂 防真人造9头绣球壁挂花 办公 室内 婚庆装饰",
          "quantity": "3.0",
          "unit": "束"
          },
          {
          "maxPrice": null,
          "minPrice": null,
          "productId": null,
          "productImage": null,
          "productName": "高档防真植物壁挂 防真人造9头绣球壁挂花 办公 室内 婚庆装饰",
          "quantity": "3.0",
          "unit": "束"
          },
          {
          "maxPrice": null,
          "minPrice": null,
          "productId": null,
          "productImage": null,
          "productName": "高档防真植物壁挂 防真人造9头绣球壁挂花 办公 室内 婚庆装饰",
          "quantity": "3.0",
          "unit": "束"
          }
          ],
          "logisticsBillNo": "3101619509830",
          "logisticsCompanyName": "韵达快运",
          "logisticsStepFirst": {
          "acceptTime": "2018-01-26 19:07:31",
          "date": null,
          "remark": "在天津武清区公司进行揽件扫描",
          "time": null
          },
          "logisticsSteps": [
          {
          "acceptTime": "2018-02-01 20:30:36",
          "date": "2018-02-01",
          "remark": "快件已被 ,已签收 签收",
          "time": "20:30:36"
          },
          {
          "acceptTime": "2018-02-01 15:53:36",
          "date": "2018-02-01",
          "remark": "在福建浦城县公司进行派件扫描；派送业务员：孙桂友；联系电话：18063714530",
          "time": "15:53:36"
          },
          {
          "acceptTime": "2018-02-01 14:19:04",
          "date": "2018-02-01",
          "remark": "到达目的地网点福建浦城县公司，快件将很快进行派送",
          "time": "14:19:04"
          },
          {
          "acceptTime": "2018-01-31 19:42:59",
          "date": "2018-01-31",
          "remark": "从福建三明分拨中心发出，本次转运目的地：福建浦城县公司",
          "time": "19:42:59"
          },
          {
          "acceptTime": "2018-01-31 09:06:18",
          "date": "2018-01-31",
          "remark": "在福建晋江分拨中心进行装车扫描，即将发往：福建三明分拨中心",
          "time": "09:06:18"
          },
          {
          "acceptTime": "2018-01-31 08:56:13",
          "date": "2018-01-31",
          "remark": "在分拨中心福建晋江分拨中心进行卸车扫描",
          "time": "08:56:13"
          },
          {
          "acceptTime": "2018-01-26 23:17:57",
          "date": "2018-01-26",
          "remark": "在天津分拨中心进行装车扫描，即将发往：福建晋江分拨中心",
          "time": "23:17:57"
          },
          {
          "acceptTime": "2018-01-26 21:36:22",
          "date": "2018-01-26",
          "remark": "在分拨中心天津分拨中心进行称重扫描",
          "time": "21:36:22"
          },
          {
          "acceptTime": "2018-01-26 19:07:31",
          "date": "2018-01-26",
          "remark": "在天津武清区公司进行揽件扫描",
          "time": "19:07:31"
          }
          ]
          }],
 
  },
  clickHandle(e) {
    let index=e.currentTarget.dataset.index;
    if(this.data.show[index]){
       this.data.show[index] = false;
    }else{
      this.data.show[index] = true;
    }
    this.setData({
      show: this.data.show
    });
  },
  showALL(e) {
    let index=e.currentTarget.dataset.goodslist;
    if(!this.data.goodsList[index]){
       this.data.goodsList[index] = '999999';
    }else{
      this.data.goodsList[index] = '2';
    }
      this.setData({
        goodsList: this.data.goodsList
      });
  },
  getOrderList(){
    if (wx.showLoading) {
      wx.showLoading({ title: '加载中...' });
    }
    app
    .get('/aliorder/logistics', { orderId: this.data.orderId })
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
      orderId: options.orderId,
    });
    this.getOrderList();
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
