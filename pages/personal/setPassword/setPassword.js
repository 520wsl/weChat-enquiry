// pages/personal/setPassword/setPassword.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CDN: app.CDN,
        yzm: '',
        isShowPwd: false,
        isEdit: false,
        params: {
            aliAccount: "",
            password: '',
            verificationCode: ''
        }
    },
    setPwd() {
        let isShowPwd = !this.data.isShowPwd
        console.log(isShowPwd)
        this.setData({
            isShowPwd: isShowPwd
        })
    },
    setIsEdit() {
        let isEdit = !this.data.isEdit
        this.setYzm();
        this.setData({
            isEdit: isEdit
        })
    },
    setPasswordData: function(res) {
        console.log(res.detail.value)
        this.setData({
            "params.password": res.detail.value
        })
    },
    setVerificationCode: function(res) {
        console.log(res.detail.value)
        this.setData({
            "params.verificationCode": res.detail.value
        })
    },
    // 重置
    reset() {
        this.setYzm();
        this.getInfo();
        this.setData({
            "params.verificationCode": ""
        })
    },
    // 获取图片验证码
    setYzm: function() {
        app.download(app.apiName('/auth/verifycode') + '?time=' + app.time.formatTime(new Date(), 'x')).then(path => {
            this.setData({
                yzm: path
            })
        })

        // console.log(app.time.formatTime(new Date(), 'x'))
    },
    verifyBindphone: function() {
        let params = { ...this.data.params
        };
        if (!params.password || params.password.length < 6) {
            app.utils.showModel('设置店铺账号密码', '请填写正确的店铺登陆密码! ')
            return;
        }
        if (!params.verificationCode) {
            app.utils.showModel('设置店铺账号密码', '请填写正确的图片验证码')
            this.setYzm();
            return;
        }
        this.setPassword();
    },
    // 更新旺旺密码
    setPassword() {
        let params = {
            ...this.data.params
        };
        console.log(params)
        app
            .post('/enquiry/update/password', params)
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
                    app.utils.showModel('设置店铺账号密码', res.msg)
                    this.setYzm();
                    return;
                }
                app.utils.showModel('设置店铺账号密码', "密码设置成功！")
                this.setIsEdit()
            })
    },
    // 查询旺旺密码
    getInfo() {
        app
            .get('/enquiry/get/aliaccount/information')
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
                    app.utils.showModel('设置店铺账号密码', res.msg)
                    return;
                }
                this.setData({
                    "params.aliAccount": res.data.aliAccount,
                    "params.password": res.data.password
                })
            })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getInfo();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})