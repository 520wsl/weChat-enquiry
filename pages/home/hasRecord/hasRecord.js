// pages/home/hasRecord/hasRecord.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CDN: app.CDN,
        list: [],
        isSelectTime: false,
        S: {
            typeList: ['', 'PC', '无线', 'PC和无线']
        },
        params: {
            endTime: '',
            pageNum: 1,
            pageSize: 15,
            startTime: ''
        },

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
        if (app.enquiryTime) {
            console.log(app.enquiryTime)
            let time = app.enquiryTime;

            // 设置时间
            this.setData({
                'params.startTime': app.time.formatInitTime(time.startTime, 'YYYY-MM'),
                'params.endTime': app.time.endTime(time.endTime, 'YYYY-MM')
            });

        }
        if (this.data.params.startTime || this.data.params.endTime) {
            this.setData({
                'isSelectTime': true
            })
        }
        this.getList();
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
    getList: function () {
        let params = { ...this.data.params }
        app
            .get('/topbidder/list', params)
            .then(res => {
                // console.log(res)
                if (res.status == 401) {
                    wx.showModal({
                        title: '提示',
                        content: '登录超时或未登录，请重新登录',
                        success: res => {
                            if (res.confirm) {
                                app.reset();
                                wx.switchTab({
                                    url: '/pages/personal/personal'
                                })
                            } else if (res.cancel) {
                            }
                        }
                    })
                    return;
                }
                if (res.status != 200) {
                    return;
                }
                let list = res.data.list;

                list.map((e) => {
                    e.typeName = this.data.S.typeList[e.type];
                    e.finalprice = e.finalprice || 0;
                    e.money = e.money || 0;
                    e.startprice = e.startprice || 0;
                    e.flow = e.flow || 0;
                });
                this.setData({
                    list: list
                })

            })


    }
})