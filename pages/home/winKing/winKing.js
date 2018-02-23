// pages/home/winKing/winKing.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CDN: app.CDN,
    fields: 'month',
    nowMonth:app.time.formatSubtractTime(1, 'month', new Date(), 'MM'),
    time: app.time.formatSubtractTime(1, 'month', new Date(), 'YYYY-MM'),
    defaultTime: {
      start: app.time.formatTime(new Date(), 'YYYY'), 
      end: app.time.formatSubtractTime(1, 'month', new Date(), 'YYYY-MM'),
    },
    isobtain:['未中标','已中标','竞拍中'],
    winKing:[]
  },
  getlistwinKing(){
    let tittle=String(this.data.time)+'标王记录';
    wx.setNavigationBarTitle({
      title: tittle
    })
    app
    .get('/topbidder/list',{time:this.data.time})
    .then(e => {
      if(e.status==200){
        this.setData({
          winKing: e.data
        });
      }else{
        console.log(e.msg);
      }
    })
    .catch(res => {
      console.log(res);
    });
  },
  showdetail(e){
    
console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getlistwinKing();
  },
  timeChange(e) {
    console.log(e);
    this.setData({
      time: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
