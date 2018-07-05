// pages/home/erp/myGoods/myGoods.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ALI: app.ALI,
    CDN: app.CDN,
    isShowGuide: false,
    guideStorageKey: 'guide-home-erp-myGoods',
    msgStr: '数据加载中，请稍后。。。',
    pageType: 1,
    list: [],
    countNum: [],
    optOrderNavId: 'all',
    params: {
      pageNum: 1,
      page: 1,
      pageSize: 8,
      count: 0,
      status: 0,
      keyword: ''
    },
    count: 0,
    isClear: false,
    isshowFooter: false,
    isOpen: false,
    types: [{
        key: 0,
        name: '全部',
        id: 'all'
      },
      {
        key: 1,
        name: '待付款',
        id: 'dfk'
      },
      {
        key: 2,
        name: '待发货',
        id: 'dfh'
      },
      {
        key: 3,
        name: '待收货',
        id: 'dsh'
      },
      {
        key: 4,
        name: '交易成功',
        id: 'success'
      },
      // {
      //   key: 5,
      //   name: '交易关闭',
      //   id: 'close'
      // },
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
  delKeyWord() {
    this.setData({
      'params.keyword': '',
      list: []
    })
    this.getList();
  },
  // 设置选项卡值
  setPageType(e) {
    let pageType = e.currentTarget.dataset && e.currentTarget.dataset.pagetype || 0;
    this.setPageTypeAll(pageType)
  },
  // 设置订单选项卡是否打开扩展
  setOpen() {
    let isOpen = !this.data.isOpen;
    this.setData({
      isOpen: isOpen
    });
  },
  jumpToSearchWord() {
    console.log(this.data)
    wx.navigateTo({
      url: '/pages/home/erp/myGoods/searchWord?status=' + this.data.params.status + '&keyword=' + this.data.params.keyword,
    })
  },
  optProNav(e) {
    console.log('e', e)
    let status = e.currentTarget.dataset && e.currentTarget.dataset.status || 1;
    this.setData({
      'params.status': status,
      list: [],
      'params.pageNum': 1,
      'params.page': 1
    })
    // this.getList()
    this.init(this.getList);
  },
  optOrderNav(e) {
    console.log('e', e.currentTarget.dataset)
    let status = e.currentTarget.dataset && e.currentTarget.dataset.status || 0;
    let optOrderNavId = e.currentTarget.dataset && e.currentTarget.dataset.optordernavid || 'all';
    console.log('optOrderNavId', optOrderNavId)
    this.setData({
      'params.status': status,
      list: [],
      optOrderNavId: optOrderNavId,
      isOpen: false,
      'params.pageNum': 1,
      'params.page': 1
    })
    // this.getOrder()
    this.init(this.getOrder);
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
          this.setData({
            msgStr: '抱歉!没有找到符合条件的记录'
          })
          app.utils.showModel('获取商品列表数据', res.msg);
          return;
        }
        this.data.count = res.data.count;
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
            count: this.data.count,
            msgStr: '抱歉!没有找到符合条件的记录'
          })
        } else {
          this.setData({
            msgStr: '抱歉!没有找到符合条件的记录'
          })
          this.reset();
        }
      })
      .catch(res => {
        console.log('获取商品列表数据', res)
        this.setData({
          msgStr: '抱歉!没有找到符合条件的记录'
        })
        if (typeof cb == 'function') {
          cb();
        }
      })
  },
  // 获取商品列表数据
  getList(cb) {
    // /product/searchproductlist
    // /product/list
    app
      .get('/product/searchproductlist', this.data.params)
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
          this.setData({
            msgStr: '抱歉!没有找到符合条件的记录'
          })
          app.utils.showModel('获取商品列表数据', res.msg);
          return;
        }
        this.data.count = res.data.count;
        if (res.data.countNum) {
          this.data.countNum = res.data.countNum;
          this.setData({
            countNum: res.data.countNum
          })
        }
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
            count: this.data.count,
            countNum: this.data.countNum,
            msgStr: '抱歉!没有找到符合条件的记录'
          })
        } else {
          this.setData({
            msgStr: '抱歉!没有找到符合条件的记录'
          })
          this.reset();
        }
      })
      .catch(res => {
        this.setData({
          msgStr: '抱歉!没有找到符合条件的记录'
        })
        console.log('获取商品列表数据', res)
        if (typeof cb == 'function') {
          cb();
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(' 生命周期函数--监听页面加载', options)
    this.data.params.pageNum = 1;
    this.data.params.page = 1;
    this.data.pageType = options.pageType || 1
    let keyword = options.keyword || '';
    let status = options.status || 1;
    if (this.data.pageType == 2) {
      status = options.status || 0;
    }
    console.log('status', status)

    if (this.data.pageType == 1) {
      wx.getStorage({
        key: this.data.guideStorageKey,
        fail: res => {
          this.setData({
            isShowGuide: true
          })
        }
      })
    }

    this.setData({
      'params.keyword': keyword,
      'params.status': status
    })
    this.setPageTypeAll(this.data.pageType);
    // this.init(this.getList);
  },
  setShowGuide() {
    this.setData({
      isShowGuide: false
    })
    wx.setStorage({
      key: this.data.guideStorageKey,
      data: false,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // this.getList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      isOpen: false
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
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
  onReachBottom: function() {
    if (this.data.list.length < this.data.count) {
      this.data.params.pageNum++;
      this.data.params.page++;
      this.data.isClear = true;

      let pageType = this.data.pageType;
      console.log('页面上拉触底事件的处理函数', this.data)
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
      wx.showLoading({
        title: '加载中...'
      });
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
      // return v;
      return 0;
    }
    return v.toFixed(2);
  }
})