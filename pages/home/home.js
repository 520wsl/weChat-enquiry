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

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    // banner
    imgUrls: [
      app.CDN + 'banner-1.png'
    ],
    indicatorDots: false,      //是否显示面板指示点

    // 询盘
    enquire: null,
    images: {
      totalValue: app.CDN + 'enquiry_1.png',
      tranValue: app.CDN + 'enquiry_2.png',
      enquireValue: app.CDN + 'enquiry_3.png',
      lossValue: app.CDN + 'enquiry_4.png',
    },
    enquireName: {
      totalValue: '总价值',
      tranValue: '成交价值',
      enquireValue: '跟单价值',
      lossValue: '流失价值',
    },
    enquiryType: {
      totalValue: 1,
      tranValue: 2,
      enquireValue: 3,
      lossValue: 4,
    },
    enquireTime: {},
    // 客户地区
    customerarea: [],
    customerareaTime: {},
    // 公司
    company: '杭州长风五金机械制造有限公司',//app.globalData.customeInfo.companyName,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow() {
    // 初始化操作
    console.log('show');
    app.isBindPhoneOrBindCustome();
    this.getEnquire(this.data.enquireTime);
    this.getCustomArea(this.data.customerareaTime);
  },

  // 客户地区
  getCustomArea({ type = 1 }) {
    app.get('/enquiry/customerarea', {
      type: type,
    }).then(res => {
      if (res.status != 200) {
        // app.utils.showModel('错误提示', res.msg);
        return;
      }

      let formatData = res.data;
      formatData.forEach(item => {
        item.sumGmvAmount = item.sumGmvAmount.toFixed(2);
      });
      this.setData({
        customerarea: formatData
      });
      this.getEcharts();
    }).catch(res => {
      console.log(res);
    });
  },
  // 询盘统计
  getEnquire({ type = 1 }) {
    app.get('/enquiry/statistics', {
      type: type,
    }).then(res => {
      if (res.status != 200) {
        // app.utils.showModel('错误提示', res.msg);
        return;
      }

      let formatData = res.data;
      for (let i in formatData) {
        formatData[i] = formatData[i].toFixed(2);
      }
      this.setData({
        enquire: formatData,
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
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    let categories = this.data.customerarea.map(item => {
      return item.provinceName;
    });
    chartData.seriesData = this.data.customerarea.map(item => {
      return item.sumGmvAmount;
    });
    let subCategories = this.data.customerarea.map(item => {
      return item.num + '人';
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
        gridColor: 'rgba(204, 204, 204, .25)',
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
      if (i == index) {
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
  getTimeEnquiry(e) {
    this.data.enquireTime = e.detail.time;
    this.getEnquire(e.detail.time);
  },
  // 获取时间-地区
  getTimeErea(e) {
    this.data.customerareaTime = e.detail.time;
    this.getCustomArea(e.detail.time);
  }
})