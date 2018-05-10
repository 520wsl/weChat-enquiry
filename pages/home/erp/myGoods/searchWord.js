// pages/home/erp/myGoods/searchWord.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    storageName: 'searchList',
    params: {
      status: 1,
      keyword: '',
      num: 4
    },
    // 历史列表
    searchList: [],
    // 搜索列表
    result: [],
    // 搜索
    searchName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('searchWord', options)
    // let keyword = options.keyword || '';
    let status = options.status || 1;
    this.setData({
      'params.status': status
    })

    this.getWords();
  },

  // 搜索历史
  getWords() {
    wx.getStorage({
      key: this.data.storageName,
      success: res => {
        console.log(res.data)
        this.setData({
          searchList: res.data
        })
      }
    })
  },

  // 重置 热词搜索
  // reset() {
  //   this.setData({
  //     list: []
  //   })
  // },

  // 重置 搜索列表
  resetResult() {
    this.setData({
      result: []
    })
  },

  // 删除搜索关键词
  delSearch() {
    this.setData({
      searchName: '',
      'params.keyword':''
    })

    this.data.result = [];
    this.getSearchResult();
  },

  // 返回
  back() {
    wx.navigateBack();
    return;
  },

  // 跳转页面
  jumpPage(e) {
    let categoryName = e.currentTarget.dataset.categoryname;
    let searchList = this.data.searchList || [];
    searchList.unshift(categoryName)
    searchList = searchList.slice(0, 10)
    wx.setStorage({
      key: this.data.storageName,
      data: searchList
    })
    wx.redirectTo({
      url: '/pages/home/erp/myGoods/myGoods?keyword=' + categoryName + '&status=' + this.data.params.status
    });
    return;
  },

  // 搜索结果
  searchHandle(e) {
    this.setData({
      searchName: e.detail.value
    });

    this.data.result = [];
    this.getSearchResult();
  },

  // 获取搜索结果
  getSearchResult() {
    app.get('/product/searchproductnamelist', { keyword: this.data.searchName, num: this.data.params.num }).then((res) => {
      // console.log(res)
      // 未登录、超时
      if (res.status == 401) {
        this.resetResult();
        wx.showModal({
          title: '提示',
          content: '登录超时或未登录，请重新登录',
          success: res => {
            if (res.confirm) {
              // app.reset();
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
        this.resetResult();
        return;
      }

      let data = res.data;
      if (data && data.length > 0) {
        this.data.result.push(...data);
        this.setData({
          result: this.data.result
        });
        return;
      }
      this.resetResult();
    }).catch((res) => {
      console.log(res);
    });
  }
})