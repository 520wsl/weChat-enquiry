// components/entrance/entrance.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    entrance: [
      {
        label: '产品排行',
        navUrl: '/pages/home/productList/productList',
        imgUrl: app.CDN+'/home-pro.png',
        type: 'ph',
        signs: 0,
      },
      {
        label: '标王记录',
        navUrl: '/pages/home/priceTrend/priceTrend',
        imgUrl: app.CDN +'/home-bw.png',
        type: 'jl',
      },
      {
        label: '价格分布',
        navUrl: '/pages/home/priceTrend/priceTrend',
        imgUrl: app.CDN +'/home-jg.png',
        type: 'fb',
        signs: 1
      }
    ],
    categoryId: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpPage(e) {
      if (e.currentTarget.dataset.type == 'jl') {
        wx.navigateTo({
          url: '/pages/home/hasRecord/hasRecord'
        });
        return;
      }

      console.log(e);
      let link = e.currentTarget.dataset.link;
      if (app.globalData.customeInfo) {
        let categoryId = app.globalData.customeInfo.categoryId;
        let categoryName = app.globalData.customeInfo.categoryName;
        let classify = app.globalData.customeInfo.classify;
        this.data.categoryId = categoryId || '';
        this.data.categoryName = categoryName || '';
        this.data.classify = classify || '';
      } else {
        this.data.categoryId = '';
        this.data.categoryName = '';
        this.data.classify = '';
      }
      if (this.data.categoryId && this.data.classify) {
        wx.navigateTo({
          url: link + '?categoryId=' + this.data.categoryId + '&categoryName=' + this.data.categoryName + '&classify=' + this.data.classify
        });
        return;
      }
      // 搜索页
      wx.navigateTo({
        url: '/pages/searchWord/searchWord?signs=' + e.currentTarget.dataset.signs
      });
    }
  }
})
