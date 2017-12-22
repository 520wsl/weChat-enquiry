// pages/personal/personal.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
  },
  //登录后获取到页面数据
  getInfo: function(){
    app.get('/account/my').then(res=>{
      res = {
        "data": {
          "avatar": "",
          "companies": [
            {
              "aliAccountId": 111111,
              "deleted": 0,
              "gmtCreate": 1513841991000,
              "gmtModified": 1513841988000,
              "id": 1,
              // "logoUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513852096547&di=29e947583c84d2f0d8abe2085f65cb5c&imgtype=0&src=http%3A%2F%2Fwww.sxdaily.com.cn%2FNMediaFile%2F2013%2F0131%2FSXRB201301310734000392607603176.jpg",
              "name": "测试用公司1"
            }
          ],
          "login": true,
          "logoUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513852096547&di=29e947583c84d2f0d8abe2085f65cb5c&imgtype=0&src=http%3A%2F%2Fwww.sxdaily.com.cn%2FNMediaFile%2F2013%2F0131%2FSXRB201301310734000392607603176.jpg",
          "phone": '18156'
        },
        "status": 200
      }
      if (res.status == 200) {
        this.setData({
          info: res.data
        })
      }
    })
  },
  toCompany: function(){
    wx.navigateTo({
      url: "./companyList/companyList?lists=" + JSON.stringify(this.data.info.companies)
    })
  },
  callPhone: function(){
    if (!this.data.info.phone){
      return
    }
    wx.makePhoneCall({
      phoneNumber: this.data.info.phone
    })
  },
  // 退出登录事件
  logOut: function(){
    wx.showModal({
      title: '提示',
      content: '确认退出登录？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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