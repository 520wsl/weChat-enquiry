// pages/enquiry/info/info.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{
            "aliTM": 1,
            "amount": 1,
            "list": [{
                "buyerIntention": 1,
                "cityId": 1,
                "gmtCreate": 1,
                "isWechat": 1,
                "noDealReason": 1,
                "num": 1,
                "peerBuy": 1,
                "peerName": 1,
                "peerPrice": 1,
                "phone": 1,
                "position": 1,
                "price": 1,
                "productName": 1,
                "remark": 1,
                "type": 1
            },
            {
                "buyerIntention": 1,
                "cityId": 1,
                "gmtCreate": 1,
                "isWechat": 1,
                "noDealReason": 1,
                "num": 1,
                "peerBuy": 1,
                "peerName": 1,
                "peerPrice": 1,
                "phone": 1,
                "position": 1,
                "price": 1,
                "productName": 1,
                "remark": 1,
                "type": 1
            }],
            "saleStatus": 1
        },        
    sleletUrl:"http://1.img.dianjiangla.com/enquiryAssets/icon_right.png",
    sleletUrlS:"http://1.img.dianjiangla.com/enquiryAssets/icon_top.png",
    number: 0,
  },
    slelet: function(e){
        
        if(this.number!=e.currentTarget.dataset.index){
            this.setData({sleletUrl:"http://1.img.dianjiangla.com/enquiryAssets/icon_top.png"})
            this.setData({
                number: e.currentTarget.dataset.index
            })
        }else{
            this.setData({sleletUrl:"http://1.img.dianjiangla.com/enquiryAssets/icon_right.png"})
            this.setData({
                number: 4
            })
        }  
    },
    // 请求接口
    getAjax() {
        this.getInfo() ;
    },
    // 获取详情
    getInfo() {
        app.get('/enquiry/listinfo', {
            buyerId: 1
          }).then(res => {
            console.log(res.data);
            this.setData({item: res.data});
          }).catch(res => {
            console.log(res);
          });
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // 请求接口
  this.getAjax();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})