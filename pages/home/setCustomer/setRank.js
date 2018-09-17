// pages/home/setCustomer/setRank.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    params: {
      supremeMoney: 0, // 至尊会员金额界限
      supremeOrder: 9, // 至尊会员订单数量界限
      highMoney: 0, // 高级会员金额界限
      highOrder: 0, // 高级会员订单数量界限
      vipMoney: 0, // vip会员金额界限
      vipOrder: 0, // vip会员订单数量界限
      id: '',
      companyId: ''
    },
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  saveData() {
    let params = { ...this.data.params
    }
    if (!this.validateMoney(params.highMoney) || !this.validateOrder(params.highOrder) || !this.validateMoney(params.vipMoney) || !this.validateOrder(params.vipOrder) || !this.validateMoney(params.supremeMoney) || !this.validateOrder(params.supremeOrder)) {
      return
    }
    app
      .post('/level/edit', params)
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
          app.utils.showModel('设置客户等级数据', res.msg);
          return;
        }

        this.getList()
        app.utils.showModel('设置客户等级数据', '设置成功');

      })
  },
  validateOrder(order) {
    if (money > 9999999 || money < 0) {
      app.utils.showModel('设置订单数', '订单数不能小于0笔 并且 不能大于 9999999笔');
      return false
    }
    return true
  },
  validateMoney(money) {
    if (order > 999999999.99 || order <= 0) {
      app.utils.showModel('设置金额', '金额不能小于0元 并且 不能大于 999999999.99元');
      return false
    }
    return true
  },
  setLevel(e) {
    let level = e.currentTarget.dataset.level
    let dataType = e.currentTarget.dataset.type
    let value = parseFloat(e.detail.value)

    if (dataType == 'money' && !this.validateMoney(value)) {
      return
    }

    if (dataType == 'order' && !this.validateOrder(value)) {
      return
    }

    if (level == 'high' && dataType == 'money') {
      this.setData({
        'params.highMoney': value
      })
      return
    }
    if (level == 'high' && dataType == 'order') {
      this.setData({
        'params.highOrder': value
      })
      return
    }
    if (level == 'vip' && dataType == 'money') {
      this.setData({
        'params.vipMoney': value
      })
      return
    }
    if (level == 'vip' && dataType == 'order') {
      this.setData({
        'params.vipOrder': value
      })
      return
    }
    if (level == 'supreme' && dataType == 'money') {
      this.setData({
        'params.supremeMoney': value
      })
      return
    }
    if (level == 'supreme' && dataType == 'order') {
      this.setData({
        'params.supremeOrder': value
      })
      return
    }
  },
  getList() {
    app
      .post('/level/dail')
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
          app.utils.showModel('获取客户等级数据', res.msg);
          return;
        }

        let list = []
        list.push({
          index: 0,
          order: 0,
          money: 0,
          level: '',
          name: '普通会员'
        })
        list.push({
          index: 1,
          order: res.data.highOrder,
          money: res.data.highMoney,
          level: 'high',
          name: '高级会员'
        })
        list.push({
          index: 2,
          order: res.data.vipOrder,
          money: res.data.vipMoney,
          level: 'vip',
          name: 'VIP会员'
        })
        list.push({
          index: 3,
          order: res.data.supremeOrder,
          money: res.data.supremeMoney,
          level: 'supreme',
          name: '至尊会员'
        })

        this.setData({
          params: {
            id: res.data.id,
            companyId: res.data.companyId,
            supremeOrder: res.data.supremeOrder,
            supremeMoney: res.data.supremeMoney,
            vipOrder: res.data.vipOrder,
            vipMoney: res.data.vipMoney,
            highOrder: res.data.highOrder,
            highMoney: res.data.highMoney
          },
          list: list
        })
      })
  }
})