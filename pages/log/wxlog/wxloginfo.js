/*
 * @Author: Mad Dragon 
 * @E-Mail: 395548460@qq.com 
 * @Date: 2018-05-26 14:15:27 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-05-28 14:47:19
 */
// pages/log/wxlog/wxloginfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    userLogId: '',
    logTypes: app.logTypes,
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userLogId = options.userLogId || '';
    this.setData({
      userLogId: userLogId
    })
    this.getInfo();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getInfo () {
    app
      .get('/messageuserlog/get', { userLogId: this.data.userLogId })
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
          app.utils.showModel('获取消息详情数据', res.msg);
          return;
        }
        let info = res.data || [];
        if (res.data) {
          info['typeStr'] = this.getArrStr(this.data.logTypes, info.type);
          info['gmtCreateStr'] = this.switchTime(info.gmtCreate);
          if (info.status == 1) {
            this.editStatus();
          }
        }

        this.setData({
          info: info
        })

      })
      .catch(res => {
        console.log('获取消息详情数据', res)
      })
  },
  editStatus () {
    app
      .post('/messageuserlog/haveread', { userLogId: this.data.userLogId })
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
      })
      .catch(res => {
        console.log('修改消息状态', res)
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getInfo();
  },
  switchTime (time) {
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
  getArrStr (arr = [], key = "") {
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
  // 返回按钮
  backIndex () {
    wx.switchTab({
      url: '/pages/log/wxlog/wxlog'
    });
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})