var PORT = getApp().globalData.PORT;
var greade = '';
var classID = '';
var greadeArray = [];
var classArray = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    greadeArray: [],
    classArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: PORT + '/CreditSystem/api',
      data: { 'flag': 'getallgradeid' },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        greadeArray = res.data.data;
        for (var i = 0; i < greadeArray.length; i++) {
          greadeArray[i] = { 'greadeName': greadeArray[i], 'greadeImage': '/image/cai-' + greadeArray[i] + '.png', 'selectImage': '/image/red-' + greadeArray[i] }
        }

        console.log(greadeArray);
        _this.setData({
          greadeArray: greadeArray
        })
      },
      fail: function (res) {
        console.log(res);

      },
      complete: function (res) {
        console.log(res);

      },
    })

    
  },
  touchSelectGreade: function (e) {
    console.log(e.target.dataset.index);
    console.log(greadeArray);
    var _this = this;
    for (var i = 0; i < greadeArray.length; i++) {

      if (i == e.target.dataset.index) {
        greadeArray[i] = { 'greadeName': greadeArray[i].greadeName, 'greadeImage': '/image/red-' + greadeArray[i].greadeName + '.png' }
        greade = greadeArray[i].greadeName;
        wx.request({
          url: PORT + '/CreditSystem/api',
          data: { 'flag': 'getallclassidbygradeid', 'gradeid': greadeArray[i].greadeName },
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            console.log(res);
            if (res.data.result == '1') {
              classArray = res.data.data;

              for (var j = 0; j < classArray.length; j++) {
                console.log('llll' + classArray[j]);
                classArray[j] = { 'className': classArray[j], 'classImage': '/image/cai-' + classArray[j] + '.png' };
              }
              _this.setData({
                classArray: classArray
              })
            }
          },
          fail: function (res) {
            console.log(res);

          },
          complete: function (res) {
            console.log(res);

          },
        })
      } else {
        greadeArray[i] = { 'greadeName': greadeArray[i].greadeName, 'greadeImage': '/image/cai-' + greadeArray[i].greadeName + '.png' }
      }
    }
    this.setData({
      greadeArray: greadeArray
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  touchSelectClass: function (e) {
    var _this = this;
    for (var i = 0; i < classArray.length; i++) {
      if (i == e.target.dataset.index) {

        classArray[i] = { 'className': classArray[i].className, 'classImage': '/image/red-' + classArray[i].className + '.png' };
        classID = classArray[i].className;
        console.log('greadeid' + greade + 'classId' + classID);
      } else {
        classArray[i] = { 'className': classArray[i].className, 'classImage': '/image/cai-' + classArray[i].className + '.png' };

      }
    }
    this.setData({
      classArray: classArray
    })
  },
  touchSave:function(){

    if (greade.length == 0) {
      wx.showModal({
        title: '错误提示',
        content: '请先选择年级',
        showCancel: false,
        confirmText: '确定',
      })
      return;
    }
      if(classID.length == 0) {
        wx.showModal({
          title: '错误提示',
          content: '请先选择班级',
          showCancel: false,
          confirmText: '确定',
        })
        return;
      }
    wx.showToast({
      title: '提交中',
      icon: 'loading',
      image: '',
      duration: 10000,
      mask: true,
      success: function (res) {

      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
      wx.request({
        url: PORT + '/CreditSystem/api',
        data: { 'flag': 'addteachertoclass', 'classid': classID, 'gradeid': greade, 'tid': getApp().globalData.tId, 'subject': getApp().globalData.subject},
        header: { "Content-Type": "application/x-www-form-urlencoded"},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log(res);
          if(res.data.result == '1'){
            wx.showToast({
              title: '成功',
              icon: 'success',
              image: '',
              duration: 1000,
              mask: true,
              success: function (res) {

              },
              fail: function (res) {

              },
              complete: function (res) {

              },
            })
          }else {

            
            wx.hideToast();
            wx.showModal({
              title: '异常',
              content: res.data.msg,
              showCancel: false,
              confirmText: '确定',
              confirmColor: '',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
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