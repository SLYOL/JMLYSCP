var studentArray = [];
var greadeId = '';
var classId = '';
var eid = '';
var hidden = false;
var event = '10';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentArray: [],
    hidden: hidden,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    hidden = false;
    greadeId = options.greadeID;
    classId = options.classID;
    studentArray = JSON.parse(options.studentArray);
    for (var i = 0; i < studentArray.length; i++) {
      studentArray[i].img = getApp().globalData.PORT + '/CreditSystem' + studentArray[i].img;
    }

    console.log(studentArray);
    console.log('greadeID=' + options.greadeID);
    console.log('classID=' + options.classID);
    this.setData({
      studentArray: studentArray,
      hidden: hidden,


    })

  },
  //放大缩略图
  touchImage: function (e) {

    console.log(e);
    var imageArray = [];
    for (var i = 0; i < studentArray.length; i++) {
      imageArray[i] = studentArray[i].img;

    }
    var index = e.target.dataset.index;
    console.log('index' + index);

    wx.previewImage({
      current: imageArray[index], // 当前显示图片的http链接  
      urls: imageArray // 需要预览的图片http链接列表  
    })

  },
  //点击了加分
  touchAdd: function (e) {
    console.log('加分');
    wx.showLoading({
      title: '加分中',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    var index = e.target.dataset.index;
    var student = studentArray[index];
    console.log(student.eid);
    console.log(getApp().globalData.ID);
    var that = this;

    wx.request({
      url: getApp().globalData.PORT + '/CreditSystem/api',
      data: { 'flag': 'authevent', 'eid': student.eid, 'tid': getApp().globalData.ID, 'auth': '1', 'event': event },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        if (res.data.result == '1') {

          that.unAudit();

        } else {
          wx.hideLoading();

          wx.showModal({
            title: '错误异常',
            showCancel: false,
            content: res.data.msg,
            confirmText: '确定',
            confirmColor: '',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }

      },
      fail: function (res) { },
      complete: function (res) { },
    })



  },
  //点击了忽略
  touchPass: function (e) {
    console.log('忽略');
    var index = e.target.dataset.index;
    console.log('加分');
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    var index = e.target.dataset.index;
    var student = studentArray[index];
    console.log(student.eid);
    console.log(getApp().globalData.ID);
    var that = this;

    wx.request({
      url: getApp().globalData.PORT + '/CreditSystem/api',
      data: { 'flag': 'authevent', 'eid': student.eid, 'tid': getApp().globalData.ID, 'auth': '-1', 'event': event },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        if (res.data.result == '1') {

          that.unAudit();

        } else {
          wx.hideLoading();

          wx.showModal({
            title: '错误异常',
            showCancel: false,
            content: res.data.msg,
            confirmText: '确定',
            confirmColor: '',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }

      },
      fail: function (res) { },
      complete: function (res) { },
    })



  },

  //点击了未审核
  unAudit: function () {
    hidden = false;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    console.log('点击了未审核')
    console.log('greadeId=' + greadeId)
    console.log('classId=' + classId)

    var _this = this;
    wx.request({
      url: getApp().globalData.PORT + '/CreditSystem/api',
      data: { 'flag': 'getnotauthedeventsbyclass', 'gradeid': greadeId, 'classid': classId, 'event': event },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);

        console.log(res.data.result);

        if (res.data.result == '1') {
          console.log('获取未审核列表成功');
          wx.showToast({
            title: '加载完成',
            icon: 'success',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })

          //  studentArray = [];

          studentArray = res.data.data;
          for (var i = 0; i < studentArray.length; i++) {
            studentArray[i].img = getApp().globalData.PORT + '/CreditSystem' + studentArray[i].img;
          }
          _this.setData({
            studentArray: studentArray,
            hidden: hidden,

          })
        } else {
          wx.showModal({
            title: '错误提示',
            content: res.data.msg,
            showCancel: false,
            confirmText: '确定',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })

        }
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: res.errMsg,
          showCancel: false,
          confirmText: '确定',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      complete: function (res) {

      },
    })


  },
  //点击了审核
  audit: function () {
    hidden = true;
    console.log('点击了审核');
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    var _this = this;
    wx.request({
      url: getApp().globalData.PORT + '/CreditSystem/api',
      data: { 'flag': 'getauthedeventsbyclass', 'gradeid': greadeId, 'classid': classId, 'event': event },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);

        console.log(res.data.result);

        if (res.data.result == '1') {
          console.log('获取审核列表成功');
          wx.showToast({
            title: '加载完成',
            icon: 'success',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          studentArray = res.data.data;
          for (var i = 0; i < studentArray.length; i++) {
            studentArray[i].img = getApp().globalData.PORT + '/CreditSystem' + studentArray[i].img;
            if (studentArray[i].state == '1') {
              studentArray[i].state = true;
            } else {
              studentArray[i].state = false;
            }
          }
          _this.setData({
            studentArray: studentArray,
            hidden: hidden,

          })
        } else {
          wx.showModal({
            title: '错误提示',
            content: res.data.msg,
            showCancel: false,
            confirmText: '确定',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })

        }
      },
      fail: function (res) {

        wx.showModal({
          title: '错误提示',
          content: res.errMsg,
          showCancel: false,
          confirmText: '确定',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      complete: function (res) {

      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})