// pages/enquiry/info/info.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    params: {
      enquiryId: '',
      pageNum: 1,
      pageSize: 12,
      count: 0
    },
    // 数据
    // 成交金额
    amount: 0,
    // 跟单状态
    saleStatus: 0,// 0 默认 1 已成交 2 跟单中 3 已流失
    saleStatusName: {
      1: '已成交',
      2: '跟单中',
      3: '已流失'
    },
    saleStatusAmount: {
      1: '成交',
      2: '跟踪',
      3: '流失'
    },
    saleStatusClass: {
      1: 'headerRight1',
      2: 'headerRight2',
      3: 'headerRight3'
    },
    // 买家旺旺
    aliTM: '',
    // 跟单记录
    list: [],
    // 买家类型
    typeName: {
      1: '阿里账户'// 和设计图上有出入
    },
    // 买家意向
    buyerIntentionName: {
      1: '低',
      2: '中',
      3: '高'
    },
    // 有无去同行购买
    peerBuyName: {
      0: '正在跟进',
      1: '有',
      2: '无'
    },
    // 是否加微信
    isWechatName: {
      0: '正在跟进',
      1: '是',
      2: '否'
    },

    // 默认项
    acIndex: 0,
    toggel: true,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求接口
    this.data.params.enquiryId = options.id || 55;
    this.getInfo();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.params.pageNum = 1;
    this.data.list = [];
    this.getInfo(() => {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.list.length < this.data.params.count){
      this.data.params.pageNum++;
      this.getInfo();
    }
  },

  // 获取详情
  getInfo(cb) {
    app.get('/enquiry/listinfo', this.data.params).then(res => {
      if (res.status != 200) {
        console.log(res);
        return;
      }

      let data = res.data;
      // 时间换算
      data.list.forEach(item => {
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
      this.data.list.push(...data.list);
      this.setData({
        amount: data.amount,
        saleStatus: data.saleStatus,
        aliTM: data.aliTM,
        list: this.data.list,
        'params.pageNum': this.data.params.pageNum,
        'params.count': data.count,
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

  // 选中操作
  extendHandle(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      acIndex: index,
      toggel: !this.data.toggel
    });
  }
})