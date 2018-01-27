// components/common/trading/trading.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: null
    },
    type: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    areaData: [
      {
        label: '总金额',
        t1: 'allAmount',
        t2: 'allCount'
      },
      {
        label: '成交金额',
        t1: 'gmvAmount',
        t2: 'gmvCount'
      },
      {
        label: '跟单金额',
        t1: 'followAmount',
        t2: 'followCount'
      },
      {
        label: '流失金额',
        t1: 'lossAmount',
        t2: 'lossCount'
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
