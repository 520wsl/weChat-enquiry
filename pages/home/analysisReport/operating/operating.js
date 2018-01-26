// pages/home/analysisReport/operating/operating.js
const app = getApp();
Page({
  /**
     * 页面的初始数据
     */
  data: {
    CDN: app.CDN,
    operatingData: {},
    reportId: null,
    reportName:null
  },
  //选择传入信息
  selectReport(e) {
    console.log(e.detail.params);
    this.setData({
      reportName: e.detail.params.reportName,
      reportId:e.detail.params.reportId
    });
    let tittle=String(e.detail.params.reportName);
    wx.setNavigationBarTitle({
      title: tittle
    })
  },
  add: function(e) {
    extraLine.push('other line')
    this.setData({
      text: initData + '\n' + extraLine.join('\n')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
