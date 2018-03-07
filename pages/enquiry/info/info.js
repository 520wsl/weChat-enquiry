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
      3: '已流失',
      4: '已流失'
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
      0: '',
      1: '淘卖',
      2: '经销商',
      3: '微商',
      4: '外贸',
      5: '其他',
    },
    // 买家意向
    buyerIntentionName: {
      1: '低',
      2: '中',
      3: '高'
    },
    // 有无去同行购买
    peerBuyName: {
      0: '',
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
    toggle: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求接口
    this.data.params.enquiryId = options.id;
    this.getInfo();
  },
  onShareAppMessage: function () {
    return {
      title: '四喜E伙伴',
      path: '/pages/enquiry/info/info?id=' + this.data.params.enquiryId
    }
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
    if (this.data.list.length < this.data.params.count) {
      this.data.params.pageNum++;
      this.getInfo();
    }
  },
  // 调启微信电话接口
  callPhone: function (res) {
    if (!res.currentTarget.dataset.phone || res.currentTarget.dataset.phone.length <= 0 || res.currentTarget.dataset.phone == '无') {
      return
    }
    wx.makePhoneCall({
      phoneNumber: res.currentTarget.dataset.phone
    })
  },

  // 获取详情
  getInfo(cb) {
    app.get('/enquiry/listinfo', this.data.params).then(res => {
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
        // console.log(res);
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
        item.gmtCreate = app.time.formatTime(time, 'YYYY-MM-DD HH:mm');
      });

      let listLength = data.list.length;

      for (let i = 0; i < listLength; i++) {
        let add = i + 1;
        if (add < listLength) {
          let obj = deepDiffMapper.map(data.list[i], data.list[add]);
          data.list[i]['buyerIntentionType'] = isUpdated(obj['buyerIntention']['type']);
          data.list[i]['buyerTypeType'] = isUpdated(obj['buyerType']['type']);
          data.list[i]['cityIdType'] = isUpdated(obj['cityId']['type']);
          data.list[i]['cityNameType'] = isUpdated(obj['cityName']['type']);
          data.list[i]['gmtCreateType'] = isUpdated(obj['gmtCreate']['type']);
          data.list[i]['isWechatType'] = isUpdated(obj['isWechat']['type']);
          data.list[i]['noDealReasonType'] = isUpdated(obj['noDealReason']['type']);
          data.list[i]['numType'] = isUpdated(obj['num']['type']);
          data.list[i]['peerBuyType'] = isUpdated(obj['peerBuy']['type']);
          data.list[i]['peerNameType'] = isUpdated(obj['peerName']['type']);
          data.list[i]['peerPriceType'] = isUpdated(obj['peerPrice']['type']);
          data.list[i]['phoneType'] = isUpdated(obj['phone']['type']);
          data.list[i]['positionType'] = isUpdated(obj['position']['type']);
          data.list[i]['priceType'] = isUpdated(obj['price']['type']);
          data.list[i]['productNameType'] = isUpdated(obj['productName']['type']);
          data.list[i]['remarkType'] = isUpdated(obj['remark']['type']);
          data.list[i]['typeType'] = isUpdated(obj['type']['type']);

        } else {
          data.list[i]['buyerIntentionType'] = 'unchanged';
          data.list[i]['buyerTypeType'] = 'unchanged';
          data.list[i]['cityIdType'] = 'unchanged';
          data.list[i]['cityNameType'] = 'unchanged';
          data.list[i]['gmtCreateType'] = 'unchanged';
          data.list[i]['isWechatType'] = 'unchanged';
          data.list[i]['noDealReasonType'] = 'unchanged';
          data.list[i]['numType'] = 'unchanged';
          data.list[i]['peerBuyType'] = 'unchanged';
          data.list[i]['peerNameType'] = 'unchanged';
          data.list[i]['peerPriceType'] = 'unchanged';
          data.list[i]['phoneType'] = 'unchanged';
          data.list[i]['positionType'] = 'unchanged';
          data.list[i]['priceType'] = 'unchanged';
          data.list[i]['productNameType'] = 'unchanged';
          data.list[i]['remarkType'] = 'unchanged';
          data.list[i]['typeType'] = 'unchanged';
        }

      }
      this.data.list.push(...data.list);
      this.setData({
        amount: data.amount,
        saleStatus: data.saleStatus,
        aliTM: data.aliTM,
        list: this.data.list,
        'params.pageNum': this.data.params.pageNum,
        'params.count': data.count,
      });

      this.data.list.forEach((item, index) => {
        if (index == 0) {
          this.data.toggle[index] = { isDB: true };
          return;
        }
        this.data.toggle[index] = { isDB: false };
      });
      this.setData({
        toggle: this.data.toggle
      })
    }).catch(res => {
      // console.log(res);
      if (typeof cb == 'function') {
        cb();
      }
    });
  },

  // 选中操作
  extendHandle(e) {

    let index = e.currentTarget.dataset.index;

    this.data.toggle.forEach((item, i) => {
      if (index == i) {
        this.data.toggle[i].isDB = !this.data.toggle[i].isDB;
        return;
      }
      this.data.toggle[i].isDB = false;
    })
    this.setData({
      acIndex: index,
      toggle: this.data.toggle
    });
  }
})


var deepDiffMapper = function () {
  return {
    VALUE_CREATED: 'created',
    VALUE_UPDATED: 'updated',
    VALUE_DELETED: 'deleted',
    VALUE_UNCHANGED: 'unchanged',
    map: function (obj1, obj2) {
      if (this.isFunction(obj1) || this.isFunction(obj2)) {
        throw 'Invalid argument. Function given, object expected.';
      }
      if (this.isValue(obj1) || this.isValue(obj2)) {
        return {
          type: this.compareValues(obj1, obj2),
          data: (obj1 === undefined) ? obj2 : obj1
        };
      }

      var diff = {};
      for (var key in obj1) {
        if (this.isFunction(obj1[key])) {
          continue;
        }

        var value2 = undefined;
        if ('undefined' != typeof (obj2[key])) {
          value2 = obj2[key];
        }

        diff[key] = this.map(obj1[key], value2);
      }
      for (var key in obj2) {
        if (this.isFunction(obj2[key]) || ('undefined' != typeof (diff[key]))) {
          continue;
        }

        diff[key] = this.map(undefined, obj2[key]);
      }

      return diff;

    },
    compareValues: function (value1, value2) {
      if (value1 === value2) {
        return this.VALUE_UNCHANGED;
      }
      if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
        return this.VALUE_UNCHANGED;
      }
      if ('undefined' == typeof (value1)) {
        return this.VALUE_CREATED;
      }
      if ('undefined' == typeof (value2)) {
        return this.VALUE_DELETED;
      }

      return this.VALUE_UPDATED;
    },
    isFunction: function (obj) {
      return {}.toString.apply(obj) === '[object Function]';
    },
    isArray: function (obj) {
      return {}.toString.apply(obj) === '[object Array]';
    },
    isDate: function (obj) {
      return {}.toString.apply(obj) === '[object Date]';
    },
    isObject: function (obj) {
      return {}.toString.apply(obj) === '[object Object]';
    },
    isValue: function (obj) {
      return !this.isObject(obj) && !this.isArray(obj);
    }
  }
}();
var isUpdated = function (type) {
  if (type == 'updated' || type == 'deleted'|| type == 'created'){
    return 'updated'
  }
  return 'unchanged';
}