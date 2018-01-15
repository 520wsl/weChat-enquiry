// pages/home/hasRecord/hasRecord.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CDN: app.CDN,
        list: [],
        count: 0,
        isSelectTime: false,
        S: {
            typeList: [
                { key: '1', title: 'PC' },
                { key: '2', title: '无线' },
                { key: '1,2', title: 'PC和无线' }
            ]
        },
        params: {
            endTime: '',
            pageNum: 1,
            pageSize: 10,
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
        this.data.params.pageNum = 1;
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
        this.data.params.pageNum = 1;
        this.setData({
            list: []
        })
        this.getList();
        console.log('页面相关事件处理函数--监听用户下拉动作')
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log('触底')
        if (this.data.list.length < this.data.count) {
            this.data.params.pageNum++;
            this.getList('isPush');
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
      return {
        title: '四喜E伙伴',
        path: '/pages/home/hasRecord/hasRecord'
      }
    },
    getList: function (addType) {
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
                    wx.stopPullDownRefresh();
                    return;
                }
                if (res.status != 200 || res.data == null) {
                    wx.stopPullDownRefresh();
                    return;
                }
                let listData = this.data.list;
                console.log(listData)

                if (addType == 'isPush') {
                    listData.push(...res.data.list);
                    console.log('isPush', addType, res.data.list, listData)
                } else {
                    listData = res.data.list;
                }

                console.log(addType)
                console.log(listData)
                listData.map((e) => {
                    e.typeName = this.getArrTitle(this.data.S.typeList, e.type);
                    e.finalprice = e.finalprice || 0;
                    e.money = e.money || 0;
                    e.startprice = e.startprice || 0;
                    e.flow = e.flow || 0;
                });
                this.setData({
                    list: listData,
                    count: res.data.count
                })
                wx.stopPullDownRefresh();
            })


    },
    getArrTitle: function (arr = [], key = "") {
        let title = '';
        if (key == undefined || key == null) {
            return '';
        }
        arr.map(function (e) {
            if (e.key == key) {
                title = e.title;
            }
        });
        return title;
    }
})