// components/itemEnquiry/itemEnquiry.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      item: {
          type: Object,
          value: ''
      },
      statusBtn: {
        type: String,
        value: ''
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    CDN: app.CDN,
    saleStatusName: {
      1: '已成交',
      2: '跟单中',
      3: '已流失',
      4: '已流失'
    },
    statusBtnName: {
      2: '已成交',
      3: '跟单中',
      4: '已流失'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
