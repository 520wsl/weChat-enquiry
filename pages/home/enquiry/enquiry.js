// pages/enquiry/enquiry.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    // banner
    imgUrls: [
        app.CDN +'banner-2.png?id=20180203'
    ],
    indicatorDots: false,

    list: [],

    params: {
      pageNum: 1,
      pageSize: 7,
      countType: '',//1:总价值；2:成交价值；3:跟单价值；4:流失价值
      timeType: '',//	1:7天；2:30天；3:180天；4:365天
    },
    label: '',
    count: 0,//默认 list总数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onLoad');
    this.data.params.countType = options.countType;
    this.data.params.timeType = options.timeType;
    this.data.label = options.label;
    this.getList();
    this.setData({
      label: this.data.label
    })
  },

  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.label + '询盘记录'
    });
  },
  onShareAppMessage: function () {
    let countType = this.data.params.countType;
    let timeType = this.data.params.timeType;
    let label = this.data.label;
    return {
      title: '四喜E伙伴',
      path: '/pages/home/enquiry/enquiry?countType=' + countType + '&timeType=' + timeType + '&label=' + label
    }
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
    // console.log('触底')
    if (this.data.list.length < this.data.count) {
      this.data.params.pageNum++;
      this.getList();
    }
  },

  // 获取列表
  getList(cb) {
    app.get('/enquiry/statisticslist', this.data.params).then(res => {
      if (typeof cb == 'function') {
        cb();
      }
      if (res.status == 401) {
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
        // app.utils.showModel('错误提示', res.msg);
        // console.log(res);
        return;
      }
      let formatData = res.data.list;
      this.data.count = res.data.count;
      formatData.forEach(item => {
        // 图片替换
        if (item.productImage) {
          item.productImage = item.productImage.replace(/\.[^.]+\.jpg$/i, '.' + app.imgSizeEnq + '.jpg');
        }
        // 时间换算
        var time = item.createTime;
        var yestoday = app.time.isDayType(time, 1);
        var today = app.time.isDayType(time, 2);
        if (yestoday) {
          item.createTime = '昨天' + app.time.formatTime(time, ' HH:mm');
          return;
        }
        if (today) {
          item.createTime = '今天' + app.time.formatTime(time, ' HH:mm');
          return;
        }
        item.createTime = app.time.formatTime(time, 'MM-DD HH:mm');
      });
      this.data.list.push(...formatData);
      this.setData({
        list: this.data.list,
      });
    }).catch(res => {
      // console.log(res);
      if (typeof cb == 'function') {
        cb();
      }
    });
  },
})