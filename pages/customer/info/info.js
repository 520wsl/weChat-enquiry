// pages/customer/info/info.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    info:{
      name:'',
      nameIcon:'',
      level:0,
      type: 2,
      mobilePhone:'1388888888888',
      mailbox:'5462165464@qq.com',
      company:'好多蛋糕丢按',
      fullAddress: '浙江省 杭州市 西湖区 文一西路588号浙江省 杭州市 西湖区 文一西路588号浙江省 杭州市 西湖区 文一西路588号浙江省 杭州市 西湖区 文一西路588号',
      address:'浙江省 杭州市 西湖区浙江省 杭州市 西湖区浙江省 杭州市 西湖区浙江省 杭州市 西湖区'
    },
    tradeInfo:{
      paymentAmount:'0',
      enquiryQuantity:'0',
      totalAmount:'0',
      followAmount: '0',
      successProportion: '0',
      orderQuantity: '0',
      commodityQuantity: '0',
      commodityNum: '0'
    },
    tradeSpread:false,
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(query){
    // app.utils.showModel('体验版登录', '登录失败，请联系客户重新获取体验码！')
    if(query.index){
      this.setData({
        index: query.index
      })
    }
    let customerId = query.customerId || 1751
    if (!customerId){
      return;
    }
    app.post('/crm/customer/detail', {customerId}).then(res=>{
      if(res.status != 200){
        return;
      }
      let nameIcon = res.data.name.slice(0, 1)
      res.data.name =  res.data.name
      res.data.nameIcon = nameIcon
      this.setData({
        info: res.data
      })
      app.post('/crm/customer/transaction/info', { aliAccount: this.data.info.account}).then(res=>{
        console.log(res)
        if(res.status !== 200){
          return;
        }
        this.setData({
          tradeInfo: res.data
        })
      })
    })
  },

  changeTraderSpread:function(){
    this.setData({
      tradeSpread: !this.data.tradeSpread
    })
  },
  toCustomerEdit:function(){
    let id = this.data.info.id || 0
    wx.navigateTo({
      url: "../edit/edit?type=" + 'edit' + "&customerId=" + this.data.info.id
    })
  } 
})