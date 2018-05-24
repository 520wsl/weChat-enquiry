/*
 * @Author: Mad Dragon 
 * @E-Mail: 395548460@qq.com 
 * @Date: 2018-05-23 15:02:57 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-05-24 12:30:24
 */
// pages/home/erp/goodsInfo/searchPic.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    subscript: '',
    key: 'photoInfos',
    imgUrls: [],
    imgUrl: '',
    photoInfos: [],
    productId: '',
    count: 0,
    params: {
      albumID: '',
      pageNum: 1,
      pageSize: 32
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('searchpic-options', options)
    let subscript = options.subscript || 0;
    let albumID = options.albumID;
    let productId = options.productId || '';
    this.setData({
      subscript: subscript,
      productId: productId,
      'params.albumID': albumID
    })
    wx.getStorage({
      key: this.data.key,
      success: res => {
        console.log('getStorage', res)
        this.data.photoInfos = res.data;
      },
    })

    this.getImgUrls();
  },
  getImgUrls() {
    app
      .get('/product/getproductimglist', { ...this.data.params })
      .then(e => {
        if (e.status == 200) {
          let imgUrls = [];
          let oldImgUrls = this.data.imgUrls || [];
          if (e.data.photoInfos && e.data.photoInfos.length > 0) {
            e.data.photoInfos.map(res => {
              imgUrls.push(res.url)
            })
            oldImgUrls.push(...imgUrls)
            console.log('imgUrls', oldImgUrls)
            this.setData({
              imgUrls: oldImgUrls,
              count: e.data.count
            });
          }
        }
        if (e.status == 401) {
          wx.showModal({
            title: '提示',
            content: '登录超时或未登录，请重新登录',
            success: res => {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/personal/personal'
                })
              } else if (res.cancel) {
              }
            }
          })
          return;
        }
      })
      .catch(res => {
        console.log(res);
      });
  },
  // 设置寻选中的图片路径
  setImgUrl(e) {
    console.log('setImgUrl', this.data.imgUrl, e.currentTarget.dataset.imgurl)
    let imgUrl = e.currentTarget.dataset.imgurl || '';
    if (imgUrl == this.data.imgUrl) {
      imgUrl = ''
    }
    this.setData({
      imgUrl: imgUrl
    })

  },
  // 保存修改
  submit() {
    let photoInfos = this.data.photoInfos || [];
    let subscript = this.data.subscript;
    let imgUrl = this.data.imgUrl || '';
    let productId = this.data.productId;
    if (photoInfos.lnegth < subscript || imgUrl.length <= 0) {
      return;
    }
    photoInfos[subscript]['imgUrl'] = imgUrl;
    console.log('photoInfos', photoInfos, 'subscript', subscript)

    wx.setStorage({
      key: this.data.key,
      data: photoInfos,
    })
    console.log('productId', productId)
    wx.redirectTo({
      url: '/pages/home/erp/goodsInfo/editGoodsInfo?pageType=edit&&productId=' + productId,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

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
    console.log('searchPic-触底')
    if (this.data.imgUrls.length < this.data.count) {
      this.data.params.pageNum++;
      this.getImgUrls();
  }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  preview() {
    let imgUrl = this.data.imgUrl || '';
    wx.previewImage({
      current: imgUrl, // 当前显示图片的http链接
      urls: this.data.imgUrls // 需要预览的图片http链接列表
    })
  }
})