var app = getApp;

var util = require('../../model/util.js');
var accountF = '';
var passWordF = '';
var PORT = getApp().globalData.PORT;
// var classArray;
Page({

  /**
   * 页面的初始数据
   */

  
  data: {
    userName:'',
    passWord:'',
    // classArray:['aaa','bbb']
  },
  //background-image: url('https://lg-n0r2iyru-1256892062.cos.ap-shanghai.myqcloud.com/background.png');background-size:cover
  formSubmit:function (e) {
    var account = e.detail.value.account;
    var passWord = e.detail.value.userPWD;
    var that = this;
    console.log('账号是' + e.detail.value.account);
    // e.detail.value.account = '11111';
//判断账号是否为空
    if (util.trim(account) == ""){
      console.log("账号为空");
      
      wx.showModal({
        title: '错误',
        content: '账号不能为空',
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      })
      return;  
    }
//判断密码是否为空   
    if(util.trim(passWord) == ""){
      wx.showModal({
        title: '错误',
        content: '密码不能为空',
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      })
      return;  

    }
//判断是否记住了密码
    var isRememberPWD = wx.getStorageSync('LOGIN');
    if (isRememberPWD == '1') {
      console.log('用户记住了密码');
      wx.setStorageSync('userName', account);
      wx.setStorageSync('passWord', passWord);

    } else {
      console.log('用户没有记住了密码');
      wx.setStorageSync('userName', '');
      wx.setStorageSync('passWord', '');
    }
//提交登录信息
    wx.request({
      url: PORT +'/CreditSystem/api',
      data: { 'flag': 'login', 'tid': account, 'tpassword': passWord},
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data.result);
        if (res.data.result == '1'){
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            image: '',
            duration: 1000,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
          if(res.data.data.tid){
            console.log('老师登录成功');
            var a = app.g
            // wx.setStorageSync(app.globalData.TEACHERNAME, res.data.data.tname);
            getApp().globalData.tname = res.data.data.tname;
            getApp().globalData.ID = res.data.data.tid;
            getApp().globalData.subject = res.data.data.subject;
            getApp().globalData.emile = res.data.data.mailaddr;
            console.log('iiiiidddd' + getApp().globalData.subject);
            wx.request({
              url: PORT + '/CreditSystem/api',
              data: { 'flag': 'getclassbyteacher', 'tid': getApp().globalData.ID},
              header: { "Content-Type": "application/x-www-form-urlencoded"},
              method: 'GET',
              dataType: 'json',
              responseType: 'text',
              success: function(res) {
                console.log('获取班级列表成功');
                console.log(res);
                console.log(res.data.data);

                var classArray = [];
                var classIdArray = [];

                
                for (var index in res.data.data){
                  console.log(res.data.data[index].id.gradeid + '年级' + res.data.data[index].id.classid+'班');
                  var strName = [res.data.data[index].id.gradeid + '年级' + res.data.data[index].id.classid + '班'];
                
                  classArray = classArray.concat([{ 'name': strName, 'gradeid': res.data.data[index].id.gradeid, 'classid': res.data.data[index].id.classid, 'value': index}]);
                  classIdArray = classIdArray.concat()

                }

                // console.log('xxx'+JSON.stringify(this.data.classArray));
                wx.navigateTo({
                  url: '/pages/index/index?classArray=' + JSON.stringify(classArray),
                })

              },
              fail: function(res) {

              },
              complete: function(res) {

              },
            })

           
          }else {
            console.log('学生登录成功');
            console.log(res);

            getApp().globalData.name = res.data.data.sname;
            getApp().globalData.ID = res.data.data.sid;
            getApp().globalData.student = res.data.data;
            wx.navigateTo({
              url: '/pages/index/StudentIndex',
            })

          }

        }else {
          //提示错误信息
          var mes = res.data.msg;
          wx.showModal({
            title: '错误',
            content: mes,
            showCancel: false, //不显示取消按钮
            confirmText: '确定'
          })
        }
      },
      fail: function(res) {
        var mes = res.errMsg;
        wx.showModal({
          title: '异常',
          content: mes,
          showCancel: false, //不显示取消按钮
          confirmText: '确定'
        })
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      },
    })
   
  },
//记录单选按钮的状态
  radioChange:function(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    if (e.detail.value==1){
        console.log('xxxxx');
        wx.setStorageSync('LOGIN', '1');

    }else {
      wx.setStorageSync('LOGIN', '0');
        console.log('yyyyy');
      
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var isRememberPWD = wx.getStorageSync('LOGIN');

    if (isRememberPWD=='1'){
      console.log('用户记住了密码');

      accountF = wx.getStorageSync('userName');
      passWordF = wx.getStorageSync('passWord');
      
      
      this.setData({
        account: accountF,
        userPWD: passWordF,
        checked:true
      })

    }else {
      console.log('用户没有记住了密码');

    }

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
