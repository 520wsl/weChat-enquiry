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
    }
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
      // 设置时间
      this.setData({
        enquiryTime: time,
        active: -1,
      });

      this.getList();
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  // 选择时间
  getTime(e) {
    let time = e.detail.time;
    this.data.params.startTime = time.startTime;
    this.data.params.endTime = time.endTime;
    // 重置时间
    app.enquiryTime = null;
    this.setData({
      enquiryTime: app.enquiryTime,
    });

    this.getList();
  },

  // 获取列表
  getList() {
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
    // return;
    app.get('/enquiry/list', this.data.params).then(res => {
      let formatData = res.data;
      formatData.forEach(item => {
        var time = item.gmtCreate;
        var yestoday = app.time.isDayType(time, 1);
        var today = app.time.isDayType(time, 2);
        if (yestoday) {
          item.gmtCreate = '昨天' + app.time.formatTime(time, ' HH:mm');
          return;
        }
        if (today) {
          item.gmtCreate = '今天' + app.time.formatTime(time, ' HH:mm');
          return;
        }
        item.gmtCreate = app.time.formatTime(time, 'MM-DD HH:mm');
      });
      this.setData({
        list: formatData,
      });
    }).catch(res => {
      console.log(res);
      console.log('11111')
    });
  },
})