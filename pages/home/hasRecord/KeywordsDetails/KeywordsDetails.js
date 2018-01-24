//获取应用实例
var app = getApp()

var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');


Page({
    data: {
    },

    onLoad: function(options) {
      // 页面初始化 options为页面跳转所带来的参数
      console.log('picker发送选择改变，携带值为',options.status)
    },
    onReady: function () {
    },
  
  });