/*
 * @Author: Mad Dragon 
 * @E-Mail: 395548460@qq.com 
 * @Date: 2018-05-22 10:11:59 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-05-25 19:33:18
 */
// pages/home/erp/goodsInfo/editGoodsInfo.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    isShowGuide: false,
    guideStorageKey: 'guide-home-erp-goodsInfo-editGoodSInfo',
    ALI: app.ALI,
    show: false,
    productId: '',
    pageType: '',
    styleId: 0,
    photoInfos: [],
    key: 'photoInfos',
    newModel: {
      description: "",
      imgUrl: "",
      orderNum: 0,
      type: 0
    }
  },
  // 添加新的模块
  addPhotoInfos(e) {
    console.log('addPhotoInfos', e)
    let addType = e.currentTarget.dataset.type || 'push';
    let photoInfos = this.data.photoInfos || [];
    let newModel = this.data.newModel;

    if (photoInfos.length > 49) {
      app.utils.showModel('自定义风格', '最多只能添加50个模块！');
      return;
    }

    if (addType == 'unshift') {
      photoInfos.unshift(newModel)
    }
    if (addType == 'push') {
      photoInfos.push(newModel)
    }
    this.setPhotoInfos(photoInfos)
  },
  setNext() {
    wx.redirectTo({
      url: '/pages/home/erp/goodsInfo/goodsInfo?productId=' + this.data.productId + '&&styleId=' + this.data.styleId,
    })
  },
  // 删除模块
  delPhotoInfos(e) {
    let num = e.currentTarget.dataset.num;
    let delType = e.currentTarget.dataset.type;
    let photoInfos = this.data.photoInfos || [];
    console.log('delPhotoInfos', e, photoInfos)

    // if (num > photoInfos.length) {
    //   return;
    // }
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
  // 放弃修改
  abandonPhotoInfos() {
    this.setPhotoInfos([])
    wx.navigateBack()
    // wx.redirectTo({
    //   // url: '/pages/home/erp/goodsInfo/goodsInfo?productId=' + this.data.productId
    //   url: '/pages/home/erp/myGoods/myGoods'
    // })
  },
  showNorm() {
    this.setData({
      show: !this.data.show
    });
  },
  // 获取photoInfos
  productList(productId) {
    if (wx.showLoading) {
      wx.showLoading({
        title: '加载中...'
      });
    }
    app
      .get('/product/detail', {
        productId: this.data.productId
      })
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
              } else if (res.cancel) {}
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
          this.setData({
            params: e.data
          });
          if (this.data.pageType == 'edit') {
            this.getStoragePhotoInfos();
            return;
          }
          if (e.data.photoInfos.length > 0) {
            this.setPhotoInfos(e.data.photoInfos)
            return;
          } else {
            try {
              var res = wx.getSystemInfoSync()
              console.log(res.model)
              console.log(res.pixelRatio)
              console.log(res.windowWidth)
              console.log(res.windowHeight)
              console.log(res.language)
              console.log(res.version)
              console.log(res.platform)
            } catch (e) {
              // Do something when catch error
            }
            this.setTop();
          }
          this.setPhotoInfos([this.data.newModel])
        }
      })
      .catch(res => {
        console.log(res);
      });
  },
  setTop() {
    console.log('pageScrollTo');
    setTimeout(() => {
      wx.pageScrollTo({
        scrollTop: 10000,
        duration: 300
      })
    }, 600)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: this.data.guideStorageKey,
      fail: res => {
        this.setData({
          isShowGuide: true
        })
      }
    })
    let productId = options.productId || '';
    let pageType = options.pageType || '';
    this.setData({
      productId: productId,
      pageType: pageType
    });
    this.productList();
  },
  setShowGuide() {
    this.setData({
      isShowGuide: false
    })
    wx.setStorage({
      key: this.data.guideStorageKey,
      data: false,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getStoragePhotoInfos();
  },
  // 获取storage里的数据
  getStoragePhotoInfos() {
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
  onShareAppMessage: function() {
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
        vInt,
        vDouble
      }
    }
    return v;
  }
});