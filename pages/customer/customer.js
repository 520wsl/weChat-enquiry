// pages/customer/customer.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    isShowSelect: false,
    params: {
      field: "", // 姓名/电话
      startTime: app.time.getTimeLimit(1, 'months'), // 合作日期开始时间
      endTime: app.time.getTimeLimit(-1), // 合作日期结束时间
      level: -1, // 0:普通会员；1:高级会员；2:vip会员；3:至尊会员
      type: -1, // 0其它；1淘宝采购商；2经销商；3微商；4外贸
      source: -1, // 0:默认；1线上；2线下
      pageNum: 1,
      pageSize: 16,
      tagId: "", // 标签
      companyId: ""
    },
    paramsCache: {
      startTime: app.time.getTimeLimit(1, 'months'), // 合作日期开始时间
      endTime: app.time.getTimeLimit(-1), // 合作日期结束时间
      level: -1, // 0:普通会员；1:高级会员；2:vip会员；3:至尊会员
      type: -1, // 0其它；1淘宝采购商；2经销商；3微商；4外贸
      source: -1, // 0:默认；1线上；2线下
    },
    // 0:普通会员；1:高级会员；2:vip会员；3:至尊会员
    customerLevelLabel: ['普通会员', '高级会员', 'vip会员', '至尊会员'],
    // 0其它；1淘宝采购商；2经销商；3微商；4外贸
    customerTypeLabel: ['其他', '淘宝采购商', '经销商', '微商', '外贸'],
    // 0:默认；1线上；2线下
    source: [{
      key: -1,
      lable: '全部'
    }, {
      key: 1,
      lable: '线上'
    }, {
      key: 2,
      lable: '线下'
    }],
    // 0:普通会员；1:高级会员；2:vip会员；3:至尊会员
    customerLevel: [{
      key: -1,
      lable: '全部'
    }, {
      key: 3,
      lable: '至尊'
    }, {
      key: 2,
      lable: 'vip'
    }, {
      key: 1,
      lable: '高级'
    }, {
      key: 0,
      lable: '普通'
    }],
    // 0其它；1淘宝采购商；2经销商；3微商；4外贸
    customerType: [{
      key: -1,
      lable: '全部'
    }, {
      key: 0,
      lable: '其他'
    }, {
      key: 1,
      lable: '淘宝采购商'
    }, {
      key: 2,
      lable: '经销商'
    }, {
      key: 3,
      lable: '微商'
    }, {
      key: 4,
      lable: '外贸'
    }],
    // 时间
    timeSearch: {
      startTime: app.time.formatSubtractTime(1, 'months'),
      endTime: app.time.formatSubtractTime(0),
    },
    defaultTime: {
      start: app.time.formatSubtractTime(10, 'years'),
      end: app.time.formatSubtractTime(0),
    },
    list: [],
    msgStr: '',
    isDisable: false,
    isshowFooter: false
  },
  onLoad: function(e) {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.initList()
  },
  selectClose() {
    this.setData({
      isShowSelect: false,
    })
  },
  selectList() {
    this.setData({
      'params.startTime': this.data.paramsCache.startTime,
      'params.endTime': this.data.paramsCache.endTime,
      'params.level': this.data.paramsCache.level,
      'params.type': this.data.paramsCache.type,
      'params.source': this.data.paramsCache.source,
      isShowSelect: false,
    })
    this.initList();
  },
  initList() {
    this.setData({
      list: [],
      'params.pageNum': 1
    })
    this.setData({
      msgStr: '数据加载中，请稍后。。。'
    })
    this.getList();
  },
  setCustomerType(e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      'paramsCache.type': type
    })
  },
  setCustomerLevel(e) {
    let level = e.currentTarget.dataset.level
    this.setData({
      'paramsCache.level': level
    })
  },
  setCustomerSource(e) {
    let source = e.currentTarget.dataset.source
    this.setData({
      'paramsCache.source': source
    })
  },
  // 开始时间
  startTimeChange(e) {
    console.log('startTimeChange', e);
    if (this.data.paramsCache.endTime && app.time.formatInitTime(e.detail.value, 'x') >= this.data.paramsCache.endTime) {
      wx.showModal({
        title: '提示',
        content: '开始时间不可以大于结束时间！',
        showCancel: false
      })
      this.setData({
        'timeSearch.startTime': app.time.formatTime(Number(this.data.paramsCache.startTime), 'YYYY-MM-DD')
      })
      return;
    }
    this.setData({
      'timeSearch.startTime': e.detail.value,
      timeActive: 4
    })
    this.data.paramsCache.startTime = app.time.formatInitTime(e.detail.value, 'x');
  },
  // 结束时间
  endTimeChange(e) {
    if (this.data.paramsCache.startTime && this.data.paramsCache.startTime >= app.time.endTime(e.detail.value, 'x')) {
      wx.showModal({
        title: '提示',
        content: '开始时间不可以大于结束时间！',
        showCancel: false
      })
      this.setData({
        'timeSearch.endTime': app.time.formatSubtractTime(1, 'days', Number(this.data.paramsCache.endTime), 'YYYY-MM-DD')
      })
      return false;
    }
    this.setData({
      'timeSearch.endTime': e.detail.value,
      timeActive: 4
    })
    this.data.paramsCache.endTime = app.time.endTime(e.detail.value, 'x');
  },
  setLevel(e) {
    let level = e.currentTarget.dataset.level
    this.setData({
      'paramsCache.level': level
    })
    this.selectList()
  },
  toCustomerDetail: function() {
    wx.navigateTo({
      url: "/pages/customer/info/info"
    })
  },
  setIsShowSelect() {
    this.setData({
      isShowSelect: !this.data.isShowSelect
    })
  },
  toSearchWord() {
    wx.navigateTo({
      url: '/pages/customer/searchWord',
    })
  },
  getList(type) {
    wx.stopPullDownRefresh()
    app
      .post('/crm/customer/list', { ...this.data.params
      })
      .then(res => {
        if (res.status == 401) {
          wx.showModal({
            title: '提示',
            content: '登录超时或未登录，请重新登录',
            success: res => {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/personal/personal'
                });
                return;
              }
            }
          });
          this.setData({
            msgStr: '抱歉!没有找到符合条件的记录'
          })
          return;
        }
        if (res.status !== 200) {
          this.setData({
            msgStr: '抱歉!没有找到符合条件的记录'
          })
          app.utils.showModel('获取客户列表数据', res.msg);
          return;
        }
        let list = []
        let old = this.data.list;
        if (type == 'push') {
          old.push(...res.data.list)
          list = old
        } else {
          list = res.data && res.data.list || [];
        }

        var index = 0
        list = list.map(function(i) {
          i.index = index
          if (index < 4) {
            index = index + 1
          } else {
            index = 0
          }
          return i
        })

        let isDisable = true;
        this.setData({
          list,
          count: res.data.count,
          isshowFooter: false,
          msgStr: '抱歉!没有找到符合条件的记录',
          isDisable
        })

      })
      .catch(res => {
        this.setData({
          msgStr: '抱歉!没有找到符合条件的记录'
        })
        console.log('获取消息列表数据', res)
      })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      'params.pageNum': 1,
      list: []
    })
    this.getList('down');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('wxlog-触底')
    if (this.data.list.length < this.data.count) {
      this.data.params.pageNum++;
      this.getList('push');
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
})