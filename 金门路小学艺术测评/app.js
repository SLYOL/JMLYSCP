//app.js

var http = require('model/request.js');

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  },

  globalData: {
    userInfo: null,
    name : 'Name',
    ID :'id',
    classArray:{},
    PORT:'https://www.hbe.ink:8443',
    // PORT:'http://192.168.8.112:8080',
    subject:'',
    emile:'',
    student:''

  },

  func:{
    myREQ: http.myREQ
  }
})