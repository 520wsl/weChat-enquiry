// pages/enquiry/enquiryOrderInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    list: [],
    info: {
      totalAmount: '',
      phone: "",
      buyer_name: "",
      orderId: '',
      orderType: 0,
      buyerLoginId: ''
    },
    msgStr: '数据加载中，请稍后。。。',
    params: {
      pageNum: 1,
      pageSize: 6,
      timeStatus: 1,
      orderId: 77
    },
    count: 0, //默认 list总数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let orderId = options.orderId || '';
    this.setData({
      'params.orderId': orderId
    })
    this.getEnquiryTotal();
    this.getList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // console.log('触底')
    if (this.data.list.length < this.data.count) {
      this.data.params.pageNum++;
      this.data.isClear = true;
      this.getList(() => {
        setTimeout(() => {
          this.setShowFooter();
        }, 100);
      });
    }

    if (!this.data.isshowFooter) {
      this.setShowFooter();
    }
  },
  setShowFooter() {
    this.setData({
      isshowFooter: true
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 调启微信电话接口
  callPhone: function(res) {
    if (!this.data.info.phone || this.data.info.phone.length <= 0) {
      return
    }
    wx.makePhoneCall({
      phoneNumber: this.data.info.phone
    })
  },
  jumInfo: function() {
    if (this.data.info.orderId) {
      wx.navigateTo({
        url: '/pages/home/erp/orderInfo/orderInfo?orderId=' + this.data.info.orderId
      })
    }
  },
  getEnquiryTotal() {
    app
      .get('/enquiry/total', {
        orderId: this.data.params.orderId
      })
      .then(res => {
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
              } else if (res.cancel) {}
            }
          })
          return;
        }
        if (res.status != 200) {
          return;
        }
        let info = res.data.list || {};
        this.setData({
          info: info
        })
      })
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
            } else if (res.cancel) {}
          }
        })
        this.setData({
          msgStr: '抱歉!没有找到符合条件的记录'
        })
        return;
      }
      if (res.status != 200) {
        this.resetList();
        this.setData({
          msgStr: '抱歉!没有找到符合条件的记录'
        })
        // console.log(res);
        return;
      }

      let formatData = res.data.list;
      this.data.count = res.data.count;
      if (formatData && formatData.length > 0) {
        formatData.forEach(item => {
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

          let islastYear = app.time.islastYear(time);
          if (islastYear) {
            item.createTime = app.time.formatTime(time, 'YYYY-MM-DD HH:mm');
          } else {
            item.createTime = app.time.formatTime(time, 'MM-DD HH:mm');
          }
        });
        if (!this.data.isClear) {
          this.data.list = [];
        }
        this.data.isClear = false;
        this.data.list.push(...formatData);
        this.setData({
          list: this.data.list,
          isshowFooter: false,
          count: this.data.count,
          msgStr: '抱歉!没有找到符合条件的记录'
        });
        return;
      }
      this.resetList();
    }).catch(res => {
      this.setData({
        msgStr: '抱歉!没有找到符合条件的记录'
      })
      if (typeof cb == 'function') {
        cb();
      }
    });
  },
})