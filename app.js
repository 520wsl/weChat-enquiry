//app.js
import { api, apiName } from '/utils/api';
import time from '/utils/time';
import utils from '/utils/utils';
import auth from '/utils/auth';
import configA from '/config';
import { Base64 } from '/utils/resources/base64.min.js';
const config = {
    onLaunch: function () {
        this.compatibleProcessing();
    },
    compatibleProcessing() {
        if (!wx.canIUse) {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
            return;
        }
        if (!wx.canIUse('request.success.header')) {
            wx.showModal({
                title: '提示2',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
    },
    apiName: apiName,
    time,
    utils,
    CDN: configA.service.imgUrl,
    ALI: configA.service.aliImgURL,
    ...auth,
    ...api,
    selectValueTime: '0',
    imgSizePro: configA.service.imgSizePro,
    imgSizeEnq: configA.service.imgSizeEnq,
    Base64,
    // 0: 全部消息通知 1: 询盘通知模板 2: 订单通知模板 3: 阿里活动通知模板 4: 放假通知模板 5: 诚信通到期通知模板 6: 知识维权通知模板
    logTypes: [
        { key: 0, str: '全部消息通知' },
        { key: 1, str: '最新订单信息提醒' },
        { key: 2, str: '订单通知' },
        { key: 3, str: '活动状态变更通知' },
        { key: 4, str: '服务到期提醒' },
        { key: 5, str: '诚信通到期通知' },
        { key: 6, str: '店铺违规通知' }
    ],
    // 发送状态0: 默认状态 1: 未读 2: 发送失败 3: 已读 4:已重发
    logStastus: [
        { key: 0, str: '' },
        { key: 1, str: '未读' },
        { key: 2, str: '发送失败' },
        { key: 3, str: '已读' },
        { key: 4, str: '已重发' }
    ]
}
// for (var name in api) {
//   config[name] = api[name]
// }
App(config)
