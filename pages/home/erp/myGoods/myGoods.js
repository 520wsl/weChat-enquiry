// pages/home/erp/myGoods/myGoods.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CDN: app.CDN,
        pageType: 1,
        list: [],
        params: {
            pageNum: 1,
            pageSize: 10,
            count: 0
        }
    },
    // 设置选项卡值
    setPageType(e) {
        let pageType = e.currentTarget.dataset && e.currentTarget.dataset.pagetype || 0;
        this.setData({
            pageType: pageType
        })
    },
    // 获取商品列表数据
    getList() {
        if (wx.showLoading) {
            wx.showLoading({ title: '加载中...' });
        }
        app
            .get('/product/list', this.data.params)
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
                        }
                    });
                    if (wx.hideLoading) {
                        wx.hideLoading();
                    }
                    return;
                }
                if (res.status !== 200) {
                    app.utils.showModel('获取商品列表数据', res.msg);
                    if (wx.hideLoading) {
                        wx.hideLoading();
                    }
                    return;
                }
                this.setData({
                    'list': res.data.productList
                })

                if (wx.hideLoading) {
                    wx.hideLoading();
                }
            })
            .catch(res => {
                console.log('获取商品列表数据', res)
            })
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

    }
})