var studentArray;
var title;
var sendArray = [];
var saveArray = [];
var PORT = getApp().globalData.PORT;
var subject = getApp().globalData.subject;
var value = '';
var value2 = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentArray: [],
    title: '',
    key: '',
    color: '',
    changeImage: '/image/批量-按钮.png',
    value: '',
    subject: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    studentArray = JSON.parse(options.studentArray);
    console.log('考勤' + options.title);
    title = options.title;

    console.log('总共获取到' + studentArray.length + '个学生');
    for (var i = 0; i < studentArray.length; i++) {
      console.log('学生颜色' + studentArray[i].color);

    }
    console.log('学生信息' + studentArray);
    this.setData({
      studentArray: studentArray,
      title: title
    })

  },
  touchStudent: function (e) {
    console.log(e);
    console.log(e.target.dataset.index);
    var index = e.target.dataset.index;
    if (studentArray[index].color == 'black' || studentArray[index].color == 'yellowgreen') {
      studentArray[index].color = 'white';
      studentArray[index].backgroundcolor = '#FC3D3D';
      console.log('name' + studentArray[index].sname);
      sendArray[index] = studentArray[index];


    } else {


      studentArray[index].color = 'black';
      studentArray[index].backgroundcolor = 'white';
      console.log('index' + index);
      sendArray[index] = '';
      console.log('总共有' + sendArray.length + '个学生提交');
      console.log('移除的学生名字是:' + sendArray[index].sname);


    }
    this.setData({
      key: index,
      studentArray: studentArray
    })

  },

  touchSave: function (e) {

    if (saveArray.length == 0) {
      wx.showModal({
        title: '错误提示',
        content: '没有选择学生或者没有点击确定',
        showCancel: false,
        confirmText: '确定',
      })
      return;
    }

    if (value2.length == 0) {
      wx.showModal({
        title: '错误提示',
        content: '没有输入成绩或者没有点击确定',
        showCancel: false,
        confirmText: '确定',
      })
      return;
    }

    var a = 0;//记录提交的总学生
    var b = 0;//记录返回的总学生
    var errorArray = [];//记录失败的学生
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
    console.log('总共有' + saveArray.length + '个学生提交');
    console.log('sendArray' + saveArray);

    for (var i = 0; i < saveArray.length; i++) {
      if (saveArray[i]) {
        a++;
        console.log('提交学生名字:' + saveArray[i].sname);

        wx.request({
          url: PORT + '/CreditSystem/api',
          data: {
            'flag': 'addevent',
            'sid': saveArray[i].sid,
            'event': '8',
            'subject': subject,
            'credit': saveArray[i].ZYBS,
            'detail': saveArray[i].sname + '专业技能成绩为:' + saveArray[i].ZYBS,
          },
          header: {
       
            "Content-Type": "application/x-www-form-urlencoded"

          },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            console.log(res);

            if (res.data.result == '1') {
              b++;

            } else {
              errorArray.push(res.data.data.sname);
              b++;
            }
            if (a == b) {
              if (errorArray.length == 0) {
                wx.showToast({
                  title: '全部提交成功',
                  icon: 'success',
                  image: '',
                  duration: 1000,
                  mask: true,
                  success: function (res) { },
                  fail: function (res) { },
                  complete: function (res) { },
                })
              } else {
                var errorMsg = '';
                for (var name in errorArray) {
                  errorMsg = errorMsg + name;
                }
                wx.showModal({
                  title: '错误',
                  content: errorMsg + '提交失败',
                  showCancel: false,
                  confirmText: '确定',
                })
              }
            }
          },
          fail: function (res) {
            console.log(res);
            errorArray.push(res.data.data.sname);
            if (a == b) {
              if (errorArray.length == 0) {
                wx.showToast({
                  title: '全部提交成功',
                  icon: 'success',
                  image: '',
                  duration: 1000,
                  mask: true,
                  success: function (res) { },
                  fail: function (res) { },
                  complete: function (res) { },
                })
              } else {
                var errorMsg = '';
                for (var name in errorArray) {
                  errorMsg = errorMsg + name;
                }
                wx.showModal({
                  title: '错误',
                  content: errorMsg + '提交失败',
                  showCancel: false,
                  confirmText: '确定',
                })
              }
            }

          },
          complete: function (res) {
            console.log(res);
          },
        })
      } else {

      }

    }

  },
  touchMoreChange: function (e) {
    console.log(e.target.dataset);
    if (value.length == 0) {
      wx.showModal({
        title: '错误提示',
        content: '没有输入成绩',
        showCancel: false,
        confirmText: '确定',
      })
      return;
    }
    value2 = value;
    console.log('学生成绩为' + value);

    for (var i = 0; i < sendArray.length; i++) {

      if (sendArray[i]) {
        console.log('修改成绩的学生有:' + sendArray[i].sname);
        saveArray[i] = sendArray[i];
        studentArray[i].backgroundcolor = 'white';
        studentArray[i].ZYBS = value;
        studentArray[i].color = 'yellowgreen';

      }
    }

    this.setData({
      studentArray: studentArray,
    })
    sendArray = [];

  },
  listionResult: function (e) {
    // console.log('当前输入的成绩为:' + e.detail.value);
    if (e.detail.value > 100) {
      value = 12.5;
      this.setData({
        value: 100
      })

    } else {
      value = (e.detail.value * 0.125).toFixed(2);
      // console.log('学生成绩为' + value);
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