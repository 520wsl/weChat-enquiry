// pages/home/productList/productList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    params: {
      cat: '',//	关键词id	number	
      dim: 'trade',//	显示纬度	string	交易: trade （流量: flow目前不开放）
      num: 10,//	显示数量	number	10
      period: 'week',//	统计周期	string	近一周:week 近一月:month
      rankType: 'hot',//	排行类型	string	热门榜: hot 最新榜: latest 上升榜: rise
      time: new Date().getTime()//	时间戳	number	1515205535851
    },

    list: [],

    // 标签切换
    tabLabels: ['热销榜', '最新榜', '上升榜'],
    tabAcIndex: 0,
    rankType: ['hot', 'latest', 'rise'],

    // 时间切换
    labels: ['近一周', '近一月'],
    acIndex: 0,
    periodType: ['week', 'month'],

    // 搜索
    searchUrl: '',
    searchLabel: '产品关键词',

    // 弹窗
    modal: false,

    // 是否固定
    isFixed: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取产品关键词
    this.data.params.cat = options.classify || '';
    this.setData({
      searchLabel: options.categoryName || '产品关键词'
    })

    this.getList();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.list = [];
    this.getList(() => {
      // 关闭刷新
      wx.stopPullDownRefresh();
    });
  },

  // 页面滚动
  onPageScroll(Object) {
    let width = 375;
    try {
      let res = wx.getSystemInfoSync();
      width = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    let scrollTop = width * 88 / 375;
    if (Object.scrollTop >= scrollTop) {
      if (!this.data.isFixed) {
        this.setData({
          isFixed: true
        });
      }
    } else {
      if (this.data.isFixed) {
        this.setData({
          isFixed: false
        });
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 获取产品列表
  getList(cb) {
    // let data = [
    //   {
    //     comName: '浙江方盛管业有限公司',//	公司名称	string	
    //     flow: 100,//	流量	number	
    //     imgUrl: 'icon-touxiang.png',//	产品图片	string	
    //     price: 102,//	价格	number	
    //     sameGoodUrl: {
    //       type: String,
    //       value: ''
    //     },//	产品链接	string	
    //     title: '海尔美迪斯PPR管产家批发海尔美迪斯PPR管产家批发PPR管产家批发PPR管',//	标题	string	
    //     trade: 100,//	交易量	number	
    //   },
    //   {
    //     comName: '浙江方盛管业有限公司',
    //     flow: 100,//
    //     imgUrl: 'icon-touxiang.png',
    //     price: 102,
    //     title: '海尔美迪斯PPR管产家批发海尔美迪斯PPR管产家批发PPR管产家批发PPR管',
    //     trade: 100,
    //   },
    //   {
    //     comName: '浙江方盛管业有限公司',
    //     flow: 100,//
    //     imgUrl: 'icon-touxiang.png',
    //     price: 102,
    //     title: '海尔美迪斯PPR管产家批发海尔美迪斯PPR管产家批发PPR管产家批发PPR管',
    //     trade: 100,
    //   },
    //   {
    //     comName: '浙江方盛管业有限公司',
    //     flow: 100,//
    //     imgUrl: 'icon-touxiang.png',
    //     price: 102,
    //     title: '海尔美迪斯PPR管产家批发海尔美迪斯PPR管产家批发PPR管产家批发PPR管',
    //     trade: 100,
    //   },
    //   {
    //     comName: '浙江方盛管业有限公司',
    //     flow: 100,//
    //     imgUrl: 'icon-touxiang.png',
    //     price: 102,
    //     title: '海尔美迪斯PPR管产家批发海尔美迪斯PPR管产家批发PPR管产家批发PPR管',
    //     trade: 100,
    //   },
    //   {
    //     comName: '浙江方盛管业有限公司',
    //     flow: 100,//
    //     imgUrl: 'icon-touxiang.png',
    //     price: 102,
    //     title: '海尔美迪斯PPR管产家批发海尔美迪斯PPR管产家批发PPR管产家批发PPR管',
    //     trade: 100,
    //   }
    // ];
    // this.data.list.push(...data);
    // this.setData({
    //   list: this.data.list
    // });
    // return;
    wx.showLoading({ title: '加载中...' });
    app.get('/product/offer/rank', this.data.params).then((res) => {
      console.log(res);
      wx.hideLoading();
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
      if (data && data.length > 0) {
        this.data.list.push(...data);
        this.setData({
          list: this.data.list
        });
        return;
      }
      this.reset();
    }).catch((res) => {
      wx.hideLoading();
      if (typeof cb == 'function') {
        cb();
      }
    });
  },

  // 重置
  reset() {
    this.setData({
      list: [],
    })
  },

  // 获取选中的项
  getAcItem(e) {
    console.log(e);
    let index = e.detail.acIndex;
    this.data.params.period = this.data.periodType[index];
    this.data.list = [];
    this.getList();
  },

  // 获取选中榜
  getAcClass(e) {
    console.log(e);
    let index = e.detail.acIndex;
    this.data.params.rankType = this.data.rankType[index];
    this.data.list = [];
    this.getList();
  },

  // 显隐弹窗
  setModal() {
    this.setData({
      modal: !this.data.modal
    })
  },
})