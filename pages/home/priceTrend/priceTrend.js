// pages/home/priceTrend/priceTrend.js
import echarts from "../../../utils/resources/wxcharts.js";

let columnChart = null;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      categoryId: '',// 关键词 3~9005
      categoryType: 'browser'
    },
    // 列表数据
    list: [],

    // 搜索
    searchUrl: '',
    searchLabel: '产品关键词',

    // 商品切换
    labels: ['浏览商品', '交易商品'],
    acIndex: 0,
    categoryType: ['browser', 'trade'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取产品关键词
    this.data.params.categoryId = options.categoryId || '';
    this.setData({
      searchLabel: options.categoryName || '产品关键词'
    })

    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 获取数据
  getList() {
    // let data = {
    //   "msg": "获取数据成功",
    //   "data": {
    //     "trade": [
    //       {
    //         "name": "0~8元",
    //         "value": 16.75
    //       },
    //       {
    //         "name": "8~97元",
    //         "value": 10.15
    //       },
    //       {
    //         "name": "97~1,028元",
    //         "value": 64.97
    //       },
    //       {
    //         "name": "1,028~1,506元",
    //         "value": 3.55
    //       },
    //       {
    //         "name": "1,506~4,739元",
    //         "value": 4.06
    //       },
    //       {
    //         "name": ">=4,739元",
    //         "value": 0.51
    //       }
    //     ],
    //     "browser": [
    //       {
    //         "name": "0~8元",
    //         "value": 21.8
    //       },
    //       {
    //         "name": "8~97元",
    //         "value": 7.72
    //       },
    //       {
    //         "name": "97~1,028元",
    //         "value": 46.92
    //       },
    //       {
    //         "name": "1,028~1,506元",
    //         "value": 4.42
    //       },
    //       {
    //         "name": "1,506~4,739元",
    //         "value": 11.43
    //       },
    //       {
    //         "name": ">=4,739元",
    //         "value": 7.71
    //       }
    //     ],
    //     "maxBrowses": "97~1,028元",
    //     "empty": false,
    //     "maxTrades": "97~1,028元"
    //   },
    //   "status": 200
    // };
    // data = data.data;
    // let type = this.data.params.categoryType;
    // if (data[type] && data[type].length > 0) {
    //   this.data.list.push(...data[type]);
    //   this.setData({
    //     list: this.data.list
    //   });

    //   this.getEcharts(this.data.list);

    //   return;
    // }

    // return;
    // wx.showLoading({ title: '加载中...' });
    app.get('/alizs/price/analyse', this.data.params).then((res) => {
      console.log(res);
      // wx.hideLoading();

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
      let type = this.data.params.categoryType;
      if (data[type] && data[type].length > 0) {
        this.data.list.push(...data[type]);
        this.setData({
          list: this.data.list
        });
        // 图表
        this.getEcharts(this.data.list);
        return;
      }
      this.reset();
    }).catch((res) => {
      wx.hideLoading();
    });
  },

  // 重置
  reset() {
    this.setData({
      list: []
    });
  },

  // 获取切换项
  getAcItem(e) {
    console.log(e);
    let index = e.detail.acIndex;
    this.data.params.categoryType = this.data.categoryType[index];
    this.data.list = [];
    this.getList();
  },

  // 图表
  getEcharts(series) {
    let colorType = ['#9f73fb', '#52c187', '#5d77e5', '#f27a52', '#f1b93e', '#be9f46'];
    let newSeries = series.map((item, index) => {
      return {
        name: item.name,
        data: item.value,
        color: colorType[index % 6],
        format: function (val) {
          return item.value + '%';
        }
      }
    });
    
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    columnChart = new echarts({
      canvasId: 'columnCanvas',
      type: 'pie',
      animation: true,
      legend: false,
      series: newSeries,
      width: windowWidth,
      height: windowWidth * 270 / 375,
      dataLabel: true,
    });
  },
})