// pages/customer/searchlist.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    isShowSelect: false,
    params: {
      field: "", // 姓名/电话
      startTime: '', // 合作日期开始时间
      endTime: '', // 合作日期结束时间
      level: -1, // 0:普通会员；1:高级会员；2:vip会员；3:至尊会员
      type: -1, // 0其它；1淘宝采购商；2经销商；3微商；4外贸
      source: -1, // 0:默认；1线上；2线下
      pageNum: 1,
      pageSize: 16,
      tagId: "", // 标签
      companyId: ""
    },
    // 0:普通会员；1:高级会员；2:vip会员；3:至尊会员
    customerLevelLabel: ['普通会员', '高级会员', 'vip会员', '至尊会员'],
    // 0其它；1淘宝采购商；2经销商；3微商；4外贸
    customerTypeLabel: ['其他', '淘宝采购商', '经销商', '微商', '外贸'],
    list: [],
    msgStr: '',
    isDisable: false,
    isshowFooter: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('keyword',options)
    let field = options.keyword || ''
    this.setData({
        'params.field': field
    })
    this.getList();
  },
  getList(type) {
    wx.stopPullDownRefresh()
    app
      .post('/crm/customer/list', {
        ...this.data.params
      })
      .then(res => {
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
          this.setData({
            msgStr: '抱歉!没有找到符合条件的记录'
          })
          return;
        }
        if (res.status !== 200) {
          this.setData({
            msgStr: '抱歉!没有找到符合条件的记录'
          })
          app.utils.showModel('获取客户列表数据', res.msg);
          return;
        }
        let list = []
        let old = this.data.list;
        if (type == 'push') {
          old.push(...res.data.list)
          list = old
        } else {
          list = res.data && res.data.list || [];
        }

        var index = 0
        list = list.map(function(i) {
          i.index = index
          if (index < 4) {
            index = index + 1
          } else {
            index = 0
          }
          return i
        })

        let isDisable = true;
        this.setData({
          list,
          count: res.data.count,
          isshowFooter: false,
          msgStr: '抱歉!没有找到符合条件的记录',
          isDisable
        })

      })
      .catch(res => {
        this.setData({
          msgStr: '抱歉!没有找到符合条件的记录'
        })
        console.log('获取消息列表数据', res)
      })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      'params.pageNum': 1,
      list: []
    })
    this.getList('down');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('wxlog-触底')
    if (this.data.list.length < this.data.count) {
      this.data.params.pageNum++;
      this.getList('push');
    }
    if (!this.data.isshowFooter) {
      this.setShowFooter();
    }
  },
  setShowFooter() {
    this.setData({
      isshowFooter: true
    })
  },
})