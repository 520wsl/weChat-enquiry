// pages/home/areaEnquiry/areaEnquiry.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,

    params: {
      provinceId: '',
      ranking: '',
      timeType: 1,
      pageNum: 1,
      pageSize: 8,

      timeStatus: 1,
      // moneyStatus: 0,
      // status: 0,
    },

    // 区域统计
    areaData: null,
    provinceName: '',
    timeName: '',

    // 列表
    list: [],

    // 分页
    isClear: false,
    count: 0,
    // 是否固定
    isFixed: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.params.provinceId = options.provinceId;
    this.data.params.ranking = options.ranking;
    this.data.params.timeType = options.timeType;

    this.data.provinceName = options.provinceName;
    this.data.timeName = options.timeName;

    if (wx.showLoading) {
      wx.showLoading({ title: '加载中...' });
    }
    this.getAreacount(() => {
      this.getEnquiry();
      if (wx.hideLoading) {
        wx.hideLoading();
      }
    });
  },

  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.timeName + this.data.provinceName + '询盘记录'
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.params.pageNum = 1;
    this.getAreacount(() => {
      this.getEnquiry(() => {
        wx.stopPullDownRefresh();
      });
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.list.length < this.data.count) {
      this.data.params.pageNum++;
      this.data.isClear = true;
      this.getEnquiry();
    }
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
    let scrollTop = width * 255 / 375;
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

  // 筛选
  getScreening(e) {
    this.data.params.pageNum = 1;
    let index = e.detail.acIndex;
    let sort = e.detail.sort;
    let cindex = e.detail.cindex;
    delete this.data.params.timeStatus;
    delete this.data.params.moneyStatus;
    delete this.data.params.status;
    switch (index) {
      case 0:
        if (sort){
          this.data.params.timeStatus = 1;
        }else{
          this.data.params.timeStatus = 2;
        }
        break;
      case 1:
        if (sort) {
          this.data.params.moneyStatus = 1;
        } else {
          this.data.params.moneyStatus = 2;
        }
        break;
      case 2:
        console.log(cindex);
        this.data.params.status = ++cindex;
        break;
    }

    if (wx.showLoading) {
      wx.showLoading({ title: '加载中...' });
    }
    this.getEnquiry(() => {
      if (wx.hideLoading) {
        wx.hideLoading();
      }
    });
  },

  // 区域统计
  getAreacount(cb) {
    app.get('/enquiry/areacount', this.data.params).then((res) => {
      console.log(res);
      if (typeof cb == 'function') {
        cb();
      }

      if (res.status != 200) {
        this.reset();
        return;
      }

      let data = res.data;
      if (data) {
        data.allAmount = this.toFixed(data.allAmount);
        data.followAmount = this.toFixed(data.followAmount);
        data.gmvAmount = this.toFixed(data.gmvAmount);
        data.lossAmount = this.toFixed(data.lossAmount);
        this.setData({
          areaData: data
        });
        return;
      }
      this.reset();
    }).catch((res) => {
      if (typeof cb == 'function') {
        cb();
      }
    });
  },

  // 询盘记录
  getEnquiry(cb) {
    app.get('/enquiry/arealist', this.data.params).then((res) => {
      console.log(res);
      if (typeof cb == 'function') {
        cb();
      }

      // 未登录、超时
      if (res.status == 401) {
        this.resetEnquiry();
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
        this.resetEnquiry();
        return;
      }

      let data = res.data;
      this.data.count = res.data.count;
      if (data && data.list.length > 0) {

        data.list.forEach(item => {
          // 图片替换
          if (item.productImage) {
            item.productImage = item.productImage.replace(/\.[^.]+\.jpg$/i, '.' + app.imgSizeEnq + '.jpg');
          }
          // 时间换算
          let time = item.createTime;
          let yestoday = app.time.isDayType(time, 1);
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

        if (!this.data.isClear) {
          this.data.list = [];
        }
        this.data.isClear = false;
        this.data.list.push(...data.list);
        this.setData({
          list: this.data.list
        });
        return;
      }
      this.resetEnquiry();
    }).catch((res) => {
      if (typeof cb == 'function') {
        cb();
      }
    });
  },

  // 重置
  reset() {
    this.setData({
      areaData: null,
    })
  },

  resetEnquiry() {
    this.setData({
      list: []
    })
  },

  toFixed(v) {
    if(v == '' || v == null || v == undefined){
      return v;
    }
    return v.toFixed(2);
  },
})