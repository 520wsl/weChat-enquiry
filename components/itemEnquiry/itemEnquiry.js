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
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    CDN: app.CDN,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
