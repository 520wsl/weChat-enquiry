// pages/customer/edit.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    info:{
      trueName: '李东强',
      phone: '13444444444',
      customerType: 3,
      company: '',
      position: '',
      wechat: '',
      account: '',
      birthday: '',
      sex: 0,
      eMail: '',
      area: '',
      detailAddress: '',
      remarks: '',
      source: 0,
      level: 1,
      cooperateDate:'2018年06月22日'
    },
    endTime: app.time.formatTime(),
    type:'',
    sourceList:[
      {
        type: 0,
        label: '默认'
      },
      {
        type: 1,
        label: '线上'
      },
      {
        type: 2,
        label: '线下'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    let type = query.type
    if(type =='edit'){
      wx.setNavigationBarTitle({
        title: '编辑客户信息'
      })
    } else if(type == 'add'){
      wx.setNavigationBarTitle({
        title: '新增客户'
      })
    }
    this.setData({
      type:type
    })
  },
  onShow: function () {
    console.log('onShow')
  },
  
  setTrueName: function(res){
    console.log(res)
    this.setData({
      'info.trueName': res.detail.value
    })
  },
  setPhone: function(res){
    this.setData({
      'info.phone': res.detail.value
    })
  },
  getType: function(res){
    this.setData({
      'info.customerType': res.detail.label.type
    })
  },
  getSex: function(res){
    this.setData({
      'info.sex': res.detail.label.type
    })
  },
  birthdayChange: function(res){
    console.log(res.detail.value)
    this.setData({
      'info.birthday': res.detail.value
    })
  },
  setSource: function(){
    let itemList = this.data.sourceList.map((res) => {
      return res.label;
    });
    wx.showActionSheet({
      itemList: itemList,
      success: (res) => {
        let index = res.tapIndex
        if (index === '' || index === null || index === undefined) return;
        this.setData({
          'info.source': index
        });
      },
      fail: (res) => {
        console.log(res.errMsg)
      }
    });
  },
  save: function(){
    // app.utils.showModel('绑定手机号', '请填写正确的图片验证码')
    // wx.showToast({
    //   title: '长度长度长度长度',
    //   image: '../../../images/error.png',
    //   mask: false
    // })
  }
})