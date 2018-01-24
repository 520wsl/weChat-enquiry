
var app = getApp();
var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');
Page({
  data: {
    params:{
        "allCount": 1,
        "enquireValue": 1,
        "followCount": 1,
        "gmvCount": 1,
        "lossCount": 1,
        "lossValue": 1,
        "totalValue": 1,
        "tranProportion": 1,
        "tranValue": 1
    },
    images: {
      totalValue: app.CDN + 'enquiry_1.png',
      tranValue: app.CDN + 'enquiry_2.png',
      enquireValue: app.CDN + 'enquiry_3.png',
      lossValue: app.CDN + 'enquiry_4.png',
      allCount:app.CDN + 'enquiry_count.png',
      gmvCount:app.CDN + 'enquiry_success.png',
      lossCount:app.CDN + 'enquiry_loss .png',
    },
    enquireName: {
      totalValue: '总金额',
      enquireValue: '跟单金额',
      tranValue: '成交金额',
      lossValue: '流失金额',
      allCount:'询盘总次数',
      lossCount:'垃圾询盘',
      gmvCount:'有效询盘'
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
      tranValue: '有效询盘',
    },
    current: 0,
    aa: 0.8,
    bb: 0.3,
    // 自定义canvas缩放比例
    width: 190,
    height: 190,
    r: 100,
    r1: 70,
    r2: 82
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
    console.log(this.data.current, this.data.aa);
    let a = this.data.aa;
    if (this.data.current == 0) {
      a = this.data.aa;
    } else {
      a = this.data.bb;
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
    // console.log(e.detail.current, this.data.aa);
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
