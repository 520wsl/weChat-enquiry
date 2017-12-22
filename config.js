/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'http://192.168.2.203:8082';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        // 数据接口 api
        apiUrl: `${host}`
    }
};

module.exports = config;
