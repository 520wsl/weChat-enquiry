//app.js
import api from '/utils/api';
import time from '/utils/time';
import utils from '/utils/utils';
App({
    onLaunch: function () {
        this.ifcheckSession()
    },
    // 1、判断登录是否过期
    ifcheckSession: function () {
        console.log('1、判断登录是否过期')
        wx.checkSession({
            success: res => {
                //1-1、session 未过期，并且在本生命周期一直有效
                console.log('1-true、session 未过期，并且在本生命周期一直有效')
                this.getUserInfo();
            },
            fail: res => {
                //1-2、登录态过期
                console.log('1-flase、登录态过期')
                this.login(); //重新登录
            }
        })
    },
    // 1.1、 小程序登录 获取code
    login: function () {
        console.log('1.1、 小程序登录 获取code')
        wx.login({
            success: res => {
                if (!res.code) {
                    utils.showModel('用户登录', '登录失败:' + res.errMsg)
                    console.log('1.1-flase、获取用户登录态失败！' + res.errMsg)
                    return;
                }
                //发起网络请求
                this.authorize(res.code)
            }
        });
    },
    // 1.2、 code 换取 openId 
    authorize: function (code) {
        console.log('1.2、 code 换取 openId,code:', code)
        api
            .post('/auth/authorize', { code: code })
            .then(res => {
                if (res.status !== 200) {
                    utils.showModel('用户授权', '授权失败:' + res.msg)
                    console.log('1.2-flase、获取openId失败！' + res.msg)
                    return;
                }
                this.getUserInfo();
            })
    },
    // 2、判断是否已经授权用户信息 userInfo
    // ifAuthUserInfo: function () {
    //     console.log('2、判断是否已经授权用户信息 userInfo')
    //     wx.getSetting({
    //         success: res => {
    //             if (res.authSetting['scope.userInfo']) {
    //                 console.log('2-flase、未授权 用户信息 ', res)
    //                 this.getUserInfo()
    //                 return;
    //             }
    //             console.log('已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框')
    //             this.getUserInfo()

    //         }
    //     })

    // },
    // 2、小程序 获取用户信息
    getUserInfo: function () {
        wx.getUserInfo({
            success: res => {
                console.log('2、小程序 获取用户信息', res)
                this.globalData.userInfo = res.userInfo
            },
            fail: res => {
                this.openSetting();
            }
        })
    },
    // 2.1、 调起客户端小程序设置界面
    openSetting: function () {
        console.log('2.1、 调起客户端小程序设置界面')

    },
    // 4、获取客户信息
    accountMy: function () {
        console.log('4、获取客户信息')
    },
    // 5、判断 是否绑定手机
    ifBindPhone: function () {
        console.log('5、判断 是否绑定手机')
    },
    // 5.1、 提示 是否绑定手机号
    showBindPhone: function () {
        console.log('5.1、 提示 是否绑定手机号')
    },
    // 6、判断是否选择公司
    ifBindCustome: function () {
        console.log('6、判断是否选择公司')
    },
    // 6.1 判断有几家客户
    customeNum: function () {
        console.log('6.1 判断有几家客户')
    },
    // 6.2 选择公司
    setcompany: function () {
        console.log('6.2 选择公司')
    },
    globalData: {
        userInfo: null
    },
    get: api.get,
    post: api.post,
    time,
    utils
})