// pages/home/home.js
import echarts from "../../utils/resources/wxcharts.js";

var columnChart = null;
var chartData = {
  main: {
    title: '总成交量',
    data: [282, 182, 232, 144, 182],
    categories: ['浙江', '山东', '广东', '安徽', '江苏']
  }
};

const app = getApp();
app.title = '杭州长风五金机械制造有限公司';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // banner
    /**轮播数据 */
    imgUrls: [
      'http://3.img.dianjiangla.com/uploads/1d6a35a4a970560b71127986c78b1653391418.jpg'
    ],
    indicatorDots: false,      //是否显示面板指示点

    endTime: '',
    startTime: '',
    // 询盘
    enquire: {},
    // 客户地区
    customerarea: [],
    // 公司
    company: app.title,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 请求接口
    this.getAjax();
  },

  getAjax() {
    // 客户地区
    this.getCustomArea();
    // 询盘统计
    this.getEnquire();
  },
  // 客户地区
  getCustomArea() {
    this.setData({
      customerarea: [
        {
          // 金额
          money: '33333.33',
          // 人数
          peopleNum: '15',
          // 地区名称
          province: '浙江省'
        },
        {
          money: '11111.00',
          peopleNum: '12',
          province: '山东省'
        },
        {
          money: '22222.33',
          peopleNum: '10',
          province: '湖南省'
        },
        {
          money: '11111.00',
          peopleNum: '9',
          province: '四川省'
        },
        {
          money: '22222.33',
          peopleNum: '8',
          province: '江苏省'
        }
      ]
    });
    this.getEcharts();
    return;
    app.get('/enquire/customerarea', {
      startTime: this.data.startTime,
      endTime: this.data.endTime
    }).then(res => {
      this.setData({
        customerarea: res.data
      });
      this.getEcharts();
    }).catch(res => {
      console.log(res);
    });
  },
  // 询盘统计
  getEnquire() {
    this.setData({
      enquire: {
        // 跟单价值
        enquireValue: '213200',
        // 丢失价值
        lossValue: '213200',
        // 总价值
        totalValue: '213200',
        // 成交价值
        tranValue: '213200'
      }
    });
    return;
    app.get('/enquire/statistics', {
      startTime: this.data.startTime,
      endTime: this.data.endTime
    }).then(res => {
      this.setData({
        enquire: res.data
      })
    }).catch(res => {
      console.log(res);
    });
  },
  // 图表
  getEcharts() {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth =

        res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    console.log(this.data.customerarea);
    let categories = this.data.customerarea.map(item => {
      return item.province;
    });
    let series = {};
    series.data = this.data.customerarea.map(item => {
      return item.money;
    });
    let subCategories = this.data.customerarea.map(item => {
      return item.peopleNum + '人';
    });
    
    columnChart = new echarts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      legend: false,
      categories: categories,
      subCategories: subCategories,
      subCategoriesColor: 'rgba(0, 0, 0, .3)',
      series: [{
        data: series.data,
        format: function (val) {
          return val;
        },
        setColor: [
          { start: 'rgb(255, 0, 255)', end: 'rgba(255, 0, 255, .3)' },
          { start: 'rgb(255, 0, 255)', end: 'rgba(255, 0, 255, .3)' },
          { start: 'rgb(255, 0, 255)', end: 'rgba(255, 0, 255, .3)' },
          { start: 'rgb(255, 0, 255)', end: 'rgba(255, 0, 255, .3)' },
          { start: 'rgb(255, 0, 255)', end: 'rgba(255, 0, 255, .3)' },
        ],
        isGradation: true,
      }],
      yAxis: {
        format: function (val) {
          return val;
        },
        min: 0
      },
      xAxis: {
        disableGrid: true,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 35
        }
      },
      width: windowWidth,
      height: 200,
    });
  },
  // touchHandler: function (e) {
  //   var index = columnChart.getCurrentDataIndex(e);
  //   columnChart.updateData({
  //     series: [{
  //       name: '成交量',
  //       data: chartData.main.data,
  //       setColor: ['rgba(255, 0, 255, .8)', 'rgba(0, 0, 255, .8)', 'rgba(0, 255, 255, .8)', 'rgba(0, 255, 255, .8)', 'rgba(0, 255, 255, .8)']
  //     }],
  //   });
  // },
})