// pages/personal/bindPhone/bindPhone.js
//获取应用实例
const app = getApp()
Page({
  verifyBindphone: function () {
    console.log({ ...this.data.params })
    let params = { ...this.data.params };
    if (!params.phone || !/^1[34578]\d{9}$/.test(params.phone)) {
      app.utils.showModel('', '请填写正确的手机号')
      return;
    }
    if (!params.code) {
      app.utils.showModel('', '请填写正确的短信验证码')
      return;
    }
    if (!params.verifycode && this.data.isShowYzm) {
      app.utils.showModel('', '请填写正确的图片验证码')
      return;
    }
    this.bindphone();
  },
  bindphone: function () {
    app
      .post('/auth/bindphone', { ...this.data.params })
      .then(res => {
        if (res.status !== 200) {
          app.utils.showModel('', res.msg)
          return;
        }

        // 判断是否需要选择公司
        app.ifBindCustome();
      })
  },
  // 获取图片验证码
  setYzm: function () {
    app.download(app.apiName('/auth/verifycode') + '?time=' + app.time.formatTime(new Date(), 'x')).then(path=>{
      console.log(path)
      this.setData({
        yzm: path
      })
    })
    
    console.log( app.time.formatTime(new Date(), 'x'))
  },
  setPhone: function (res) {
    this.setData({
      "params.phone": res.detail.value
    })
  },
  setVerifycode: function (res) {
    this.setData({
      "params.verifycode": res.detail.value
    })
  },
  setCode: function (res) {
    this.setData({
      "params.code": res.detail.value
    })
  },
  // 获取短信验证码
  getSendcode: function () {
    let params = { ...this.data.params };
    if (!params.phone || !/^1[34578]\d{9}$/.test(params.phone)) {
      app.utils.showModel('', '请填写正确的手机号')
      return;
    }
    if ((!params.verifycode && this.data.isShowYzm) || (params.verifycode && params.verifycode.length !== 4)) {
      app.utils.showModel('', '请填写正确的图片验证码')
      return;
    }
    app
      .post('/auth/sendcode?time=' + app.time.formatTime(new Date(), 'x'), params)
      .then(res => {
        console.log(res)
        if (res.status !== 200) {
          app.utils.showModel('', res.msg)
          this.setData({ isShowYzm: true })
          this.setYzm();
          return;
        }
        this.setData({
          'params.code': res.data
        })

      })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  /**
   * 页面的初始数据
   */
  data: {
    yzm: '',
    isShowYzm: false,
    params: {
      verifycode: '',
      phone: '',
      code: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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