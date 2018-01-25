//获取应用实例
var app = getApp();
var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');

Page({
  data: {
    CDN: app.CDN,
    isobtain:1,
    params:{
      keyword:'气缸密封圈',
      pageNum:'1',
      pageSize:'',
      time:'2018-01',
    },
    list:[
      {
        "flow": 1,
        "heat": 1,
        "money": 1,
        "startprice": 1,
        "type": 1,
        "addtime": "2018-03",
        "dealcompany": "生生世世是",
        "finalprice": "33",
        "id": 10410,
        "isobtain": "0",
        "keyword": "气缸密封圈",
        "wfirstid": 1878
    },
    {
        "flow": 1,
        "heat": 1,
        "money": 1,
        "startprice": 1,
        "type": 1,
        "addtime": "2018-02",
        "dealcompany": "生生世世是",
        "finalprice": "33",
        "id": 10403,
        "isobtain": "1",
        "keyword": "气缸密封圈",
        "wfirstid": 1878
    },
    {
        "flow": 1,
        "heat": 1,
        "money": 1,
        "startprice": 1,
        "type": 1,
        "addtime": "2018-01",
        "dealcompany": "生生世世是",
        "finalprice": "33",
        "id": 10407,
        "isobtain": "0",
        "keyword": "气缸密封圈",
        "wfirstid": 1878
    }
    ]
  },
  getInfo() {
    console.log(app.time.formatTime('2017-01', 'YYYY年'),app.time.formatTime('2017-01', 'MM月'));
    app
    .get('/topbidder/pastlist',this.data.params)
    .then(e => {
      console.log(e.data,'getInfo');
    })
    .catch(res => {
      console.log(res);
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.params.pageNum = 1;
    this.getInfo(() => {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.params.pageNum++;
    this.getInfo();
    // if(this.data.list.length < this.data.params.count){
    //   this.data.params.pageNum++;
    //   this.getInfo();
    // }
  },


  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('picker发送选择改变，携带值为', options.status);
    
  },
  onReady: function() {}
});
