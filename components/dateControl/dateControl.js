// components/dateControl/dateControl.js
const app = getApp();
import moment from '../../utils/resources/moment.min.js';
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
// 数据
    data: [
      {
        label: '一周',
        startTime: moment().subtract(1, 'weeks').format(),
        type: 0
      },
      {
        label: '一月',
        startTime: moment().subtract(1, 'months').format(),
        type: 1
      },
      {
        label: '半年',
        startTime: moment().subtract(6, 'months').format(),
        type: 2
      },
      {
        label: '一年',
        startTime: moment().subtract(1, 'years').format(),
        type: 3
      }
    ],
    // 选择项
    active: 0
  },

  ready(){
    this.triggerEvent('getTime', { time: this.data.data[0] });
    console.log(app);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickHandle(e) {
      let index = e.currentTarget.dataset.index;
      this.setData({
        active: index
      });

      this.triggerEvent('getTime', { time: this.data.data[index] });
    }
  }
})
