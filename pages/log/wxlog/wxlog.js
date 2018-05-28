/*
 * @Author: Mad Dragon 
 * @E-Mail: 395548460@qq.com 
 * @Date: 2018-05-26 14:15:35 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-05-26 21:04:59
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
    params: {
      pageNum: 1,
      pageSize: 8
    },
    count: 0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      list:[],
      'params.pageNum':1
    })
    this.getList();
  },
  getList(type) {
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
          return;
        }
        if (res.status !== 200) {
          app.utils.showModel('获取消息列表数据', res.msg);
          return;
        }
        let list = []
        let old = this.data.list;
        if(type == 'push'){
          old.push(...res.data.list)
          list =  old
        }else{
          list = res.data && res.data.list || [];
        }
        list.map(item => {
          console.log(item)
          item['typeStr'] = this.getArrStr(this.data.logTypes, item.type);
          item['gmtCreateStr'] = this.switchTime(item.gmtCreate);
        })
        console.log(list)
        this.setData({
          list: list,
          count: res.data.count
        })

      })
      .catch(res => {
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
    arr.map(function (e) {
      if (e.key == key) {
        str = e.str;
      }
    });
    return str;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      'params.pageNum': 1,
      list: []
    })
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log('wxlog-触底')
    if (this.data.list.length < this.data.count) {
      this.data.params.pageNum++;
      this.getList('push');
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})