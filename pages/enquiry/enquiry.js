// pages/enquiry/enquiry.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    list: [],

    params: {
      endTime: app.time.getTimeLimit(-1),
      pageNum: 1,
      pageSize: 6,
      startTime: app.time.getTimeLimit(1, 'weeks'),
      timeStatus: 1
    },

    count: 0,//默认 list总数
    isClear: false,
    // 是否固定
    isFixed: false,

    // 区域统计
    areaData: null,
    // 时间
    timeSearch: {
      startTime: app.time.formatSubtractTime(1, 'weeks'),
      endTime: app.time.formatSubtractTime(0),
    },
    defaultTime: {
      // start: app.time.formatSubtractTime(1, 'years'),
      end: app.time.formatSubtractTime(0),
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onLoad')
  },
  onShow: function () {
    // 初始化
    this.data.params.pageNum = 1;
    this.init();
  },
  onHide() {
    this.setData({
      list: []
    })
  },
  onShareAppMessage: function () {
    return {
      title: '四喜E伙伴',
      path: '/pages/enquiry/enquiry'
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.params.pageNum = 1;
    this.getAreacount(() => {
      this.getList(() => {
        wx.stopPullDownRefresh();
      });
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log('触底')
    if (this.data.list.length < this.data.count) {
      this.data.params.pageNum++;
      this.data.isClear = true;
      this.getList();
    }
  },

  // 页面滚动
  onPageScroll(Object) {
    let width = 375, height = 603, oHeight = 1488;
    try {
      let res = wx.getSystemInfoSync();
      width = res.windowWidth;
      height = res.windowHeight;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    if (wx.createSelectorQuery) {
      wx.createSelectorQuery().select('.enquiry').boundingClientRect((rect) => {
        oHeight = rect.height;
        rolling(this);
      }).exec()
    } else {
      rolling(this);
    }

    function rolling(that){
      let scrollTop = width * 167 / 375;
      if (Object.scrollTop >= scrollTop) {
        if (!that.data.isFixed && ((oHeight - height) > scrollTop)) {
          that.setData({
            isFixed: true
          });
        }
      } else {
        if (that.data.isFixed) {
          that.setData({
            isFixed: false
          });
        }
      }
    }
  },

  // 获取列表
  getList(cb) {
    app.get('/enquiry/list', this.data.params).then(res => {
      if (typeof cb == 'function') {
        cb();
      }
      if (res.status == 401) {
        this.resetList();
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
        this.resetList();
        // console.log(res);
        return;
      }

      let formatData = res.data.list;
      this.data.count = res.data.count;
      if (formatData && formatData.length > 0){
        formatData.forEach(item => {
          // 图片替换
          if (item.productImage){
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
        this.data.list.push(...formatData);
        this.setData({
          list: this.data.list,
        });
        return;
      }
      this.resetList();
    }).catch(res => {
      // console.log(res);
      if (typeof cb == 'function') {
        cb();
      }
    });
  },

  getScreening(e){
    console.log(e.detail);
    this.data.params.pageNum = 1;
    let index = e.detail.acIndex;
    let sort = e.detail.sort;
    let cindex = e.detail.cindex;
    delete this.data.params.timeStatus;
    delete this.data.params.sumStatus;
    delete this.data.params.status;
    switch (index) {
      case 0:
        if (sort) {
          this.data.params.timeStatus = 1;
        } else {
          this.data.params.timeStatus = 2;
        }
        break;
      case 1:
        if (sort) {
          this.data.params.sumStatus = 1;
        } else {
          this.data.params.sumStatus = 2;
        }
        break;
      case 2:
        if(cindex != 3){
          this.data.params.status = ++cindex;
        }
        break;
    }

    if (wx.showLoading) {
      wx.showLoading({ title: '加载中...' });
    }
    this.getList(() => {
      if (wx.hideLoading) {
        wx.hideLoading();
      }
    });
  },

  // 区域统计
  getAreacount(cb) {
    app.get('/enquiry/analysecount', this.data.params).then((res) => {
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

  reset(){
    this.setData({
      areaData: null
    })
  },

  resetList(){
    this.setData({
      list: []
    })
  },

  toFixed(v) {
    if (v == '' || v == null || v == undefined) {
      return v;
    }
    return v.toFixed(2);
  },

  // 开始时间
  startTimeChange(e) {
    if (app.time.formatInitTime(e.detail.value, 'x') >= this.data.params.endTime) {
      wx.showModal({
        title: '提示',
        content: '开始时间不可以大于结束时间！',
        showCancel: false
      })
      this.setData({
        'timeSearch.startTime': app.time.formatTime(Number(this.data.params.startTime), 'YYYY-MM-DD')
      })
      return;
    }

    this.setData({
      'timeSearch.startTime': e.detail.value
    })
    
    this.data.params.startTime = app.time.formatInitTime(e.detail.value, 'x');
    this.init();
  },

  // 结束时间
  endTimeChange(e) {
    if (this.data.params.startTime >= app.time.endTime(e.detail.value, 'x')) {
      wx.showModal({
        title: '提示',
        content: '开始时间不可以大于结束时间！',
        showCancel: false
      })
      this.setData({
        'timeSearch.endTime': app.time.formatSubtractTime(1, 'days', Number(this.data.params.endTime), 'YYYY-MM-DD')
      })
      return false;
    }

    this.setData({
      'timeSearch.endTime': e.detail.value
    })

    this.data.params.endTime = app.time.endTime(e.detail.value, 'x');
    this.init();
  },

  // 初始化
  init(){
    if (wx.showLoading) {
      wx.showLoading({ title: '加载中...' });
    }
    this.getAreacount(() => {
      this.getList();
      if (wx.hideLoading) {
        wx.hideLoading();
      }
    });
  }
})