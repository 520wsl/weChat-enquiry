//获取应用实例
var app = getApp()

var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');


Page({
    data: {
      listData: [
        { text: 'a', type: 'a' },
        { text: 'b', type: 'b' },
        { text: 'c', type: 'c' },
      ],
      index:0,
      status:{'a':'竞拍中', 'b':'已中标', 'c':'未中标'},
      screening:{'a':'洗面奶', 'b':'洗发水', 'c':'沐浴露'},
      dateValue:['洗面奶', '洗发水', '沐浴露', '洗发水', '沐浴露', '洗发水', '沐浴露', '洗发水', '沐浴露']
    },

    drawCircle: function () {
      clearInterval(varName);
      function drawArc(s, e) {
        ctx.setFillStyle('white');
        ctx.clearRect(0, 0, 200, 200);
        ctx.draw();
        var x = 100, y = 100, radius = 96;
        ctx.setLineWidth(5);
        ctx.setStrokeStyle('#76FBF6');
        ctx.setLineCap('round');
        ctx.beginPath();
        ctx.arc(x, y, radius, s, e, false);
        ctx.stroke()
        ctx.draw()
      }
      var step = 1, startAngle = 1.5 * Math.PI, endAngle = 0;
      var animation_interval = 10, n = 60;
      var animation = function () {
        if (step <= n) {
          endAngle = step * 0.6 * 2 * Math.PI / n + 1.5 * Math.PI;
          drawArc(startAngle, endAngle);
          step++;
        } else {
          clearInterval(varName);
        }
      };
      varName = setInterval(animation, animation_interval);
    },
  


    onLoad: function(options) {
      // 页面初始化 options为页面跳转所带来的参数
      console.log('picker发送选择改变，携带值为',options.status)
    },
    onReady: function () {
      //创建并返回绘图上下文context对象。
      var cxt_arc = wx.createCanvasContext('canvasCircle');
      cxt_arc.setLineWidth(6);
      cxt_arc.setStrokeStyle('#eaeaea');
      cxt_arc.setLineCap('round');
      cxt_arc.beginPath();
      cxt_arc.arc(100, 100, 96, 0, 2 * Math.PI, false);
      cxt_arc.stroke();
      cxt_arc.draw();
      this.drawCircle();
    },
  
    datePickerBindchange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value,this.data)
      this.setData({
        index: e.detail.value
      })
    }
  });