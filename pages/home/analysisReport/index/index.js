var app = getApp();
var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');
Page({
  data: {
    params: {
      allAmount: 1,
      allAmountCount: 1,
      effective: 1,
      effectivePercent: 10,
      enquiryCount: 1,
      followAmount: 1,
      followAmountCount: 1,
      garbage: 1,
      gmvAmount: 1,
      gmvAmountCount: 1,
      gmvPercent: 22,
      lossAmount: 1,
      lossAmountCount: 1
    },
    images: {
      totalValue: app.CDN + 'enquiry_1.png',
      tranValue: app.CDN + 'enquiry_2.png',
      enquireValue: app.CDN + 'enquiry_3.png',
      lossValue: app.CDN + 'enquiry_4.png',
      allCount: app.CDN + 'enquiry_count.png',
      gmvCount: app.CDN + 'enquiry_success.png',
      lossCount: app.CDN + 'enquiry_loss .png'
    },
    enquireName: {
      totalValue: '总金额',
      enquireValue: '跟单金额',
      tranValue: '成交金额',
      lossValue: '流失金额',
      allCount: '询盘总次数',
      lossCount: '垃圾询盘',
      gmvCount: '有效询盘'
    },
    enquiryType: {
      totalValue: 1,
      tranValue: 2,
      enquireValue: 3,
      lossValue: 4
    },
    enquireuse: {
      totalValue: '询盘总次数',
      enquireValue: '垃圾询盘',
      tranValue: '有效询盘'
    },
    reportId: 111,
    reportName: '2018年1月',
    current: 0,
    // 自定义canvas缩放比例
    width: 190,
    height: 190,
    r: 100,
    r1: 70,
    r2: 82
  },
  //选择传入reportId
  selectReport(e) {
    console.log(e);
    this.setData({
      reportId: e.detail.params.reportId,
      reportName: e.detail.params.reportName
    });
    wx.setNavigationBarTitle({
      title: e.detail.params.reportName + '询盘分析报告'
    });
    console.log(e.detail.params.reportId, e.detail.params.reportName);
  },
  //获取分析报告列表
  getList() {
    app
      .get('/report/detail')
      .then(e => {
        console.log(e.data);
      })
      .catch(res => {
        console.log(res);
      });
  },
  drawCircle: function() {
    let that = this;
    console.log(that.data);
    clearInterval(varName);
    function drawArc(s, e) {
      ctx.setFillStyle('white');
      ctx.clearRect(0, 0, 2 * that.data.r, 2 * that.data.r);
      ctx.draw();
      var x = that.data.r,
        y = that.data.r,
        radius = that.data.r1;
      ctx.setLineWidth(5);
      ctx.setStrokeStyle('#76FBF6');
      ctx.setLineCap('round');
      ctx.beginPath();
      ctx.arc(x, y, radius, s, e, false);
      ctx.stroke();
      ctx.draw();
    }
    var step = 1,
      startAngle = 1.5 * Math.PI,
      endAngle = 0;
    var animation_interval = 10,
      n = 60;
    let a = this.data.params.gmvPercent / 100;
    if (this.data.current == 0) {
      a = this.data.params.gmvPercent / 100;
    } else {
      a = this.data.params.effectivePercent / 100;
    }
    var animation = function() {
      if (step <= n) {
        endAngle = step * a * 2 * Math.PI / n + 1.5 * Math.PI;
        drawArc(startAngle, endAngle);
        step++;
      } else {
        clearInterval(varName);
      }
    };
    varName = setInterval(animation, animation_interval);
  },
  currentChange: function(e) {
    this.setData({
      current: e.detail.current
    });
    this.drawCircle();
  },

  onReady: function() {
    //进度条
    var cxt_arc = wx.createCanvasContext('canvasCircle');
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#81C6F6');
    cxt_arc.setLineCap('round');
    cxt_arc.beginPath();
    cxt_arc.arc(this.data.r, this.data.r, this.data.r1, 0, 2 * Math.PI, false);
    cxt_arc.stroke();
    cxt_arc.draw();
    // 外线
    var cxt_arcs = wx.createCanvasContext('canvasCircles');
    cxt_arcs.setLineWidth(0.3);
    cxt_arcs.setStrokeStyle('rgba(255, 255, 255, 0.2)');
    cxt_arcs.setLineCap('round');
    cxt_arcs.beginPath();
    cxt_arcs.arc(this.data.r, this.data.r, this.data.r2, 0, 2 * Math.PI, false);
    cxt_arcs.stroke();
    cxt_arcs.draw();
    // 百分比
    this.drawCircle();
  },
  onLoad: function(options) {
    let that = this;
    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高
      success: function(res) {
        var widths = res.windowWidth;
        var heights = res.windowHeight;
        that.setData({
          width: 190 / 414 * widths,
          height: 190 / 414 * heights,
          r: 100 / 414 * widths,
          r1: 70 / 414 * widths,
          r2: 82 / 414 * widths
        });
      }
    });
  }
});
