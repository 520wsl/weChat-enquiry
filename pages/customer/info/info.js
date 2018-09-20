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
      mobilePhone:'',
      mailbox:'',
      company:'',
      fullAddress: '',
      address:''
    },
    tradeInfo:{
      paymentAmount:'0',
      enquiryQuantity:'0',
      totalAmount:'0',
      followAmount: '0',
      successProportion: '0%',
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
      if (res.status == 401) {
        wx.showModal({
          title: '提示',
          content: '登录超时或未登录，请重新登录',
          success: res => {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/personal/personal'
              });
              return;
            }
          }
        });
        return;
      }
      if(res.status != 200){
        app.utils.showModel('提示', '暂无客户详情');
        return;
      }
      let nameIcon = res.data.name.slice(0, 1)
      res.data.name =  res.data.name
      res.data.nameIcon = nameIcon
      this.setData({
        info: res.data
      })
      app.post('/crm/customer/transaction/info', { aliAccount: this.data.info.account}).then(res=>{
        if(res.status !== 200){
          return;
        }
        let tradeInfo={
          commodityNum: res.data.commodityNum == null ? 0 : res.data.commodityNum,
          commodityQuantity: res.data.commodityQuantity == null ? 0 : res.data.commodityQuantity,
          customerAccount: res.data.customerAccount == null ? 0 : res.data.customerAccount,
          enquiryQuantity: res.data.enquiryQuantity == null ? '0次' : res.data.enquiryQuantity + '次',
          followAmount: res.data.followAmount == null ? '0万元' : res.data.followAmount + '万元',
          orderQuantity: res.data.orderQuantity == null ? 0 : res.data.orderQuantity,
          paymentAmount: res.data.paymentAmount == null ? '0万元' : res.data.paymentAmount + '万元',
          successProportion: res.data.successProportion == null ? '0%' : res.data.successProportion + '%',
          totalAmount: res.data.totalAmount == null ? '0万元' : res.data.totalAmount + '万元'
        }
        this.setData({
          tradeInfo: tradeInfo
        })
      })
    })
  },

  changeTraderSpread:function(){
    this.setData({
      tradeSpread: !this.data.tradeSpread
    })
    if (this.data.tradeSpread && wx.pageScrollTo){
      console.log(111)
      wx.pageScrollTo({
        duration: 300,
        scrollTop: 900,
        success: function () {
          console.log('success')
        },
        fail: function () {
          console.log('fail')
        }
      })
    }
    wx.pageScrollTo({
      duration: 300,
      scrollTop: 0
    })
  },
  toCustomerEdit:function(){
    let id = this.data.info.id || 0
    wx.navigateTo({
      url: "../edit/edit?type=" + 'edit' + "&customerId=" + this.data.info.id
    })
  } 
})