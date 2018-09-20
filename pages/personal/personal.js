// pages/personal/personal.js
import utils from '../../utils/utils';
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dbLogin: true,
    CDN: app.CDN,
    info: {},
    avatarUrl: '',
    companyName: '',
    services: [],
    isShowCompany: false,
    isOpenDebug: false,
    debugCode: '',
    num: 0,
    toggleHandleKey: 'toggleHandle',
    isToggleHandle: 0,
    action: '',
    datas: '',
    mid: '',
    aid: '',
    logtype: '',
    type: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('接收参数-options：', options);
    // 我的公司长度大于1时显示选择公司链接
    // this.login();
    wx.getStorage({
      key: this.data.toggleHandleKey,
      success: res => {
        this.setToggleHandle(res.data)
      },
    })

    this.getServices();
    // 新增入口
    // scene = 'action=i&data=eyJvcGVuaWQiOiJvdWc4VzBhZDNEazNOTGIxLXBxMXlrbHdCdlNjIiwiYWxpQWNjb3VudElkIjoxMSwiaWQiOjIyfQ==';


    let action = '',
      datas = '',
      mid = '',
      logtype = '',
      aid = '';
    let arr = {}

    let scene = decodeURIComponent(options.scene);
    if (typeof options.scene == "string") {
      let param = scene.split('&');
      console.log(param)
      param.map(res => {
        let {
          k,
          v
        } = this.splitStr(res)
        // console.log('res=>', res)
        // console.log('k=>v', k, v)
        arr[k] = v;
      })
      console.log(arr)
      action = arr['action'];
      datas = arr['data'];
    }


    if (options.action) {
      action = options.action;
      datas = options.data;
      mid = options.mid;
      aid = options.aid;
      logtype = options.type;
    }
    this.setData({
      action: action,
      datas: datas,
      mid: mid,
      aid: aid,
      logtype: logtype
    })
    let customeInfo = app.globalData.customeInfo;
    console.log('customeInfo', customeInfo)
    switch (action) {
      // 扫码
      case 'e':
        if (!datas) {
          app.utils.showModel('体验版登录', '登录失败，请联系客户重新获取体验码！')
          return;
        }
        this.toggleHandle(datas);
        break;
        // wx消息
      case 'i':
        if (!datas) {
          app.utils.showModel('微信消息登录', '登录失败，请联系管理处理！')
          return;
        }
        datas = JSON.parse(app.Base64.decode(datas));

        console.log('app全局信息打印', customeInfo);
        if (customeInfo && customeInfo.aliAccountId === datas.aliAccountId) {
          wx.navigateTo({
            url: '/pages/enquiry/info/info?id=' + datas.id
          });
          return;
        }
        // 走登录流程
        this.autoLogin(datas.aliAccountId, datas.id);
        break;
        // 订单消息
      case 'o':
        if (!datas) {
          app.utils.showModel('订单消息登录', '登录失败，请联系管理处理！')
          return;
        }
        datas = JSON.parse(app.Base64.decode(datas));
        console.log('订单消息', datas)

        console.log('app全局信息打印', customeInfo);
        if (customeInfo && customeInfo.aliAccountId === datas.aid) {
          wx.navigateTo({
            // url: '/pages/home/erp/orderInfo/orderInfo?orderId=' + datas.id
            url: '/pages/enquiry/enquiryOrderInfo?orderId=' + datas.id
          });
          return;
        }
        // 走登录流程
        this.autoLogin(aid, datas.id);
        break;
      case 'msg':
        if (customeInfo && customeInfo.aliAccountId === aid) {
          wx.navigateTo({
            url: '/pages/log/wxlog/wxloginfo?userLogId=' + mid
          });
          return;
        }
        // 走登录流程
        this.autoLogin(aid, mid);
        break;
    }
  },
  splitStr(param) {
    if (typeof param !== "string") {
      return '';
    }
    let params = param.split('=');
    let k = params[0] || '';
    let v = params[1] || '';
    return {
      k,
      v
    };
  },
  autoLogin(aliAccountId, id) {
    wx.login({
      success: res => {
        if (!res.code) {
          utils.showModel('用户登录', '登录失败:' + res.errMsg)
          return;
        }
        //发起网络请求
        this.authorize(res.code, aliAccountId, id)
      },
      complete: res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        }
      }
    });
  },
  // 1.2、 code 换取 openId 
  authorize(code, aliAccountId, id) {
    app
      .post('/auth/authorize', {
        code: code
      })
      .then(res => {
        if (res.status !== 200) {
          utils.showModel('用户授权', '授权失败:' + res.msg)
          return;
        }
        this.getUserInfo(aliAccountId, id);
      })
  },
  // 2、小程序 获取用户信息
  getUserInfo: function(aliAccountId, id) {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo;
        this.setcompany(aliAccountId, id);
      },
      fail: res => {
        this.openSetting(aliAccountId, id);
      }
    })
  },
  // 获取信息
  getCustome: function(id) {
    app.get('/account/my').then(res => {
      if (res.status !== 200) {
        return;
      }
      app.globalData.customeInfo = res.data;
      if (this.data.action == 'i') {
        wx.navigateTo({
          url: '/pages/enquiry/info/info?id=' + id
        });
        return;
      }
      if (this.data.action == 'o') {
        wx.navigateTo({
          url: '/pages/enquiry/enquiryOrderInfo?orderId=' + id,
        })
      }
      if (this.data.action == 'msg') {
        wx.navigateTo({
          url: '/pages/log/wxlog/wxloginfo?userLogId=' + id
        });
        return;
      }
    })
  },
  // 2.1、 调起客户端小程序设置界面
  openSetting: function(aliAccountId, id) {
    console.log('2.1、 调起客户端小程序设置界面')
    wx.showModal({
      content: '检测到您的账号未授权，请先授权。',
      showCancel: false,
      success: res => {
        wx.openSetting({
          success: (res) => {
            if (res.authSetting['scope.userInfo']) {
              this.getUserInfo(aliAccountId, id);
            } else {}
          }
        })
      }
    })
  },
  // 6.3 选择公司
  setcompany: function(aliAccountId, id) {
    app
      .post('/auth/setcompany', {
        aliAccountId: aliAccountId
      })
      .then(res => {
        if (res.status !== 200) {
          utils.showModel('切换公司', res.msg)
          return;
        }
        this.getCustome(id)
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.enquiryTime = null;
    this.getInfo();
  },
  onShareAppMessage: function() {
    return {
      title: '四喜E伙伴',
      path: '/pages/personal/personal'
    }
  },
  getServices: function() {
    app
      .get('/common/services')
      .then(res => {
        if (res.status !== 200) {
          // console.log('获取客服接口', res)
          return;
        }
        this.setData({
          services: res.data
        })
      })
  },
  //获取页面数据
  getInfo: function() {
    if (app.globalData.customeInfo && app.globalData.customeInfo.companyName) {
      this.setData({
        info: app.globalData.customeInfo,
        companyName: app.globalData.customeInfo.companyName,
        isShowCompany: app.globalData.customeInfo.companies.length > 1 ? true : false
      })
    } else {
      this.setData({
        info: {
          login: false
        }
      })
    }
    if (app.globalData.userInfo && app.globalData.userInfo.avatarUrl) {
      let avatarUrl = app.globalData.userInfo.avatarUrl || ''
      this.setData({
        avatarUrl: avatarUrl
      })
    }
  },
  btnLogin(e) {
    console.log('btnLogin', e)
    if (e.detail.errMsg == "getUserInfo:ok") {
      this.login();
      return;
    }
    app.utils.showModel('小程序登陆', e.detail.errMsg);
  },
  // 点击登录
  login: function() {
    if (this.data.isOpenDebug && (this.data.debugCode.length > 5)) {
      this.toggleHandle(this.data.debugCode);
      this.setData({
        isOpenDebug: false,
        debugCode: ''
      })
      return;
    }
    this.setData({
      isOpenDebug: false,
      debugCode: ''
    })

    if (this.data.dbLogin) {
      this.setData({
        isTiYan: false
      });
      app.reset();
      this.data.dbLogin = false;
      wx.setStorage({
        key: this.data.toggleHandleKey,
        data: 0,
      })
      this.setToggleHandle(0)
      app.login(() => {
        setTimeout(() => {
          this.data.dbLogin = true;
        }, 3000);
      });
    }
  },
  debug: function() {
    console.log('111')
    if (this.data.num != 9) {
      let num = this.data.num + 1;
      this.setData({
        num: num
      })
      return;
    }
    console.log('debug : ' + this.data.num)
    this.setData({
      num: 0,
      isOpenDebug: true
    })
  },
  setDebugCode: function(res) {
    this.setData({
      debugCode: res.detail.value
    })
    console.log(res.detail.value)
  },
  // 选择我的公司
  toCompany: function() {
    wx.navigateTo({
      url: "./companyList/companyList"
    })
  },
  // 常见问题
  toFqa: function() {
    wx.navigateTo({
      url: "./faq/faq"
    })
  },
  setLevel:function(){
    wx:wx.navigateTo({
      url: '/pages/home/setCustomer/setRank',
    })
  },
  toMessage: function() {
    wx.navigateTo({
      url: "/pages/log/wxlog/wxlog"
    })
  },
  toCustomer: function() {
    wx.navigateTo({
      url: "/pages/customer/customer"
    })
  },
  callPhone: function(res) {
    if (!res.currentTarget.dataset.phone) {
      return
    }
    wx.makePhoneCall({
      phoneNumber: res.currentTarget.dataset.phone
    })
  },
  // 退出登录事件
  logOut: function() {
    wx.showModal({
      title: '提示',
      content: '确认退出登录？',
      success: res => {
        if (res.confirm) {
          this.logOutApp();
        } else if (res.cancel) {
          return
        }
      }
    })
  },
  logOutApp: function() {
    app
      .post('/auth/logout')
      .then(res => {
        app.reset();
        this.setData({
          info: {},
          avatarUrl: '',
          companyName: '',
          isShowCompany: false
        })
      })
  },
  // 体验版切换
  toggleHandle(secret) {
    if (wx.showLoading) {
      wx.showLoading({
        title: '加载中...'
      });
    }
    this.setData({
      isTiYan: true
    });
    app.reset();
    app
      .post('/auth/experience', {
        secret: secret
      })
      .then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        }
        if (res.status !== 200) {
          app.utils.showModel('体验版登录', res.msg)
          return;
        }
        wx.setStorage({
          key: this.data.toggleHandleKey,
          data: 1,
        })
        this.setToggleHandle(1)
        app.getUserInfo();
      })
  },
  // 解除绑定的手机
  untie() {
    wx.showModal({
      title: '提示',
      content: '是否解除手机绑定?',
      success: res => {
        if (res.confirm) {
          if (wx.showLoading) {
            wx.showLoading({
              title: '解绑中...'
            });
          }
          app
            .post('/auth/unbindwechat')
            .then(res => {
              if (wx.hideLoading) {
                wx.hideLoading();
              }
              if (res.status !== 200) {
                app.utils.showModel('解绑手机', res.msg)
                return;
              }
              this.logOutApp()
            })
        } else if (res.cancel) {
          return
        }
      }
    })
  },
  setToggleHandle(e) {
    this.setData({
      isToggleHandle: e
    })
  }
})