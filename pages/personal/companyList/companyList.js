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
  onLoad: function () {
    this.getList()
  },
  getList: function () {
    app.get('/company/list').then(res => {
      // console.log(res);
      if (res.status === 200) {
        this.setData({
          lists: res.data
        })
      } else {
        utils.showModel('获取公司失败', res.msg)
      }
    })
  },
  // 选择公司
  changeCompany: function (event) {
    console.log('changeCompany', event)
    app.setcompany(event.target.dataset.aliaccountid)
  }
})