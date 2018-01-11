// pages/searchWord/searchWord.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      categoryId: ''
    },

    list: [],

    // 标识
    signs: 0,// 0 产品，1 价格
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 不同页面入口进来，需要一个标识
    this.data.signs = options.signs || 0;
    this.data.params.categoryId = options.categoryId || 3;

    this.getWords()
  },

  // 获取热词
  getWords() {
    app.get('/category/hotkeyword', this.data.params).then((res) => {
      console.log(res)
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
      if (data && data.length > 0) {
        this.data.list.push(...data);
        this.setData({
          list: this.data.list
        });
        return;
      }
      this.reset();
    }).catch((res) => {
      console.log(res);
    });
  },

  // 重置
  reset() {
    this.setData({
      list: []
    })
  },

  // 跳转页面
  jumpPage(e) {
    console.log(e);
    let categoryId = e.currentTarget.dataset.categoryid;
    let classify = e.currentTarget.dataset.classify;
    let categoryName = e.currentTarget.dataset.categoryname;
    if (this.data.signs) {
      wx.redirectTo({
        url: '/pages/home/priceTrend/priceTrend?categoryId=' + categoryId + '&categoryName=' + categoryName + '&classify=' + classify
      });
      return;
    }
    wx.redirectTo({
      url: '/pages/home/productList/productList?categoryId=' + categoryId + '&categoryName=' + categoryName + '&classify=' + classify
    });
  }
})