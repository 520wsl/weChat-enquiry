// pages/home/analysisReport/data/data.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        titles: ['询盘地区', '询盘总数', '总金额', '询盘占比'],
        tabList:[
            {
                allAmount:'1000',
                enquiryCount:'4165',
                gmvAmount:'500',
                gmvPercent:'65',
                province:'浙江'
            },
            {
                allAmount: '1000',
                enquiryCount: '4165',
                gmvAmount: '500',
                gmvPercent: '65',
                province: '杭州'
            },
            {
                allAmount: '1000',
                enquiryCount: '4165',
                gmvAmount: '500',
                gmvPercent: '65',
                province: '温州'
            },
            {
                allAmount: '1000',
                enquiryCount: '4165',
                gmvAmount: '500',
                gmvPercent: '65',
                province: '义乌'
            },
            {
                allAmount: '1000',
                enquiryCount: '4165',
                gmvAmount: '500',
                gmvPercent: '65',
                province: '浙江'
            }
        ]
    },
    //选择传入reportId
    selectReport(e) {
        console.log(e.detail.reportId);
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
        // 使用 wx.createContext 获取绘图上下文 context
        var context = wx.createCanvasContext('firstCanvas')

        context.setStrokeStyle("#00ff00")
        context.setLineWidth(5)
        context.rect(0, 0, 200, 200)
        context.stroke()
        context.setStrokeStyle("#ff0000")
        context.setLineWidth(2)
        context.moveTo(160, 100)
        context.arc(100, 100, 60, 0, 2 * Math.PI, true)
        context.moveTo(140, 100)
        context.arc(100, 100, 40, 0, Math.PI, false)
        context.moveTo(85, 80)
        context.arc(80, 80, 5, 0, 2 * Math.PI, true)
        context.moveTo(125, 80)
        context.arc(120, 80, 5, 0, 2 * Math.PI, true)
        context.stroke()
        context.draw()

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

    },
    getEcharts(){
        
    }
})