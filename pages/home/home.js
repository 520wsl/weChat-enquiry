// pages/home/home.js
import echarts from "../../utils/resources/wxcharts.js";

var columnChart = null;
var chartData = {
  setColor: [
    { start: '#FF731D', end: '#FEA449' },
    { start: '#7B73FE', end: '#55ABF6' },
    { start: '#7B73FE', end: '#55ABF6' },
    { start: '#7B73FE', end: '#55ABF6' },
    { start: '#7B73FE', end: '#55ABF6' },
  ]
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
      'http://1.img.dianjiangla.com/enquiryAssets/banner-1.png'
    ],
    indicatorDots: false,      //是否显示面板指示点

    // 询盘
    enquire: {},
    images: {
      totalValue: 'http://1.img.dianjiangla.com/enquiryAssets/enquiry_1.png',
      tranValue: 'http://1.img.dianjiangla.com/enquiryAssets/enquiry_2.png',
      enquireValue: 'http://1.img.dianjiangla.com/enquiryAssets/enquiry_3.png',
      lossValue: 'http://1.img.dianjiangla.com/enquiryAssets/enquiry_4.png',
    },
    enquireName: {
      totalValue: '总价值',
      tranValue: '成交价值',
      enquireValue: '跟单价值',
      lossValue: '流失价值',
    },
    enquireTime: {},
    // 客户地区
    customerarea: [],
    customerareaTime: {},
    // 公司
    company: app.title,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 客户地区
  getCustomArea({ type = 0 }) {
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
      type: type,
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
  getEnquire({ type = 0}) {
    this.setData({
      enquire: {
        // 总价值
        totalValue: '2132001',
        // 成交价值
        tranValue: '2132002',
        // 跟单价值
        enquireValue: '2132003',
        // 丢失价值
        lossValue: '2132004',
      },
      enquireTime: this.data.enquireTime
    });
    return;
    app.get('/enquire/statistics', {
      type: type,
    }).then(res => {
      this.setData({
        enquire: res.data,
        enquireTime: this.data.enquireTime
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
    let categories = this.data.customerarea.map(item => {
      return item.province;
    });
    chartData.seriesData = this.data.customerarea.map(item => {
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
        data: chartData.seriesData,
        format: function (val) {
          return val;
        },
        setColor: chartData.setColor,
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
      height: windowWidth * 223 / 375,
    });
  },
  touchHandler: function (e) {
    var index = columnChart.getCurrentDataIndex(e);
    let color = chartData.setColor.map((item, i) => {
      item.start = '#7B73FE';
      item.end = '#55ABF6';
      if(i == index){
        item.start = '#FF731D';
        item.end = '#FEA449';
      }
      return item;
    });
    columnChart.updateData({
      series: [{
        data: chartData.seriesData,
        setColor: color,
        isGradation: true,
      }],
    });
  },
  // 获取时间-询盘
  getTimeEnquiry(e){
    this.data.enquireTime = e.detail.time;
    this.getEnquire(e.detail.time);
  },
  // 获取时间-地区
  getTimeErea(e){
    this.data.customerareaTime = e.detail.time;
    this.getCustomArea(e.detail.time);
  }
})