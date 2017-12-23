// pages/personal/companyList/companyList.js
import utils from '../../../utils/utils';
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  getList: function () {
    app.get('/company/list').then((res) => {
      if (res.status === 200) {
        this.setData({
          lists: res.data
        })
      }
    })
  },
  changeCompany: function (event) {
    app.post('/auth/setcompany', { aliAccountId: event.target.dataset.id})
    .then(res=>{
      if(res.status !== 200){
        utils.showModel('选择公司失败：', res.errMsg)
        return
      }
    })
    wx.navigateTo({
      url: '../personal'
    })
    // wx.navigateBack()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})