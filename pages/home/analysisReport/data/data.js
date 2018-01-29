// pages/home/analysisReport/data/data.js
import echarts from "../../../../utils/resources/wxcharts.js";
const app = getApp();
let columnChart = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CDN: app.CDN,
        titles: ['询盘地区', '询盘总数', '总金额', '询盘占比'],
        tabList: [
            {
                allAmount: '1000',
                enquiryCount: '4165',
                gmvAmount: '500',
                gmvPercent: 10,
                province: '浙江'
            },
            {
                allAmount: '1000',
                enquiryCount: '4165',
                gmvAmount: '500',
                gmvPercent: 20,
                province: '杭州'
            },
            {
                allAmount: '1000',
                enquiryCount: '4165',
                gmvAmount: '500',
                gmvPercent: 20,
                province: '温州'
            },
            {
                allAmount: '1000',
                enquiryCount: '4165',
                gmvAmount: '500',
                gmvPercent: 20,
                province: '义乌义乌义乌义乌义乌义乌义乌义乌义乌义乌义乌义乌义乌'
            },
            {
                allAmount: '1000',
                enquiryCount: '4165',
                gmvAmount: '500',
                gmvPercent: 30,
                province: '浙江浙江浙江浙江'
            },
            {
                allAmount: '1000',
                enquiryCount: '4165',
                gmvAmount: '500',
                gmvPercent: 30,
                province: '浙江浙江浙江浙江'
            },
            {
                allAmount: '1000',
                enquiryCount: '4165',
                gmvAmount: '500',
                gmvPercent: 30,
                province: '浙江浙江浙江浙江'
            },
            {
                allAmount: '1000',
                enquiryCount: '4165',
                gmvAmount: '500',
                gmvPercent: 30,
                province: '浙江浙江浙江浙江'
            }
        ],
        params: {
            orderType: 0,
            reportId: 0
        }
    },
    // 询盘报告分析-数据分析-区域分布与排行统计
    getStatisticsArea() {
        app
            .get('/report/statistics/area', this.data.params)
            .then(res => {
                if (res.status == 401) {
                    wx.showModal({
                        title: '提示',
                        content: '登录超时或未登录，请重新登录',
                        success: res => {
                            if (res.confirm) {
                                app.reset();
                                wx.switchTab({
                                    url: '/pages/personal/personal'
                                });
                                return;
                            }
                            if (res.cancel) {
                            }
                        }
                    });
                    return;
                }
                if (res.status !== 200) {
                    return;
                }
                console.log(res)
            })
            .catch(res => {
                console.log(res)
            })
    },
    //选择传入信息
    selectReport(e) {
        // console.log(e.detail.params);
        // let tittle = String(e.detail.params.reportName);
        // wx.setNavigationBarTitle({
        //     title: tittle
        // })
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
        this.getEcharts(this.data.tabList);
    },

    // 图表
    getEcharts(series) {
        let colorType = ['#00DACE', '#33CC82', '#FFC444', '#F88133', '#F56364'];
        let cache = [...series].filter((item, index) => {
            item.number = index;
            if (item.value != 0) {
                return true;
            }
        });
        let newSeries = cache.map((item, index) => {
            return {
                name: item.province,
                data: item.gmvPercent,
                color: colorType[item.number % 10],
                format: function (val) {
                    return item.gmvPercent + '% ';
                }
            }
        });
        console.log(newSeries);

        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth - 30;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        columnChart = new echarts({
            canvasId: 'firstCanvas',
            type: 'ring',
            animation: true,
            legend: true,
            series: newSeries,
            width: windowWidth,
            height: windowWidth * 340 / 375,
            dataLabel: true,
            disablePieStroke: false
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getStatisticsArea();
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