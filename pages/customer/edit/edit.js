// pages/customer/edit.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    info: {
      name: '',
      mobilePhone: '',
      type: 5,
      company: '',
      position: '',
      wechat: '',
      account: '',
      birthday: '',
      birthdayCode: '请选择客户生日',
      sex: 0,
      mailbox: '',
      area: '',
      address: '',
      remark: '',
      source: null,
      level: 0,
      cooperateDate: '',
      id: null
    },
    region: [0, 0, 0],
    areaArr: [],
    endTime: app.time.formatTime(),
    type: '',
    btnDisableBool: true,
    sourceList: [
      // {
      //   type: 0,
      //   label: '默认'
      // },
      {
        type: 1,
        label: '线上'
      },
      {
        type: 2,
        label: '线下'
      }
    ],
    getAreaArr: [],
    key: 'areaList',
    templateList: [{
        name: 'company',
        inputType: 'input',
        leftName: '公司',
        functionName: 'setCompany',
        maxlength: 30,
        value: ''
      },
      {
        name: 'position',
        leftName: '职位',
        functionName: 'setPosition',
        inputType: 'input',
        maxlength: 30,
        value: ''
      },
      {
        name: 'wechat',
        leftName: '微信号',
        functionName: 'setWechat',
        inputType: 'input',
        maxlength: 30,
        value: ''
      },
      {
        name: 'account',
        leftName: '旺旺号',
        functionName: 'setAccount',
        inputType: 'input',
        maxlength: 30,
        value: ''
      },
      {
        name: 'birthday',
        leftName: '生日',
        functionName: 'setBirthday',
        inputType: 'dataPicker',
        value: '',
        birthdayCode: '请选择客户生日',
        endTime: app.time.formatTime()
      },
      {
        name: 'sex',
        leftName: '性别',
        functionName: 'getSex',
        inputType: 'select',
        maxlength: 30,
        value: 0
      },
      {
        name: 'mailbox',
        leftName: '电子邮箱',
        functionName: 'setMailbox',
        inputType: 'input',
        maxlength: 30,
        value: ''
      },
      {
        name: 'areaCode',
        leftName: '公司',
        functionName: 'setPosition',
        inputType: 'addressPicker',
        maxlength: 30
      },
      {
        name: 'address',
        leftName: '详细地址',
        functionName: 'setAddress',
        inputType: 'textarea',
        maxlength: 30,
        value: ''
      },
      {
        name: 'remark',
        leftName: '备注',
        functionName: 'setRemark',
        inputType: 'textarea',
        maxlength: 200,
        value: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(query) {
    let type = query.type || 'add'
    if (type == 'edit') {
      wx.setNavigationBarTitle({
        title: '编辑客户信息'
      })
    } else if (type == 'add') {
      wx.setNavigationBarTitle({
        title: '新增客户'
      })
    }
    this.setData({
      type: type
    })
    let getAreaArr = []
    wx.getStorage({
      key: this.data.key,
      success: (res) => {
        getAreaArr = res.data
        this.setData({
          getAreaArr: getAreaArr
        })
        this.setAreaArr(type, query.customerId, getAreaArr)
      },
      fail: () => {
        app.post('/common/area').then(res => {
          if (res.status != 200) {
            app.utils.showModel('提示', '暂无省市区列表');
            return;
          }
          getAreaArr = res.data
          wx.setStorage({
            key: this.data.key,
            data: res.data
          })
          this.setData({
            getAreaArr: getAreaArr
          })
          this.setAreaArr(type, query.customerId, getAreaArr)
        })
      }
    })
  },
  setAreaArr: function(type, customerId, getAreaArr) {
    if (type == 'add') {
      let provinceList = [],
        cityList = [],
        countyList = [],
        arr = []
      getAreaArr.map((item, index) => {
        if (item.type == 1) {
          provinceList.push(item)
        }
      })
      getAreaArr.map((item, index) => {
        if (item.type == 2 && item.provinceId == provinceList[0].provinceId) {
          cityList.push(item)
        }
      })
      getAreaArr.map((item, index) => {
        if (item.type == 3 && item.cityId == cityList[0].cityId && item.provinceId == cityList[0].provinceId) {
          countyList.push(item)
        }
      })
      arr[0] = provinceList
      arr[1] = cityList
      arr[2] = countyList
      this.setData({
        areaArr: arr
      })
      return;
    }
    if (customerId) {
      app.post('/crm/customer/detail', {
        customerId: customerId
      }).then(res => {
        if (res.status != 200) {
          return;
        }
        res.data.cooperateDate = app.time.formatTime(res.data.gmtCreate, 'YYYY年MM月DD日')
        if (res.data.birthday == '' || res.data.birthday == null) {
          res.data.birthdayCode = '请选择用户生日'
        } else {
          res.data.birthdayCode = app.time.formatTime(res.data.birthday)
          res.data.birthday = app.time.formatTime(res.data.birthday)
        }
        let templateList = this.data.templateList,
          region = this.data.region,
          provinceList = [],
          cityList = [],
          countyList = [],
          arr = []
        templateList.forEach(item => {
          item.value = res.data[item.name]
          if (item.name == 'birthday') {
            item.birthdayCode = res.data.birthdayCode
            item.birthday = res.data.birthday
          }
        })
        this.setData({
          templateList: templateList
        })
        getAreaArr.map((item, index) => {
          if (item.type == 1) {
            provinceList.push(item)
            if (res.data.provinceCode != null && item.provinceId == res.data.provinceCode) {
              region[0] = provinceList.length - 1
            }
          }
        })
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
        arr[0] = provinceList
        arr[1] = cityList
        arr[2] = countyList
        this.setData({
          areaArr: arr,
          region: region,
          info: res.data
        })
        this.judgeInfo()
      })
    }
  },
  setTemplateList: function(str, value) {
    let templateList = this.data.templateList
    templateList.forEach(item => {
      if (str == 'birthday' && item.name == str) {
        item.birthday = value
        item.birthdayCode = value
      } else if (item.name == str) {
        item.value = value
      }
    })
    this.setData({
      templateList: templateList
    })
  },
  //将修改的值设置到Info中
  setName: function(res) {
    this.setData({
      'info.name': res.detail.value
    })
    this.judgeInfo()
  },
  setPhone: function(res) {
    this.setData({
      'info.mobilePhone': res.detail.value
    })
    this.judgeInfo()
  },
  getType: function(res) {
    this.setData({
      'info.type': res.detail.label.type
    })
    this.judgeInfo()
  },
  getSex: function(res) {
    this.setData({
      'info.sex': res.detail.label.type
    })
    this.setTemplateList('sex', res.detail.label.type)
    this.judgeInfo()
  },
  setBirthday: function(res) {
    console.log(res)
    this.setData({
      'info.birthday': res.detail.value,
      'info.birthdayCode': res.detail.value
    })
    this.setTemplateList('birthday', res.detail.value)
    this.judgeInfo()
  },
  setCompany: function(res) {
    this.setData({
      'info.company': res.detail.value
    })
    this.setTemplateList('company', res.detail.value)
    this.judgeInfo()
  },
  setPosition: function(res) {
    this.setData({
      'info.position': res.detail.value
    })
    this.setTemplateList('position', res.detail.value)
    this.judgeInfo()
  },
  setWechat: function(res) {
    this.setData({
      'info.wechat': res.detail.value
    })
    this.setTemplateList('wechat', res.detail.value)
    this.judgeInfo()
  },
  setAccount: function(res) {
    this.setData({
      'info.account': res.detail.value
    })
    this.setTemplateList('account', res.detail.value)
    this.judgeInfo()
  },
  setMailbox: function(res) {
    this.setData({
      'info.mailbox': res.detail.value
    })
    this.setTemplateList('mailbox', res.detail.value)
    this.judgeInfo()
  },
  setAddress: function(res) {
    this.setData({
      'info.address': res.detail.value
    })
    this.setTemplateList('address', res.detail.value)
    this.judgeInfo()
  },
  setRemark: function(res) {
    this.setData({
      'info.remark': res.detail.value
    })
    this.setTemplateList('remark', res.detail.value)
    this.judgeInfo()
  },
  setSource: function() {
    let itemList = this.data.sourceList.map((res) => {
      return res.label;
    });
    wx.showActionSheet({
      itemList: itemList,
      success: (res) => {
        let index = res.tapIndex
        if (index === '' || index === null || index === undefined) return;
        this.setData({
          'info.source': this.data.sourceList[index].type
        });
        this.judgeInfo()
      },
      fail: (res) => {
        console.log(res.errMsg)
      }
    });
  },
  // 省市区的value发生改变
  bindAreaChange: function(res) {
    let item = {}
    if (this.data.areaArr[2].length == 0) {
      item = this.data.areaArr[1][this.data.region[1]]
    } else {
      item = this.data.areaArr[2][this.data.region[2]]
    }
    this.setData({
      'info.provinceCode': item.provinceId,
      'info.areaCode': item.cityId,
      'info.cityCode': item.countyId
    })
  },
  // 省市区的某一列发生改变
  columnChange: function(res) {
    let obj = this.data.areaArr[res.detail.column][res.detail.value]
    if (res.detail.column == 0) {
      let cityList = [],
        countyList = [],
        indexArr = this.data.region,
        arr = this.data.areaArr
      this.data.getAreaArr.map(item => {
        if (item.type == 2 && item.provinceId == obj.provinceId) {
          cityList.push(item)
        }
      })
      this.data.getAreaArr.map(item => {
        if (item.type == 3 && item.cityId == cityList[0].cityId && item.provinceId == cityList[0].provinceId) {
          countyList.push(item)
        }
      })
      indexArr[0] = res.detail.value
      indexArr[1] = 0
      indexArr[2] = 0
      arr[1] = cityList
      arr[2] = countyList
      this.setData({
        areaArr: arr,
        region: indexArr
      })
    } else if (res.detail.column == 1) {
      let countyList = [],
        index = res.detail.value,
        indexArr = [],
        arr = this.data.areaArr
      this.data.getAreaArr.map(item => {
        if (item.type == 3 && item.cityId == this.data.areaArr[1][index].cityId && item.provinceId == this.data.areaArr[1][index].provinceId) {
          countyList.push(item)
        }
      })
      indexArr[0] = this.data.region[0]
      indexArr[1] = res.detail.value
      indexArr[2] = 0
      arr[2] = countyList
      this.setData({
        areaArr: arr,
        region: indexArr
      })
    } else if (res.detail.column == 2) {
      let indexArr = []
      indexArr[0] = this.data.region[0]
      indexArr[1] = this.data.region[1]
      indexArr[2] = res.detail.value
      this.setData({
        region: indexArr
      })
    }
    //将每次改变的值传到this.data.info中
    this.bindAreaChange()
  },
  // 判断必填信息是否填写
  judgeInfo: function() {
    let item = this.data.info
    if (item.name === '' || item.mobilePhone === '' || item.type === 5) {
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
  // 重置信息
  rest: function() {
    let info = {
      name: '',
      mobilePhone: '',
      type: 5,
      company: '',
      position: '',
      wechat: '',
      account: '',
      birthday: '',
      birthdayCode: '请选择客户生日',
      sex: 0,
      mailbox: '',
      area: '',
      address: '',
      remark: '',
      source: null,
      level: 0,
      cooperateDate: '',
      id: null
    },
      templateList = this.data.templateList,
      region = [0, 0, 0],
      areaArr = [],
      endTime = app.time.formatTime(),
      type = '',
      btnDisableBool = true
    templateList.forEach(item => {
      if (item.name == 'sex') {
        item.value = 0
      } else if (item.name == 'areaCode') {

      } else if (item.name == 'birthday') {
        item.birthdayCode = '请选择客户生日'
        item.birthday = ''
      } else {
        item.value = ''
      }
    })
    this.setData({
      btnDisableBool: btnDisableBool,
      type: type,
      endTime: endTime,
      areaArr: areaArr,
      region: region,
      info: info
    })
  },
  saveInfo: function() {
    let name = this.data.info.name.replace(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/g, '')
    if (name != '') {
      app.utils.showModel('提示', '客户姓名只能输入数字，英文和汉字！');
      return
    }
    app.post('/crm/customer/edit', { ...this.data.info
    }).then(res => {
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
        return;
      }
      this.rest();
      wx.navigateTo({
        url: '/pages/customer/customer'
      });
    })
  }
})