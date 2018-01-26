//获取应用实例
var app = getApp();
var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');

Page({
  data: {
    app: app,
    CDN: app.CDN,
    isobtain: 1,
    isPush: false,
    params: {
      keyword: '气缸密封圈',
      pageNum: '1',
      pageSize: '10',
      time: '2018-01',
      count: ''
    },
    list: []
  },
  getInfo() {
    app
      .get('/topbidder/pastlist', this.data.params)
      .then(e => {
        if (wx.hideLoading) {
          wx.hideLoading();
        }
        for (var i in e.data.data.list) {
          e.data.data.list[i].year = app.time.formatTime(e.data.data.list[i].addtime, 'YYYY年');
          e.data.data.list[i].month = app.time.formatTime(e.data.data.list[i].addtime, 'MM月');
        }
        if (this.data.isPush) {
          console.log(this.data.list.concat(e.data.data.list));
          this.setData({
            list: this.data.list.concat(...e.data.data.list),
            isPush: false,
            'params.count': e.data.data.count
          });
        } else {
          this.setData({
            list: e.data.data.list,
            isPush: false,
            'params.count': e.data.data.count
          });
        }
        console.log(this.data.list, 'getInfo');
      })
      .catch(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        }
        console.log(res);
      });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.data.params.pageNum = 1;
    if (wx.showLoading) {
      wx.showLoading({ title: '加载中...' });
    }
    this.getInfo(() => {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('onReachBottomonReachBottomonReachBottom');
    if (this.data.list.length < this.data.params.count) {
      this.data.params.pageNum++;
      this.data.isPush = true;
      if (wx.showLoading) {
        wx.showLoading({ title: '加载中...' });
      }
      this.getInfo();
    }
  },

  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('picker发送选择改变，携带值为', options);
    this.data.params.keyword = options.keyword;
    this.data.params.time = options.time;
    if (wx.showLoading) {
      wx.showLoading({ title: '加载中...' });
    }
    this.getInfo();
  },
  onReady: function() {}
});
