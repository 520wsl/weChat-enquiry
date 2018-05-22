// pages/home/erp/goodsInfo/searchPic.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    index: '',
    key: 'photoInfos',
    imgUrls: [],
    imgUrl:'',
    photoInfos: [],
    params: {
      pageNum: 1,
      pageSize: 10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    let index = options.index;
    this.setData({
      index: index
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
          this.setData({
            imgUrls: e.data.photoInfos
          });
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
  setImgUrl(e){
    console.log('setImgUrl',e)
    let imgUrl = e.currentTarget.dataset.imgurl || '';
    if (imgUrl == this.data.imgUrl){
      imgUrl = ''
    }
    this.setData({
      imgUrl: imgUrl
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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

  },
  preview() {
    let imgUrl = this.data.imgUrl || '';
    wx.previewImage({
      current: imgUrl, // 当前显示图片的http链接
      urls: [
        'http://3.img.dianjiangla.com/uploads/f8365740af2513bc977aef07e4945df9160471.jpg',
        'http://3.img.dianjiangla.com/uploads/f8365740af2513bc977aef07e4945df9160471.jpg',
        'http://3.img.dianjiangla.com/uploads/d3b1ed58f625f283f073162268368071267337.jpg!286x312'
      ] // 需要预览的图片http链接列表
    })
  }
})