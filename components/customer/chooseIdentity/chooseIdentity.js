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
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    CDN: app.CDN,
    data:[
      {
        type: 0,
        label: '其他'
      },
      {
        type: 1,
        label:'淘宝采购商'  
      },
      {
        type: 2,
        label: '经销商'
      },
      {
        type: 3,
        label: '微商'
      },
      {
        type: 4,
        label: '外贸'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    open:function(){
      let itemList = this.data.data.map((res) => {
        return res.label;
      });
      wx.showActionSheet({
        itemList: itemList,
        success: (res) => {
          this.sentType(res.tapIndex);
          // console.log(res)
        },
        fail: (res) => {
          console.log(res.errMsg)
        }
      });
    },
    sentType:function(index){
      if (index === '' || index === null || index === undefined) return;
      this.setData({
        active: index
      });
      
      this.triggerEvent('getType', { label: this.data.data[index] });
    } 
  }
})
