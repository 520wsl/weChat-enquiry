// pages/enquiry/enquiry.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    list: [],
    enquiryTime: null,
    active: 0,

    params: {
      endTime: app.time.getTimeLimit(-1),
      pageNum: 1,
      pageSize: 10,
      startTime: app.time.getTimeLimit(1, 'weeks'),
    },

    count: 0,//默认 list总数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
  },
  onShow: function () {
    // 初始化
    console.log('onShow');
    app.isBindPhoneOrBindCustome()
    // 更新时间
    if (app.enquiryTime) {
      let time = app.enquiryTime;
      this.data.params.startTime = app.time.formatInitTime(time.startTime, 'x');
      this.data.params.endTime = app.time.endTime(time.endTime, 'x');
      this.data.params.pageNum = 1;
      // 设置时间
      this.setData({
        enquiryTime: time,
        active: -1,
      });
      this.data.list = [];
      this.getList();
      return;
    }
    this.data.list = [];
    this.getList();
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
    if (this.data.list.length < this.data.count) {
      this.data.params.pageNum++;
      this.getList();
    }
  },

  // 选择时间
  getTime(e) {
    let time = e.detail.time;
    this.data.params.startTime = time.startTime;
    this.data.params.endTime = time.endTime;
    this.data.params.pageNum = 1;
    // 重置时间
    app.enquiryTime = null;
    this.setData({
      enquiryTime: app.enquiryTime,
    });
    this.data.list = [];
    this.getList();
  },

  // 获取列表
  getList(cb) {
    app.get('/enquiry/list', this.data.params).then(res => {
      if (res.status != 200) {
        // app.utils.showModel('错误提示', res.msg);
        console.log(res);
        return;
      }
      
      let formatData = res.data.list;
      this.data.count = res.data.count;
      formatData.forEach(item => {
        // 电话换算
        // if(item.phone){
        //   item.phone = item.phone.replace(/^(\d{3})\d{4}(\d+)$/, '$1****$2');
        // }
      // 时间换算
        let time = item.gmtModified;
        let yestoday = app.time.isDayType(time, 1);
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
      if (typeof cb == 'function') {
        cb();
      }
    });
  },
})