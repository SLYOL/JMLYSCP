var studentArray;
var title;
var sendArray = [];
var PORT = getApp().globalData.PORT;
var subject = getApp().globalData.subject;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentArray: [],
    title: '',
    key: '',
    color: ''
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
    if (studentArray[index].color == 'black') {
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

    var isSelect = false;

    for (var i = 0; i < sendArray.length; i++) {

      if (sendArray[i]) {
        isSelect = true;
      }
    }

    if (!isSelect){
      wx.showModal({
        title: '错误提示',
        content: '请先选择学生',
        showCancel: false,
        confirmText: '确定',
      })
      return;
    }

    var subject = getApp().globalData.subject;
    var isFrist = true;
    var sid = '';
    var _this = this;
    console.log('总共有' + sendArray.length + '个学生提交');
    console.log('sendArray' + sendArray);

    for (var i = 0; i < sendArray.length; i++) {

      if (sendArray[i]) {
        console.log(sendArray[i].sname + '因课堂参与度不高，扣1分');
        if (isFrist) {
          sid = sendArray[i].sid;
          isFrist = false;
        } else {
          sid = sid + '|' + sendArray[i].sid;
        }

      } else {

      }

    }
    console.log('sid' + sid);
    console.log('subject' + subject);
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
      data: {
        'flag': 'addeventbygroup',
        'sids': sid,
        'event': '2',
        'subject': subject,
        'credit': '-1',
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        if (res.data.data.length == 0) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            image: '',
            duration: 1000,
            mask: true,
            success: function (res) {
              for (var i = 0; i < sendArray.length; i++) {
                if (sendArray[i]) {
                  console.log('修改成绩的学生有:' + sendArray[i].sname);
                  studentArray[i].backgroundcolor = 'white';
                  studentArray[i].color = 'yellowgreen';

                }
              }
              _this.setData({
                studentArray: studentArray,
              })
              sendArray = [];},
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {

        }
      },
      fail: function (res) {
        console.log('SHSHSHSHHHS');
        console.log(res);

      },
      complete: function (res) {
        console.log(res);
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