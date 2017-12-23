var config = require('../config')

/**
 * 组装接口完整的路径名称
 * @param {接口名称 /app/index/recommend} urlName 
 */
var apiName = function (urlName = '') {
    return config.service.apiUrl + urlName || '';
}

/**
 * 接口调用
 * @param {接口路径} url
 * @param {接口的参数} data
 */
var api = {
    cookie: '',
    setCookie: (respone) => {
        if (respone.header['Set-Cookie']) {
            api.cookie = respone.header['Set-Cookie'];
        }
    },
    request: function () {
        var method = arguments[0];
        var url = arguments[1];
        var data = arguments[2];

        return new Promise(function (resolve, reject) {
            wx.request({
                url: apiName(url),
                method: method.toUpperCase(),
                data: data,
                dataType: "json",
                header: {
                    // 'content-type': 'application/x-www-form-urlencoded',
                    'Cookie': api.cookie || ''
                },
                success: function (e) {
                    api.setCookie(e);
                    resolve(e.data);
                },
                fail: function (e) {
                    reject(e.data);
                }
            })
        });
    }
}

let like = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch'];

like.forEach(method => {
    api[method] = function () {
        return api.request(method, ...arguments);
    };
});

export {
    api,
    apiName
}