// pages/home/erp/orderInfo/orderInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,

    info: null,

    params: {
      orderId: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.params.orderId = options.orderId;

    if (wx.showLoading) {
      wx.showLoading({ title: '加载中...' });
    }
    this.getInfo(() => {
      if (wx.hideLoading) {
        wx.hideLoading();
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 详情
  getInfo(cb) {
    let data = {
      allDeliveredTime: "2018-01-27 09:35:50",
      createTime: "2018-01-27 09:35:50",
      id: '111111111111111111',
      payTime: '2018-01-27 09:35:50',
      payWay: '',
      payWayStr: '支付宝',
      productItems: [
        {
          itemAmount: 1,
          name: '产品名称产品名称产品名称产品名称产品名称产品名称产品名称名称产品名称 2行隐藏',
          price: 1.40,
          productImgUrl: '',
          quantity: 5,
          unit: '个',
        },
        {
          itemAmount: 1,
          name: '产品名称产品名称产品名称产品名称产品名称产品名称产品名称名称产品名称 2行隐藏',
          price: 1.40,
          productImgUrl: '',
          quantity: 5,
          unit: '个',
        }
      ],
      qualityAssuranceType: '免费赊账',
      receiverInfo: [
        {
          toArea: '',
          toFullName: '',
          toMobile: '',
          toPhone: '',
        }
      ],
      receivingTime: '2018-01-27 09:35:50',
      status: '',
      statusStr: '其他原因'
    };
    this.setData({
      info: data
    });
    cb();
    return;
    app.get('/aliorder/get', this.data.params).then((res) => {
      console.log(res);
      if (typeof cb == 'function') {
        cb();
      }

      // 未登录、超时
      if (res.status == 401) {
        this.reset();
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
      if (res.status != 200) {
        this.reset();
        return;
      }

      let data = res.data;
      if (data) {
        this.setData({
          info: data
        });
        return;
      }
      this.reset();
    }).catch((res) => {
      console.log(res);
      if (typeof cb == 'function') {
        cb();
      }
    });
  },

  // 重置
  reset() {
    this.setData({
      info: null
    })
  }
})