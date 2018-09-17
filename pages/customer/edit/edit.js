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
      type: 5,
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
      cooperateDate:'',
      id: null
    },
    region: [0,0,0],
    areaArr: [],
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
    let type = query.type || 'add'
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
      
    })
    if(type == 'add'){
      return;
    }
    if (query.customerId){
      app.post('/crm/customer/detail', { customerId: query.customerId}).then(res=>{
        if(res.status != 200){ return ;}
        let time = app.time.formatTime(res.data.gmtCreate).split('-')
        res.data.birthday = app.time.formatTime(res.data.birthday)
        res.data.cooperateDate = time[0]+'年'+time[1]+'月'+time[2]+'日'
        let getAreaArr = this.data.getAreaArr
        let region = this.data.region
        let provinceList = []
        getAreaArr.map((item, index) => {
          if (item.type == 1) {
            provinceList.push(item)
            console.log(res.data.provinceCode, item.provinceId)
            if (res.data.provinceCode != null && item.provinceId == res.data.provinceCode) {
              region[0] = provinceList.length - 1
            }
          }
        })
        let cityList = []
        getAreaArr.map((item, index) => {
          if (res.data.areaCode != null) {
            if (item.type == 2 && item.provinceId == res.data.provinceCode) {
              cityList.push(item)
              if (item.cityId == res.data.areaCode) {
                region[1] = cityList.length - 1
              }
            }
          } else {
            if (item.type == 2 && item.provinceId == provinceList[0].provinceId) {
              cityList.push(item)
            }
          }
        })
        let countyList = []
        getAreaArr.map((item, index) => {
          if (res.data.cityCode != null) {
            if (item.type == 3 && item.cityId == res.data.areaCode && item.provinceId == res.data.provinceCode) {
              countyList.push(item)
              if (res.data.cityCode == item.countyId) {
                region[2] = countyList.length - 1
              }
            }
          } else {
            if (item.type == 3 && item.cityId == cityList[0].cityId && item.provinceId == cityList[0].provinceId) {
              countyList.push(item)
            }
          }
        })
        let arr = []
        arr[0] = provinceList
        arr[1] = cityList
        arr[2] = countyList
        this.setData({
          areaArr: arr,
          region: region
        })
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
    if (this.data.areaArr[2].length == 0){
      item = this.data.areaArr[1][this.data.region[2]]
    } else {
      item = this.data.areaArr[2][this.data.region[2]]
    }
    this.setData({
      'info.provinceCode': item.provinceId,
      'info.areaCode': item.cityId,
      'info.cityCode': item.countyId
    })
  },
  columnChange: function(res){
    let obj = this.data.areaArr[res.detail.column][res.detail.value]
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
      let indexArr = this.data.region
      indexArr[0] = res.detail.value
      indexArr[1] = 0
      indexArr[2] = 0
      let arr = this.data.areaArr
      arr[1] = cityList
      arr[2] = countyList
      this.setData({
        areaArr: arr,
        region: indexArr
      })
    } else if (res.detail.column == 1){
      let countyList = []
      let index = res.detail.value
      this.data.getAreaArr.map(item => {
        if (item.type == 3 && item.cityId == this.data.areaArr[1][index].cityId && item.provinceId == this.data.areaArr[1][index].provinceId) {
          countyList.push(item)
        }
      })
      let indexArr = []
      indexArr[0] = this.data.region[0]
      indexArr[1] = res.detail.value
      indexArr[2] = 0
      let arr = this.data.areaArr
      arr[2] = countyList
      this.setData({
        areaArr: arr,
        region: indexArr
      })
    } else if (res.detail.column == 2){
      let indexArr = []
      indexArr[0] = this.data.region[0]
      indexArr[1] = this.data.region[1]
      indexArr[2] = res.detail.value
      this.setData({
        region: indexArr
      })
    }
  },
  judgeInfo: function(){
    let item = this.data.info
    if (item.name === '' || item.mobilePhone === '' || item.type === 5){
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
  rest: function(){
    let info= {
      name: '',
      mobilePhone: '',
      type: 5,
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
      cooperateDate: '',
      id: null
    }
    let region= [0, 0, 0]
    let areaArr= []
    let endTime= app.time.formatTime()
    let type= ''
    let btnDisableBool= true
    this.setData({
      btnDisableBool: btnDisableBool,
      type: type,
      endTime: endTime,
      areaArr: areaArr,
      region: region,
      info: info
    })
  },
  saveInfo: function(){
    app.post('/crm/customer/edit',{...this.data.info}).then(res=>{
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
      if (res.status !== 200) {
        app.utils.showModel('添加/修改客户', res.msg);
        this.rest();
        return;
      }
      wx.switchTab({
        url: '/pages/customer/customer'
      });
    })
  }
})