// pages/home/erp/myGoods/myGoods.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ALI: app.ALI,
    CDN: app.CDN,
    pageType: 1,
    list: [],
    params: {
      pageNum: 1,
      page: 1,
      pageSize: 8,
      count: 0
    },
    count: 0,
    isClear: false,
    isshowFooter: false,
    isOpen:false,
    types: [
      {
        key: 0,
        name: '全部'
      },
      {
        key: 1,
        name: '待付款'
      },
      {
        key: 2,
        name: '待发货'
      },
      {
        key: 3,
        name: '待收货'
      },
      {
        key: 7,
        name: '交易成功'
      },
      {
        key: 6,
        name: '交易关闭'
      },
    ]
  },
  setPageTypeAll(pageType) {
    this.setData({
      list: [],
      pageType: pageType
    })
    let title = '';

    this.data.params.pageNum = 1;
    this.data.params.page = 1;
    if (pageType == 1) {
      this.init(this.getList);
      title = '我的商品';
    } else if (pageType == 2) {
      // 订单列表
      this.init(this.getOrder);
      title = '我的订单';
    }
    wx.setNavigationBarTitle({
      title: title
    })
  },
  // 设置选项卡值
  setPageType(e) {
    let pageType = e.currentTarget.dataset && e.currentTarget.dataset.pagetype || 0;
    this.setPageTypeAll(pageType)
  },
  // 设置订单选项卡是否打开扩展
  setOpen(){
    let isOpen = !this.data.isOpen;
    this.setData({
      isOpen: isOpen
    });
  },
  getOrder(cb) {
    app
      .get('/aliorder/list', this.data.params)
      .then(res => {
        if (typeof cb == 'function') {
          cb();
        }
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
                });
                return;
              }
            }
          });
          return;
        }
        if (res.status !== 200) {
          this.reset();
          app.utils.showModel('获取商品列表数据', res.msg);
          return;
        }
        this.data.count = res.data.totalRecord;
        if (!this.data.isClear) {
          this.data.list = [];
        }
        this.data.isClear = false;
        if (res.data.result && res.data.result.length > 0) {
          res.data.result.forEach((item) => {
            item.shippingFee = this.toFixed(item.shippingFee);
            item.totalAmount = this.toFixed(item.totalAmount);
            let nCache = item.totalAmount.split('.');
            item.totalAmountDecimal = nCache[1];
            item.totalAmountInt = nCache[0];
            item.productItems.forEach((child) => {
              child.price = this.toFixed(child.price);
            })
          })
          this.data.list.push(...res.data.result);
          this.setData({
            'list': this.data.list,
            isshowFooter: false,
            count: this.data.count
          })
        } else {
          this.reset();
        }
      })
      .catch(res => {
        console.log('获取商品列表数据', res)
        if (typeof cb == 'function') {
          cb();
        }
      })
  },
  // 获取商品列表数据
  getList(cb) {
    app
      .get('/product/list', this.data.params)
      .then(res => {
        if (typeof cb == 'function') {
          cb();
        }
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
                });
                return;
              }
            }
          });
          return;
        }
        if (res.status !== 200) {
          this.reset();
          app.utils.showModel('获取商品列表数据', res.msg);
          return;
        }
        this.data.count = res.data.count;
        if (!this.data.isClear) {
          this.data.list = [];
        }
        this.data.isClear = false;
        if (res.data.productList && res.data.productList.length > 0) {
          res.data.productList.forEach((item) => {
            item.maxPrice = this.toFixed(item.maxPrice);
            item.minPrice = this.toFixed(item.minPrice);
          })
          this.data.list.push(...res.data.productList);
          this.setData({
            'list': this.data.list,
            isshowFooter: false,
            count: this.data.count
          })
        } else {
          this.reset();
        }
      })
      .catch(res => {
        console.log('获取商品列表数据', res)
        if (typeof cb == 'function') {
          cb();
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(' 生命周期函数--监听页面加载', options.pageType)
    this.data.params.pageNum = 1;
    this.data.params.page = 1;
    this.data.pageType = options.pageType || 1
    this.setPageTypeAll(this.data.pageType);
    // this.init(this.getList);
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
    // this.getList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({isOpen:false});
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
    this.data.params.pageNum = 1;
    this.data.params.page = 1;
    let pageType = this.data.pageType;
    if (pageType == 1) {
      this.getList(() => {
        wx.stopPullDownRefresh();
      });
    } else if (pageType == 2) {
      this.getOrder(() => {
        wx.stopPullDownRefresh()
      });
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.list.length < this.data.count) {
      this.data.params.pageNum++;
      this.data.params.page++;
      this.data.isClear = true;

      let pageType = this.data.pageType;
      if (pageType == 1) {
        this.getList(() => {
          setTimeout(() => {
            this.setShowFooter();
          }, 100);
        });
      } else if (pageType == 2) {
        this.getOrder(() => {
          setTimeout(() => {
            this.setShowFooter();
          }, 100);
        });
      }
    }

    if (!this.data.isshowFooter) {
      this.setShowFooter();
    }
  },
  setShowFooter() {
    this.setData({
      isshowFooter: true
    })
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },

  init(callback) {
    if (wx.showLoading) {
      wx.showLoading({ title: '加载中...' });
    }
    callback(() => {
      if (wx.hideLoading) {
        wx.hideLoading();
      }
    });
  },

  reset() {
    this.setData({
      'list': []
    })
  },
  toFixed(v) {
    if (v == '' || v == null || v == undefined) {
      return v;
    }
    return v.toFixed(2);
  }
})