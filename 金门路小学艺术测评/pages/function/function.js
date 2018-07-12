var title;
var greadeId;
var classId;
var PORT = getApp().globalData.PORT;
var subject = getApp().globalData.subject;
var greadArray =[];

Page({

  /**
   * 页面的初始数据
   */

  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    title = options.title;
    console.log('所选班级' + title);

    greadeId = title.substring(0,1);
    console.log('所选年级id' + greadeId);
    classId = title.substring(3, 4);
    console.log('所选班级id' + classId);
    wx.setNavigationBarTitle({
      title: title,
    })
    this.setData({
     
    })
    
   
    
  },
  //考勤
  touchKQ:function(){

    console.log('port' + PORT + 'greadeId' + greadeId + 'classid' + classId);
    wx.request({
      url: PORT +'/CreditSystem/api',
      data: { 'flag': 'getstudentsbyclass', 'gradeid': greadeId,'classid':classId},
      header: { "Content-Type": "application/x-www-form-urlencoded"},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if(res.data.result=='1'){
          console.log('获取学生信息成功');
          console.log(res);
          for (var i = 0; i < res.data.data.length; i ++){
           
            res.data.data[i] =
              { 'sid': res.data.data[i].sid, 'spassword': res.data.data[i].spassword, 'sname': res.data.data[i].sname, 'scredit': res.data.data[i].scredit, 'sex': res.data.data[i].sex, 'color': 'black','backgroundcolor':'white'}
          }
          wx.navigateTo({
            url: '/pages/function/kq?studentArray=' + JSON.stringify(res.data.data) +'&title='+ title,
          })
        }
        
      },
      fail: function(res) {
        console.log(res);

      },
      complete: function(res) {
        console.log(res);

      },
    })

   

  },
  //课堂参与
  touchKTCY:function(){
    console.log('port' + PORT + 'greadeId' + greadeId + 'classid' + classId);
    wx.request({
      url: PORT + '/CreditSystem/api',
      data: { 'flag': 'getstudentsbyclass', 'gradeid': greadeId, 'classid': classId },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.result == '1') {
          console.log('获取学生信息成功' + res.data.data);

          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i] =
              { 'sid': res.data.data[i].sid, 'spassword': res.data.data[i].spassword, 'sname': res.data.data[i].sname, 'scredit': res.data.data[i].scredit, 'sex': res.data.data[i].sex, 'color': 'black', 'backgroundcolor': 'white' }
          }
          // var studentArray = res.data.data;
          wx.navigateTo({
            url: '/pages/function/ktcy?studentArray=' + JSON.stringify(res.data.data) + '&title=' + title,
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
  },
  //作业完成
  touchHomeWork: function () {
    console.log('port' + PORT + 'greadeId' + greadeId + 'classid' + classId);
    wx.request({
      url: PORT + '/CreditSystem/api',
      data: { 'flag': 'getstudentsbyclass', 'gradeid': greadeId, 'classid': classId },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.result == '1') {
          console.log('获取学生信息成功' + res.data.data);

          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i] =
              { 'sid': res.data.data[i].sid, 'spassword': res.data.data[i].spassword, 'sname': res.data.data[i].sname, 'scredit': res.data.data[i].scredit, 'sex': res.data.data[i].sex, 'color': 'black', 'backgroundcolor': 'white' }
          }
          // var studentArray = res.data.data;
          wx.navigateTo({
            url: '/pages/function/homeWork?studentArray=' + JSON.stringify(res.data.data) + '&title=' + title,
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
    // wx.navigateTo({
    //   url: '/pages/function/homeWork',
    // })
  },
  //社团、小组
  touchSQXZ: function () {


    wx.request({
      url: PORT +'/CreditSystem/api',
      data: { 'flag': 'getallgradeid'},
      header: { "Content-Type": "application/x-www-form-urlencoded"},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        greadArray = res.data.data;
        for (var i = 0; i < greadArray.length;i++){
          greadArray[i] = { 'greadeName': greadArray[i], 'greadeImage': '/image/cai-' + greadArray[i] + '.png', 'selectImage': '/image/红-' + greadArray[i]}
        }

        wx.navigateTo({
          url: '/pages/function/sqxz?greadeArray=' + JSON.stringify(greadArray),
        })
        console.log(greadArray);

      },
      fail: function(res) {
        console.log(res);

      },
      complete: function(res) {
        console.log(res);

      },
    })


    
  },
  //文艺活动
  touchWYHD: function () {

    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

    wx.request({
      url: PORT +'/CreditSystem/api',
      data: { 'flag': 'getnotauthedeventsbyclass', 'gradeid': greadeId,'classid':classId,'event':'5'},
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);

        console.log(res.data.result);

        if(res.data.result == '1'){
          console.log('获取未审核列表成功');
          wx.hideLoading();

          var studentArray = [];
          studentArray  = res.data.data;
          wx.navigateTo({
            url: '/pages/function/wyhd?studentArray=' + JSON.stringify(studentArray) + '&greadeID=' + greadeId + '&classID='+classId,
          })

        }else {
          wx.showModal({
            title: '错误提示',
            content: res.data.errMsg,
            showCancel: false,
            confirmText: '确定',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })

        }
      },
      fail: function(res) {

      },
      complete: function(res) {

      },
    })


  },
  //专业笔试
  touchZTBS: function () {
    console.log('点击了专业笔试');

    console.log('port' + PORT + 'greadeId' + greadeId + 'classid' + classId);
    console.log('subjectZHBS'+subject);
    wx.request({
      url: PORT + '/CreditSystem/api',
      data: { 'flag': 'getstudentsbyclass', 'gradeid': greadeId, 'classid': classId },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.result == '1') {
          console.log('获取学生信息成功' + res.data.data);

          for (var i = 0; i < res.data.data.length; i++) {
            var zybs;
            if (subject == 'music') {
              zybs = res.data.data[i].e6;
            }else {
              zybs = res.data.data[i].e7;

            }
            res.data.data[i] =
              { 'sid': res.data.data[i].sid, 'spassword': res.data.data[i].spassword, 'sname': res.data.data[i].sname, 'scredit': res.data.data[i].scredit, 'sex': res.data.data[i].sex, 'color': 'black', 'backgroundcolor': 'white', 'ZYBS': zybs}
          }
          // var studentArray = res.data.data;
          wx.navigateTo({
            url: '/pages/function/ztbs?studentArray=' + JSON.stringify(res.data.data) + '&title=' + title,
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
    
  },
  //专业技能
  touchZYJN: function () {
    console.log('点击了专业技能');
    console.log('port' + PORT + 'greadeId' + greadeId + 'classid' + classId);
    wx.request({
      url: PORT + '/CreditSystem/api',
      data: { 'flag': 'getstudentsbyclass', 'gradeid': greadeId, 'classid': classId },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);

        if (res.data.result == '1') {
          console.log('获取学生信息成功' + res.data.data);

          for (var i = 0; i < res.data.data.length; i++) {
            var zybs = res.data.data[i].e8
            // if (subject == 'music') {
            //   zybs = res.data.data[i].e6;
            // } else {
            //   zybs = res.data.data[i].e7;

            // }
            res.data.data[i] =
              { 'sid': res.data.data[i].sid, 'spassword': res.data.data[i].spassword, 'sname': res.data.data[i].sname, 'scredit': res.data.data[i].scredit, 'sex': res.data.data[i].sex, 'color': 'black', 'backgroundcolor': 'white', 'ZYBS': zybs }
          }
          
          wx.navigateTo({
            url: '/pages/function/zyjn?studentArray=' + JSON.stringify(res.data.data) + '&title=' + title,
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
   
  },
  //艺术学习
  touchYSXX: function () {
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    wx.request({
      url: PORT + '/CreditSystem/api',
      data: { 'flag': 'getnotauthedeventsbyclass', 'gradeid': greadeId, 'classid': classId, 'event': '9' },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);

        console.log(res.data.result);

        if (res.data.result == '1') {
          console.log('获取未审核列表成功');
          wx.hideLoading();

          var studentArray = [];
          studentArray = res.data.data;
          wx.navigateTo({
            url: '/pages/function/ysxx?studentArray=' + JSON.stringify(studentArray) + '&greadeID=' + greadeId + '&classID=' + classId,
          })

        } else {
          wx.showModal({
            title: '错误提示',
            content: res.data.errMsg,
            showCancel: false,
            confirmText: '确定',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })

        }
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
   
  },
  //艺术实践
  touchYSSJ: function () {
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    wx.request({
      url: PORT + '/CreditSystem/api',
      data: { 'flag': 'getnotauthedeventsbyclass', 'gradeid': greadeId, 'classid': classId, 'event': '10' },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);

        console.log(res.data.result);

        if (res.data.result == '1') {
          console.log('获取未审核列表成功');
          wx.hideLoading();

          var studentArray = [];
          studentArray = res.data.data;
          wx.navigateTo({
            url: '/pages/function/yssj?studentArray=' + JSON.stringify(studentArray) + '&greadeID=' + greadeId + '&classID=' + classId,
          })

        } else {
          wx.showModal({
            title: '错误提示',
            content: res.data.errMsg,
            showCancel: false,
            confirmText: '确定',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })

        }
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
    
  },
  //获奖荣誉
  touchHJRY: function () {
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    wx.request({
      url: PORT + '/CreditSystem/api',
      data: { 'flag': 'getnotauthedeventsbyclass', 'gradeid': greadeId, 'classid': classId, 'event': '11' },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);

        console.log(res.data.result);

        if (res.data.result == '1') {
          console.log('获取未审核列表成功');
          wx.hideLoading();

          var studentArray = [];
          studentArray = res.data.data;
          wx.navigateTo({
            url: '/pages/function/hjry?studentArray=' + JSON.stringify(studentArray) + '&greadeID=' + greadeId + '&classID=' + classId,
          })

        } else {
          wx.showModal({
            title: '错误提示',
            content: res.data.errMsg,
            showCancel: false,
            confirmText: '确定',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })

        }
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
   
  },
  touchExport:function(){
    wx.showLoading({
      title: '发送中',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.request({
      url: PORT+'/CreditSystem/api',
      data: { 'flag': 'sendemail', 'classid': classId, 'gradeid': greadeId, 'tid': getApp().globalData.ID},
      header: { "Content-Type": "application/x-www-form-urlencoded"},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);
        wx.hideLoading();

        if (res.data.result == '1'){
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            image: '',
            duration: 1000,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }else {
          wx.showModal({
            title: '发送失败',
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
      fail: function(res) {
        wx.hideLoading();
        wx.showModal({
          title: '发送失败',
          content: res.errMsg,
          showCancel: false,
          confirmText: '确定',
          confirmColor: '',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      complete: function(res) {},
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