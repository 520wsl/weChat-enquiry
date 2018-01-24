// components/dateControl/dateControl.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 选择项
    active: {
      type: Number,
      value: 0
    },
    // 类型
    type: {
      type: String,
      value: 'action',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 数据
    data: [
      {
        label: '近一周',
        startTime: app.time.getTimeLimit(1, 'weeks'),
        endTime: app.time.getTimeLimit(-1),
        type: 1
      },
      {
        label: '近一月',
        startTime: app.time.getTimeLimit(1, 'months'),
        endTime: app.time.getTimeLimit(-1),
        type: 2
      },
      {
        label: '近半年',
        startTime: app.time.getTimeLimit(6, 'months'),
        endTime: app.time.getTimeLimit(-1),
        type: 3
      },
      {
        label: '近一年',
        startTime: app.time.getTimeLimit(1, 'years'),
        endTime: app.time.getTimeLimit(-1),
        type: 4
      }
    ],
  },

  ready() {
    // this.triggerEvent('getTime', { time: this.data.data[0] });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickHandle(e) {
      let index = e.currentTarget.dataset.index;
      this.common(index);
    },
    open() {
      wx.showActionSheet({
        itemList: ['近一周', '近一月', '近半年', '近一年'],
        success: (res) => {
          this.common(res.tapIndex);
        },
        fail: (res) => {
          console.log(res.errMsg)
        }
      });
    },
    common(index) {
      this.setData({
        active: index
      });

      this.triggerEvent('getTime', { time: this.data.data[index] });
    }
  }
})
