// pages/customer/edit.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    info:{
      name: '',
      mobilePhone: '',
      type: null,
      company: '',
      position: '',
      wechat: '',
      account: '',
      birthday: null,
      sex: 0,
      mailbox: '',
      area: '',
      address: '',
      remark: '',
      source: null,
      level: 1,
      cooperateDate:'2018年06月22日',
      id: null
    },
    region: [0,0,0],
    areaArr: [],
    chooseAreaArr:[],
    chooseRegion: [0,0,0],
    endTime: app.time.formatTime(),
    type:'',
    btnDisableBool:true,
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
    ],
    getAreaArr:[]
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
    app.post('/common/area').then(res=>{
      if(res.status != 200){
        return;
      }
      this.setData({
        getAreaArr: res.data
      })
      let provinceList = []
      res.data.map(item=>{
        if(item.type ==1){
          provinceList.push(item)
        }
      })
      let cityList = []
      res.data.map(item=>{
        if (item.type == 2 && item.provinceId == provinceList[0].provinceId) {
          cityList.push(item)
        }
      })
      let countyList = []
      res.data.map(item => {
        if (item.type == 3 && item.cityId == cityList[0].cityId && item.provinceId == cityList[0].provinceId) {
          countyList.push(item)
        }
      })
      let arr = []
      arr[0] = provinceList
      arr[1] = cityList
      arr[2] = countyList
      this.setData({
        areaArr: arr,
        chooseAreaArr: arr
      })
    })
    if(type == 'add'){
      return;
    }
    if (query.customerId){
      app.post('/crm/customer/detail', { customerId: query.customerId}).then(res=>{
        if(res.status != 200){ return ;}
        let time = app.time.formatTime(res.data.gmtCreate).split('-')
        res.data.cooperateDate = time[0]+'年'+time[1]+'月'+time[2]+'日'
        this.setData({
          info: res.data
        })
        this.judgeInfo()
      })
    }
  },
  setName: function(res){
    this.setData({
      'info.name': res.detail.value
    })
    this.judgeInfo()
  },
  setPhone: function(res){
    this.setData({
      'info.mobilePhone': res.detail.value
    })
    this.judgeInfo()
  },
  getType: function(res){
    this.setData({
      'info.type': res.detail.label.type
    })
    this.judgeInfo()
  },
  getSex: function(res){
    this.setData({
      'info.sex': res.detail.label.type
    })
    this.judgeInfo()
  },
  setBirthday: function(res){
    this.setData({
      'info.birthday': res.detail.value
    })
    this.judgeInfo()
  },
  setCompany: function(res){
    this.setData({
      'info.company': res.detail.value
    })
    this.judgeInfo()
  },
  setPosition: function(res){
    this.setData({
      'info.position': res.detail.value
    })
    this.judgeInfo()
  },
  setWechat: function (res) {
    this.setData({
      'info.wechat': res.detail.value
    })
    this.judgeInfo()
  },
  setAccount: function (res) {
    this.setData({
      'info.account': res.detail.value
    })
    this.judgeInfo()
  },
  setMailbox: function (res) {
    this.setData({
      'info.mailbox': res.detail.value
    })
    this.judgeInfo()
  },
  setAddress: function (res) {
    this.setData({
      'info.address': res.detail.value
    })
    this.judgeInfo()
  },
  setRemark: function (res) {
    this.setData({
      'info.remark': res.detail.value
    })
    this.judgeInfo()
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
        this.judgeInfo()
      },
      fail: (res) => {
        console.log(res.errMsg)
      }
    });
  },
  bindAreaChange: function(res){
    let item ={}
    if(this.data.chooseAreaArr[2].length == 0){
      item = this.data.chooseAreaArr[1][this.data.chooseRegion[2]]
    } else {
      item = this.data.chooseAreaArr[2][this.data.chooseRegion[2]]
    }
    this.setData({
      region: this.data.chooseRegion,
      areaArr: this.data.chooseAreaArr,
      'info.provinceCode': item.provinceId,
      'info.areaCode': item.cityId,
      'info.cityCode': item.countyId
    })
  },
  cancelChange:function(res){
    this.setData({
      chooseRegion: this.data.region,
      chooseAreaArr: this.data.areaArr
    })
  },
  columnChange: function(res){
    let obj = this.data.chooseAreaArr[res.detail.column][res.detail.value]
    if (res.detail.column == 0){
      let cityList = []
      this.data.getAreaArr.map(item => {
        if (item.type == 2 && item.provinceId == obj.provinceId) {
          cityList.push(item)
        }
      })
      let countyList = []
      this.data.getAreaArr.map(item => {
        if (item.type == 3 && item.cityId == cityList[0].cityId && item.provinceId == cityList[0].provinceId) {
          countyList.push(item)
        }
      })
      let indexArr = this.data.chooseRegion
      indexArr[0] = res.detail.value
      indexArr[1] = 0
      indexArr[2] = 0
      this.setData({
        chooseRegion: indexArr
      })
      let arr = this.data.chooseAreaArr
      arr[1] = cityList
      arr[2] = countyList
      this.setData({
        chooseAreaArr: arr
      })
    } else if (res.detail.column == 1){
      let countyList = []
      let index = res.detail.value
      this.data.getAreaArr.map(item => {
        if (item.type == 3 && item.cityId == this.data.chooseAreaArr[1][index].cityId && item.provinceId == this.data.chooseAreaArr[1][index].provinceId) {
          countyList.push(item)
        }
      })
      let indexArr = []
      indexArr[0] = this.data.chooseRegion[0]
      indexArr[1] = res.detail.value
      indexArr[2] = 0
      this.setData({
        chooseRegion: indexArr
      })
      let arr = this.data.chooseAreaArr
      arr[2] = countyList
      this.setData({
        chooseAreaArr: arr
      })
    }
  },
  judgeInfo: function(){
    let item = this.data.info
    if (item.name === '' || item.mobilePhone === '' || item.type === null){
      this.setData({
        btnDisableBool: true
      })
    } else {
      if (this.data.type == 'add' && item.source === null) {
        this.setData({
          btnDisableBool: true
        })
      } else {
        this.setData({
          btnDisableBool: false
        })
      }
    }
  },
  save: function(){
    app.post('/crm/customer/edit',{...this.data.info}).then(res=>{
      if(res.status!==200){return;}

    })
  }
})