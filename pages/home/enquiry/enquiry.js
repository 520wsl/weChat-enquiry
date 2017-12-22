// pages/enquiry/enquiry.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // banner
    imgUrls: [
      'http://1.img.dianjiangla.com/enquiryAssets/banner-2.png'
    ],
    indicatorDots: false,

    list: [],

    params: {
      pageNum: 1,
      pageSize: 10,
      countType: '',//1:总价值；2:成交价值；3:跟单价值；4:流失价值
      timeType: '',//	1:7天；2:30天；3:180天；4:365天
    },
    label: '',
    isMore: true,//默认 加载
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    this.data.params.countType = options.countType;
    this.data.params.timeType = options.timeType;
    this.data.label = options.label;
    this.getList();
  },

  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.label + '询盘记录'
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.params.pageNum = 1;
    this.data.list = [];
    this.getList(() => {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底')
    if (this.data.isMore) {
      this.data.params.pageNum++;
      this.getList();
    }
  },

  // 获取列表
  getList(cb) {
    app.get('/enquiry/list', this.data.params).then(res => {
      if(res.status != 200){
        app.utils.showModel('错误提示', res.msg);
        return ;
      }
      let formatData = res.data.list;
      if (formatData.length == 0) {
        this.data.isMore = false;
      }
      formatData.forEach(item => {
        var time = item.gmtModified;
        var yestoday = app.time.isDayType(time, 1);
        var today = app.time.isDayType(time, 2);
        if (yestoday) {
          item.gmtModified = '昨天' + app.time.formatTime(time, ' HH:mm');
          return;
        }
        if (today) {
          item.gmtModified = '今天' + app.time.formatTime(time, ' HH:mm');
          return;
        }
        item.gmtModified = app.time.formatTime(time, 'MM-DD HH:mm');
      });
      this.data.list.push(...formatData);
      this.setData({
        list: this.data.list,
      });
      if (typeof cb == 'function') {
        cb();
      }
    }).catch(res => {
      console.log(res);
    });
  },
})