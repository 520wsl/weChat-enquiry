// pages/customer/info/info.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    info:{
      name:'李东强',
      nameIcon:'李',
      level:0,
      type: 2,
      mobilePhone:'1388888888888',
      mailbox:'5462165464@qq.com',
      company:'好多蛋糕丢按',
      fullAddress: '浙江省 杭州市 西湖区 文一西路588号浙江省 杭州市 西湖区 文一西路588号浙江省 杭州市 西湖区 文一西路588号浙江省 杭州市 西湖区 文一西路588号',
      address:'浙江省 杭州市 西湖区浙江省 杭州市 西湖区浙江省 杭州市 西湖区浙江省 杭州市 西湖区'
    },
    tradeInfo:{
      paymentAmount:'555.555万元',
      enquiryQuantity:'12555',
      totalAmount:'6000万元',
      followAmount: '4000万元',
      successProportion: '66.66%',
      orderQuantity: '3',
      commodityQuantity: '1',
      commodityNum: '1000'
    },
    tradeSpread:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(query){
    console.log(app)
    // app.utils.showModel('体验版登录', '登录失败，请联系客户重新获取体验码！')
    let customerId = query.customerId
    if (!customerId){
      return;
    }
    app.post('crm/customer/detail', { customerId}).then(res=>{
      if(res.status != 200){
        return;
      }
      let nameIcon = res.data.name.slice(0, 1)
      res.data.name = nameIcon + res.data.name
      res.data.nameIcon = nameIcon
      this.setData({
        info: res.data
      })
    })
    app.post('crm/customer/transaction/info')
  },

  changeTraderSpread:function(){
    this.setData({
      tradeSpread: !this.data.tradeSpread
    })
  },
  toCustomerEdit:function(){
    wx.navigateTo({
      url: "../edit/edit?type="+'edit'
    })
  } 
})