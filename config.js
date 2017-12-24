/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
// var host = 'http://172.30.34.41:8082';
// var host = 'http://172.30.34.3:8082';
var host = 'http://dev.xp.yumc.pw/api';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        imgUrl: 'http://1.img.dianjiangla.com/enquiryAssets/',
        // 数据接口 api
        apiUrl: `${host}`
    }
};

module.exports = config;
