/*
 * @Author: Mad Dragon 
 * @E-Mail: 395548460@qq.com 
 * @Date: 2018-05-26 14:15:35 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-05-28 14:35:52
 */
// pages/log/wxlog/wxlog.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    logTypes: app.logTypes,
    isshowFooter: false,
    isDisable: true,
    strings: '',
    isOpen: false,
    msgStr: '数据加载中，请稍后。。。',
    params: {
      type: 0,
      readFlag: 0,
      startTime: app.time.getTimeLimit(1, 'months'),
      endTime: app.time.getTimeLimit(-1),
      pageNum: 1,
      pageSize: 8
    },
    // 时间
    timeSearch: {
      startTime: app.time.formatSubtractTime(1, 'months'),
      endTime: app.time.formatSubtractTime(0),
    },
    defaultTime: {
      start: app.time.formatSubtractTime(10, 'years'),
      end: app.time.formatSubtractTime(0),
    },
    count: 0,
    list: [],
    reads: ['全部', '未读', '已读'],
    // '全部消息通知','最新订单信息提醒','订单通知','活动状态变更通知','假期查询提醒','服务到期提醒','店铺违规通知'
    logTypes: ['全部消息通知', '最新订单信息提醒', '订单通知', '活动状态变更通知', '假期查询提醒', '服务到期提醒', '店铺违规通知']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.setData({
    //   list: [],
    //   'params.pageNum': 1
    // })
    // this.setData({
    //   msgStr: '数据加载中，请稍后。。。'
    // })
    // this.getList();
  },
  setOpen() {
    this.setData({
      isOpen: true
    })
  },
  setHidden() {
    this.setData({
      isOpen: false
    })
  },
  // 开始时间
  startTimeChange(e) {
    console.log('startTimeChange', e);
    if (this.data.params.endTime && app.time.formatInitTime(e.detail.value, 'x') >= this.data.params.endTime) {
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
      'timeSearch.startTime': e.detail.value,
      timeActive: 4
    })

    this.data.params.startTime = app.time.formatInitTime(e.detail.value, 'x');
    this.data.params.pageNum = 1;
    // this.setHidden()
    this.getList();
  },
  // 结束时间
  endTimeChange(e) {
    if (this.data.params.startTime && this.data.params.startTime >= app.time.endTime(e.detail.value, 'x')) {
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
      'timeSearch.endTime': e.detail.value,
      timeActive: 4
    })

    this.data.params.endTime = app.time.endTime(e.detail.value, 'x');
    this.data.params.pageNum = 1;
    // this.setHidden()
    this.getList();
  },

  // 搜索已读未读
  setReadFlag(e) {
    console.log('搜索已读未读', e)
    let readFlag = e.detail.value || 0;
    this.setData({
      'params.readFlag': readFlag
    })
    this.data.params.pageNum = 1;
    // this.setHidden()
    this.getList();
  },
  // 设置消息类型
  setType(e) {
    console.log('设置消息类型', e)
    let logType = e.detail.value || 0;
    this.setData({
      'params.type': logType
    })
    this.data.params.pageNum = 1;
    // this.setHidden()
    this.getList();
  },
  editStatus() {
    if (this.data.isDisable) {
      return;
    }
    app
      .post('/messageuserlog/allread', {
        userLogId: this.data.strings
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
          return;
        }
        if (res.status !== 200) {
          app.utils.showModel('修改消息状态', res.msg);
          return;
        }
        this.setData({
          isDisable: true
        })
        this.getList();
      })
      .catch(res => {
        console.log('修改消息状态', res)
      })
  },
  getList(type) {
    wx.stopPullDownRefresh()
    app
      .get('/messageuserlog/list', this.data.params)
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
          app.utils.showModel('获取消息列表数据', res.msg);
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
        // let noRead = [];
        let isDisable = true;
        list.map(item => {
          item['typeStr'] = this.getArrStr(this.data.logTypes, item.type);
          item['gmtCreateStr'] = this.switchTime(item.gmtCreate);
          if (item['status'] == 1) {
            isDisable = false;
            // noRead.push(item['userLogId'])
          }
        })
        // let strings = noRead.join(",");
        let strings = list[0] && list[0]['userLogId'] || '';
        console.log('messageuserlog', strings, list)
        this.setData({
          list,
          count: res.data.count,
          isshowFooter: false,
          msgStr: '抱歉!没有找到符合条件的记录',
          isDisable,
          strings
        })

      })
      .catch(res => {
        this.setData({
          msgStr: '抱歉!没有找到符合条件的记录'
        })
        console.log('获取消息列表数据', res)
      })
  },
  switchTime(time) {
    let yestoday = app.time.isDayType(time, 1);
    var today = app.time.isDayType(time, 2);
    if (yestoday) {
      return '昨天' + app.time.formatTime(time, ' HH:mm');
    }
    if (today) {
      return '今天' + app.time.formatTime(time, ' HH:mm');
    }

    let islastYear = app.time.islastYear(time);
    if (islastYear) {
      return app.time.formatTime(time, 'YYYY-MM-DD HH:mm');
    } else {
      return app.time.formatTime(time, 'MM-DD HH:mm');
    }
  },
  getArrStr(arr = [], key = "") {
    let str = '';
    if (key == undefined || key == null) {
      return '';
    }
    arr.map(function(e) {
      if (e.key == key) {
        str = e.str;
      }
    });
    return str;
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
    this.setData({
      list: [],
      'params.pageNum': 1
    })
    this.setData({
      msgStr: '数据加载中，请稍后。。。'
    })
    this.getList();

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
    this.setData({
      'params.pageNum': 1,
      list: []
    })
    this.getList('down');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // console.log('wxlog-触底')
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})