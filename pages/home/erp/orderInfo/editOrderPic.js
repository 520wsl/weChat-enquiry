// pages/home/erp/orderInfo/editOrderPic.js
// pages/home/erp/orderInfo/orderInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,

    info: null,
    isOpen: false,
    err1: false,
    err2: false,
    // 弹窗
    modal: false,
    // totalAmount: 0,
    params: {
      orderId: '',
      fee: '',
      subItemPriceList: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.params.orderId = options.orderId;

    if (wx.showLoading) {
      wx.showLoading({ title: '加载中...' });
    }
    this.getInfo(() => {
      if (wx.hideLoading) {
        wx.hideLoading();
      }
    });
  },
  // 设置运费
  setFee(e) {
    let fee = e.detail.value
    if (fee == '' || fee.length < 0) {
      this.setData({
        'params.fee': fee,
        err2: true
      });
      return;
    }
    this.setData({
      'params.fee': fee,
      err2: false
    });
    this.setTotalAmount()
  },
  // 设置 价格
  setPrice(e) {
    let itemAmount = e.detail.value
    let index = e.currentTarget.dataset.index
    let productItems = this.data.info.productItems || []
    console.log('setPrice',e,index)
    if (itemAmount == '' || itemAmount.length < 0) {
      productItems[index]['itemAmount'] = itemAmount
      productItems[index]['err1'] = true
      this.setData({
        err1:true,
        'info.productItems': productItems
      });
      return;
    }
    console.log(productItems[index]['itemAmount'])

    productItems[index]['itemAmount'] = itemAmount
    productItems[index]['err1'] = false
    this.setData({
      err1: false,
      'info.productItems': productItems
    });
    this.setTotalAmount()
  },
  openPro() {
    this.setData({
      isOpen: !this.data.isOpen
    })
  },
  setTotalAmount() {
    // console.log('-----',this.data.info.productItems)
    this.data.params.subItemPriceList = this.data.info.productItems.map(item => {
      let arr ={
        itemAmount: item['itemAmount'],
        subItemID: item['subItemID']
      }
      // arr['itemAmount']= item['itemAmount'];
      // arr['subItemID'] = item['subItemID'];
      return arr
    })
    // let totalAmount = parseFloat(this.data.params.fee) + parseFloat(this.data.params.price)
    // totalAmount = this.toFixed(totalAmount)
    // console.log(totalAmount)
    // this.setData({
    //   totalAmount: totalAmount
    // })
  },
  // 显隐弹窗
  setModal() {
    if (this.data.err1 || this.data.err2) {
      return;
    }
    this.setData({
      modal: !this.data.modal
    })
    // let price = this.toFixed(parseFloat(this.data.params.price))
    // let fee = this.toFixed(parseFloat(this.data.params.fee))
    // this.setData({
    //   'params.price': price,
    //   'params.fee': fee
    // })
  },
  // 详情
  getInfo(cb) {
    app.get('/aliorder/get', { orderId: this.data.params.orderId}).then((res) => {
      console.log(res);
      if (typeof cb == 'function') {
        cb();
      }

      // 未登录、超时
      if (res.status == 401) {
        this.reset();
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
      if (res.status != 200) {
        this.reset();
        return;
      }

      let data = res.data;
      if (data) {
        data.shippingFee = this.toFixed(data.shippingFee);
        data.sumProductPayment = this.toFixed(data.sumProductPayment);
        // data.totalAmount = this.toFixed(data.totalAmount);
        // let nCache = data.totalAmount.split('.');
        // data.totalAmountDecimal = nCache[1];
        // data.totalAmountInt = nCache[0];
        data.productItems.forEach((item) => {
          item.price = this.toFixed(item.price);
        });
        this.data.params.subItemPriceList  = data.productItems.map(item => {
          let arr = {
            itemAmount: item['itemAmount'],
            subItemID: item['subItemID']
          }
          // arr['itemAmount']= item['itemAmount'];
          // arr['subItemID'] = item['subItemID'];
          return arr
        })
        this.setData({
          info: data,
          // 'params.price': data.sumProductPayment,
          'params.fee': data.shippingFee,
          // totalAmount: data.totalAmount
        });
        return;
      }
      this.reset();
    }).catch((res) => {
      console.log(res);
      if (typeof cb == 'function') {
        cb();
      }
    });
  },
  // 修改价格、运费
  setPic() {
    let itemAmountToTall = 0;
    this.data.params.subItemPriceList.map(item =>{
      itemAmountToTall += item['itemAmount']
    })
    if (itemAmountToTall <= 0){
      wx.showModal({
        title: '修改价格',
        content: '修改失败:商品总价必须大于0元！',
        success: res => {
          if (res.confirm) {
            this.getInfo();
          } else if (res.cancel) {
            this.getInfo();
          }
        }
      })
      return ;
    }
    app.post('/aliorder/updateorder', this.data.params).then((res) => {
      if (typeof cb == 'function') {
        cb();
      }
      // 未登录、超时
      if (res.status == 401) {
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
      if (res.status != 200) {
        wx.showModal({
          title: '修改价格',
          content: '修改失败:' + res.msg,
          success: res => {
            if (res.confirm) {
              this.getInfo();
            } else if (res.cancel) {
              this.getInfo();
            }
          }
        })
        return;
      }

      wx.showModal({
        title: '修改价格',
        content: '修改成功',
        success: res => {
          if (res.confirm) {
            this.setModal()
            wx.redirectTo({
              url: '/pages/home/erp/orderInfo/orderInfo?orderId=' + this.data.params.orderId,
            })
            // this.getInfo();
          } else if (res.cancel) {
            this.setModal()
            wx.redirectTo({
              url: '/pages/home/erp/orderInfo/orderInfo?orderId=' + this.data.params.orderId,
            })
            // this.getInfo();
          }
        }
      })
      return;
    }).catch((res) => {
      console.log(res);
    });
  },
  // 重置
  reset() {
    this.setData({
      info: null
    })
  },

  goLogistics() {
    wx.navigateTo({
      url: "/pages/home/erp/logisticsInfo/logisticsInfo?orderId=" + this.data.params.orderId
    });
  },
  goGoodsInfo(e) {
    let product = e.currentTarget.dataset.product;
    wx.navigateTo({
      url: "/pages/home/erp/goodsInfo/goodsInfo?productId=" + product
    });
  },
  toFixed(v) {
    if (v == '' || v == null || v == undefined) {
      return v;
    }
    return v.toFixed(2);
  },
  // 调启微信电话接口
  callPhone: function (res) {
    if (!res.currentTarget.dataset.phone || res.currentTarget.dataset.phone.length <= 0 || res.currentTarget.dataset.phone == '无') {
      return
    }
    wx.makePhoneCall({
      phoneNumber: res.currentTarget.dataset.phone
    })
  },
})