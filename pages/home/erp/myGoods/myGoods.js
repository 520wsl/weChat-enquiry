// pages/home/erp/myGoods/myGoods.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CDN: app.CDN,
        pageType: 1
    },
    // 设置选项卡值
    setPageType(e) {
        let pageType = e.currentTarget.dataset && e.currentTarget.dataset.pagetype || 0;
        this.setData({
            pageType: pageType
        })
        // if (pageType == 2 && (this.data.product1.tabList.length <= 0 || this.data.product2.tabList.length <= 0)) {
        //     this.product1();
        //     this.product2();
        // }
        // if (pageType == 1 && (this.data.area1.tabList.length <= 0 || this.data.area1.tabList.length <= 0)) {
        //     this.getArea1();
        //     this.getArea2();
        // }
        // if (this.data.times.length <= 0) {
        //     this.getTimes();
        // }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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