import moment from '../utils/resources/moment.min.js';
/**
 * @Title: 时间处理-工具类提供一些便捷地工具服务
 * @Author: Mad Dragon 【 395548460@qq.com 】
 * @Date: 2017/11/22 22:00
 * @Version V2.0.2
 *
 * =====================================================================
 * @Description: 工具索引
 *     1、isRefundOrder 根据订单状态 判断 是否是退款单
 *     2、formatAddTime 时间 加法 并 格式化时间
 *     3、formatSubtractTime 时间 减法 并 格式化时间
 *     4、formatInitTime 格式化 初始 时间
 * ============================================================================
 */

let util = {};
/**
 * @Title: 1、格式化时间
 * @Author: Mad Dragon 【 395548460@qq.com 】
 * @Date: 2017/11/22 20:33
 * @Version V2.0.2
 *
 * @param time 需要格式化时间  默认当前时间
 * @param norms 格式化规则 默认 YYYY-MM-DD
 *
 * @Description:
 */
util.formatTime = function (time = new Date(), norms = 'YYYY-MM-DD') {
    return (time && moment(time).format(norms)) || '';
};

/**
 * @Title: 2、时间 加法 并 格式化时间
 * @Author: Mad Dragon 【 395548460@qq.com 】
 * @Date: 2017/11/22 20:33
 * @Version V2.0.2
 *
 * @param time 需要格式化时间  默认当前时间
 * @param norms 格式化规则 默认 YYYY-MM-DD
 * @param addNum 加数
 * @param addNorms 加法规则 默认 'days'
 *
 * @Description:
 */
util.formatAddTime = function (time = new Date(), norms = 'YYYY-MM-DD', addNum = 1, addNorms = 'days') {
    return (time && moment(time).add(addNum, addNorms).format(norms)) || '';
};

/**
 * @Title: 3、时间 减法 并 格式化时间
 * @Author: Mad Dragon 【 395548460@qq.com 】
 * @Date: 2017/11/23 16:28
 * @Version V2.0.2
 *
 * @param time 需要格式化时间  默认当前时间
 * @param norms 格式化规则 默认 YYYY-MM-DD
 * @param addNum 减数
 * @param addNorms 减法规则 默认 'days'
 *
 * @Description:
 */
util.formatSubtractTime = function (addNum = 1, addNorms = 'days', time = new Date(), norms = 'YYYY-MM-DD') {
    return (time && moment(time).subtract(addNum, addNorms).format(norms)) || '';
};

/**
 * @Title: 4、格式化 初始 时间
 * @Author: Mad Dragon 【 395548460@qq.com 】
 * @Date: 2017/11/24 13:59
 * @Version V2.0.2
 *
 * @param time 初始时间
 * @param norms 时间格式化规则
 * @return string 2017-11-24
 *
 * @Description:
 */
util.formatInitTime = function (time = new Date(), norms = 'YYYY-MM-DD') {
    return (time && moment(time).format(norms)) || '';
};

util.startTime = function (time = new Date(), norms = 'YYYY-MM-DD') {
    return (util.formatInitTime(time) && moment(util.formatInitTime(time)).format(norms)) || '';
};

util.endTime = function (time = new Date(), norms = 'YYYY-MM-DD', addNum = 1, addNorms = 'days') {
    return (util.formatInitTime(time) && moment(util.formatInitTime(time)).add(addNum, addNorms).format(norms)) || '';
};

/**
 * 获取时间期限
 * n 时间段 p 时间类型 norms 时间格式
 * 例如 n:1 p:weeks norms:YYYY-MM-DD HH:mm:ss
 */
util.getTimeLimit = function (n = 0, p = 'days', norms = 'YYYY-MM-DD HH:mm:ss'){
  return util.startTime(moment().subtract(n, p).format(norms), 'x');
}

// export default util;
module.exports = util