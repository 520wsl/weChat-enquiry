// pages/home/erp/goodsInfo/editGoodsTxt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subscript: '',
    key: 'photoInfos',
    str: '',
    cursor: 0,
    photoInfos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('options', options)
    let subscript = options.subscript;
    this.setData({
      subscript: subscript,
    })
    wx.getStorage({
      key: this.data.key,
      success: res => {
        // console.log('getStorage', res);
        this.data.photoInfos = res.data;
        let description = res.data[subscript]['description'] || '';
        let cursor = description.length || 0;
        this.setData({
          str: description,
          cursor: cursor
        })
      },
    })
  },
  setStr(e) {
    // console.log('setStr', e)
    this.setData({
      str: e.detail.value,
      cursor: e.detail.cursor
    })
  },
  // 保存修改
  submit() {
    let photoInfos = this.data.photoInfos || [];
    let subscript = this.data.subscript;
    let str = this.data.str || '';
    if (photoInfos.lnegth < subscript || str.length <= 0) {
      return;
    }
    photoInfos[subscript]['description'] = str;
    wx.setStorage({
      key: this.data.key,
      data: photoInfos,
    })
    wx.navigateBack()
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