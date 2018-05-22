/*
 * @Author: Mad Dragon 
 * @E-Mail: 395548460@qq.com 
 * @Date: 2018-05-22 10:11:59 
 * @Last Modified by:   Mad Dragon 
 * @Last Modified time: 2018-05-22 10:11:59 
 */
// pages/home/erp/goodsInfo/editGoodsInfo.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    ALI: app.ALI,
    show: false,
    productId: '',
    params: {},
    key: 'photoInfos',
    photoInfos: [
      {
        "description": "",
        "imgUrl": "",
        "orderNum": 0
      },
      {
        "description": "打造高端品牌设计 精准营销产品！",
        "imgUrl": "http://3.img.dianjiangla.com/uploads/1d40c6105b1cef583f5533429c5e0f44117005.jpg",
        "orderNum": 11115
      },
      {
        "description": "活动海报 专题 中国风设计",
        "imgUrl": "http://3.img.dianjiangla.com/uploads/2b2188bd2f414ccd0d9e4f5fbd263dab266852.jpg",
        "orderNum": 11115
      },
      {
        "description": "",
        "imgUrl": "http://3.img.dianjiangla.com/uploads/995754d0c75630ee7c52d9c27167c5be1096852.jpg",
        "orderNum": 0
      },
      {
        "description": "活动海报 专题 中国风设计",
        "imgUrl": "",
        "orderNum": 0
      }
    ]
  },
  // 添加新的模块
  addPhotoInfos(e) {
    console.log('addPhotoInfos', e)
    let addType = e.currentTarget.dataset.type || 'push';
    let newModel = {
      "description": "",
      "imgUrl": "",
      "orderNum": 0
    }
    let photoInfos = this.data.photoInfos || [];
    if (addType == 'unshift') {
      photoInfos.unshift(newModel)
    }
    if (addType == 'push') {
      photoInfos.push(newModel)
    }
    this.setPhotoInfos(photoInfos)
  },
  // 删除模块
  delPhotoInfos(e) {
    console.log('delPhotoInfos', e)
    let num = e.currentTarget.dataset.num;
    let delType = e.currentTarget.dataset.type;
    let photoInfos = this.data.photoInfos || [];
    if (num > photoInfos.length) {
      return;
    }
    if (delType == 'delModel') {
      photoInfos.splice(num, 1);
    }
    if (delType == 'delImg') {
      photoInfos[num]['imgUrl'] = '';
    }
    if (delType == 'delDescription') {
      photoInfos[num]['description'] = '';
    }
    this.setPhotoInfos(photoInfos)
  },
  // 同步数据
  setPhotoInfos(data) {
    this.setData({
      photoInfos: data
    })
    wx.setStorage({
      key: this.data.key,
      data: data
    })
  },
  showNorm() {
    this.setData({
      show: !this.data.show
    });
  },
  // 获取photoInfos
  getPhotoInfos(){
  },
  productList(productId) {
    if (wx.showLoading) {
      wx.showLoading({ title: '加载中...' });
    }
    app
      .get('/product/detail', { productId: this.data.productId })
      .then(e => {
        if (e.status == 200) {
          if (wx.hideLoading) {
            wx.hideLoading();
          }
          e.data.maxformatData = this.formatData(e.data.maxPrice);
          e.data.minformatData = this.formatData(e.data.minPrice);
          this.setData({
            params: e.data
          });
          this.setPhotoInfos(e.data.photoInfos)
        }
        if (e.status == 401) {
          wx.showModal({
            title: '提示',
            content: '登录超时或未登录，请重新登录',
            success: res => {
              if (res.confirm) {
                app.reset();
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      productId: options.productId,
    });
    this.productList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '四喜E伙伴',
      path: '/pages/share/goodsInfo/goodsInfo?productId=' + this.data.productId + '&aliAccountId=' + app.globalData.customeInfo.aliAccountId
    }
  },
  formatData(v) {
    if (v) {
      v = v.toFixed(2);
      let cache = v.split('.');
      let vInt = cache[0];
      let vDouble = cache[1];
      return {
        vInt, vDouble
      }
    }
    return v;
  }
});
