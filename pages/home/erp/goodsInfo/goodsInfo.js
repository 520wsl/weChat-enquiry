/*
 * @Author: Mad Dragon 
 * @E-Mail: 395548460@qq.com 
 * @Date: 2018-05-24 20:47:21 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-05-25 19:33:09
 */
// pages/home/erp/goodsInfo/goodsInfo.js
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
    key: 'photoInfos',
    params: '',
    styleId: 0,
    photoInfos: [],
    aliAccountId: '',
    isshowbtn: false,
    isNext: false,
    styles: [
      {
        name: '默认风格',
        imgUrl: 'zdy/zdy-0.png',
        num: 0
      },
      {
        name: '风格一',
        imgUrl: 'zdy/zdy-2.png',
        num: 1
      },
      {
        name: '风格二',
        imgUrl: 'zdy/zdy-3.png',
        num: 2
      },
    ]
  },
  showNorm () {
    this.setData({
      show: !this.data.show
    });
  },
  // 获取storage里的数据
  getStoragePhotoInfos () {
    wx: wx.getStorage({
      key: this.data.key,
      success: res => {
        console.log('getStoragePhotoInfos', res.data)
        this.setData({
          photoInfos: res.data
        })
      }
    })
  },
  productList (productId) {
    if (wx.showLoading) {
      wx.showLoading({ title: '加载中...' });
    }

    let url = '/product/detail'
    let params = { productId: this.data.productId }

    if (this.data.aliAccountId) {
      url = '/product/detail/share'
      params = { productId: this.data.productId, aliAccountId: this.data.aliAccountId }
    }

    app
      .get(url, params)
      .then(e => {
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
        if (!e.data) {
          if (wx.hideLoading) {
            wx.hideLoading();
          }
          app.utils.showModel('商品详情', '没有找到商品详情');
          return;
        }
        if (e.status == 200) {
          if (wx.hideLoading) {
            wx.hideLoading();
          }
          e.data.maxformatData = this.formatData(e.data.maxPrice);
          e.data.minformatData = this.formatData(e.data.minPrice);
          if (this.data.isNext) {
            this.getStoragePhotoInfos();
            this.setData({
              params: e.data,
            });
            return;
          }
          this.setData({
            params: e.data,
            photoInfos: e.data.photoInfos,
            styleId: e.data.styleId
          });
        }
      })
      .catch(res => {
        console.log(res);
      });
  },
  // 返回按钮
  backIndex () {
    wx.switchTab({
      url: '/pages/home/home'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('goodsinfo-options', options)
    let isNext = false;
    let productId = options.productId || '';
    let styleId = options.styleId;

    let customeInfo = app.globalData.customeInfo;
    let aliAccountId = options.aliAccountId;
    let isshowbtn = false;

    if (aliAccountId) {
      isshowbtn = true;
    }
    console.log('isshowbtn', isshowbtn, app.globalData.customeInfo, aliAccountId)

    if (styleId >= 0) {
      isNext = true;
      this.setData({
        styleId: styleId,
        isNext: isNext
      })
    }
    this.setData({
      productId,
      aliAccountId,
      isshowbtn
    });
    this.productList();
  },
  // 设置选中的风格样式
  setStyle (e) {
    console.log('setStyle', e)
    let styleId = e.currentTarget.dataset.styleId || 0;
    this.setData({
      styleId: styleId
    })
  },
  // 放弃修改
  abandonPhotoInfos () {
    // this.setData({
    //   isNext: false
    // })
    this.setPhotoInfos([])
    wx.navigateBack()
  },
  // 同步数据
  setPhotoInfos (data) {
    this.setData({
      photoInfos: data
    })
    wx.setStorage({
      key: this.data.key,
      data: data
    })
  },
  submitPhotoInfos () {
    if (wx.showLoading) {
      wx.showLoading({ title: '提交中...' });
    }
    let params = {
      productId: this.data.productId,
      data: this.data.photoInfos,
      styleId: this.data.styleId
    }
    app
      .post('/product/setproductstyle', params)
      .then(e => {
        if (wx.hideLoading) {
          wx.hideLoading();
        }
        if (e.status == 200) {
          this.setData({
            isNext: false
          })
          return;
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
        if (e.status !== 200) {
          app.utils.showModel('自定义风格', e.msg);
        }
      })
      .catch(res => {
        console.log(res);
        app.utils.showModel('自定义风格', res.msg);
      });
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
      path: '/pages/home/erp/goodsInfo/goodsInfo?productId=' + this.data.productId + '&aliAccountId=' + app.globalData.customeInfo.aliAccountId
    }
  },
  formatData (v) {
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
