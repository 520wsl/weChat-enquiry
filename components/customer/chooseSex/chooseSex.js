// components/customer/chooseIdentity/chooseIdentity.js
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: [
      {
        type: 0,
        label: '不明'
      },
      {
        type: 1,
        label: '男'
      },
      {
        type: 2,
        label: '女'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    open: function () {
      let itemList = this.data.data.map((res) => {
        return res.label;
      });
      wx.showActionSheet({
        itemList: itemList,
        success: (res) => {
          this.sentSex(res.tapIndex);
        },
        fail: (res) => {
          console.log(res.errMsg)
        }
      });
    },
    sentSex: function (index) {
      if (index === '' || index === null || index === undefined) return;
      this.setData({
        active: index
      });

      this.triggerEvent('getSex', { label: this.data.data[index] });
    }
  }
})
