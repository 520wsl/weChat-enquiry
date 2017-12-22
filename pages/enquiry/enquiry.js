// pages/enquiry/enquiry.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    enquiryTime: null,
    active: 0,

    params: {
      endTime: '',
      pageNum: 1,
      pageSize: 10,
      startTime: '',
      // status: null  //			成交状态：null全部，1：成交，2：跟进，3：流失，4：总价
    },

    isMore: true,//默认 加载
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
  },

  onShow: function () {
    if (app.enquiryTime) {
      let time = app.enquiryTime;
      this.data.params.startTime = app.time.formatInitTime(time.startTime, 'x');
      this.data.params.endTime = app.time.formatInitTime(time.endTime, 'x');
      this.data.params.pageNum = 1;
      // 设置时间
      this.setData({
        enquiryTime: time,
        active: -1,
      });
      this.data.list = [];
      this.getList();
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // this.data.params.startTime = app.time.getTimeLimit(1, 'weeks');
    // this.data.params.endTime = app.time.getTimeLimit();
    this.data.params.pageNum = 1;
    this.data.list = [];
    this.getList(() => {
      wx.stopPullDownRefresh();

      // app.enquiryTime = null;
      // this.setData({
      //   active: 0,
      //   enquiryTime: app.enquiryTime,
      // })
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底')
    // if (this.data.list.length % this.data.params.pageSize == 0){
    if (this.data.isMore) {
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
    // var formatData = [
    //   {
    //     aliTM: 'aliTM',
    //     buyerId: 'buyerId',
    //     gmtCreate: 1513872000000,
    //     phone: 'phone',
    //   },
    //   {
    //     aliTM: 'aliTM',
    //     buyerId: 'buyerId',
    //     gmtCreate: 1513785600000,
    //     phone: 'phone',
    //   },
    //   {
    //     aliTM: 'aliTM',
    //     buyerId: 'buyerId',
    //     gmtCreate: 1513267200000,
    //     phone: 'phone',
    //   },
    //   {
    //     aliTM: 'aliTM',
    //     buyerId: 'buyerId',
    //     gmtCreate: 1513612800000,
    //     phone: 'phone',
    //   },
    //   {
    //     aliTM: 'aliTM',
    //     buyerId: 'buyerId',
    //     gmtCreate: 1513612800000,
    //     phone: 'phone',
    //   },
    //   {
    //     aliTM: 'aliTM',
    //     buyerId: 'buyerId',
    //     gmtCreate: 1513612800000,
    //     phone: 'phone',
    //   },
    // ];
    // formatData.forEach(item => {
    //   var time = item.gmtCreate;
    //   var yestoday = app.time.isDayType(time, 1);
    //   var today = app.time.isDayType(time, 2);
    //   if (yestoday) {
    //     item.gmtCreate = '昨天' + app.time.formatTime(time, ' HH:mm');
    //     return;
    //   }
    //   if (today) {
    //     item.gmtCreate = '今天' + app.time.formatTime(time, ' HH:mm');
    //     return;
    //   }
    //   item.gmtCreate = app.time.formatTime(time, 'MM-DD HH:mm');
    // });
    // this.setData({
    //   list: formatData
    // });
    // if (typeof cb == 'function') {
    //   cb();
    // }
    // return;
    app.get('/enquiry/list', this.data.params).then(res => {
      if (res.status != 200) {
        app.utils.showModel('错误提示', res.msg);
        return;
      }
      
      let formatData = res.data.list;
      if (formatData.length == 0){
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