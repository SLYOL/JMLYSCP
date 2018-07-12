var greadeArray = [];
var PORT = getApp().globalData.PORT;
var classArray = [];
var greade = '';
var classID = '';
var studentArray;
var sendArray = [];
var saveArray = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    greadeArray:[],
    classArray:[],
    studentArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    greadeArray = JSON.parse(options.greadeArray);


    this.setData({
      greadeArray: greadeArray
    })    
    console.log('年级列表' + greadeArray);

  },


  touchSelectGreade:function(e){
    console.log(e.target.dataset.index);
    console.log(greadeArray);
    var _this = this;
    for (var i = 0; i < greadeArray.length; i ++) {

      if (i == e.target.dataset.index){
        greadeArray[i] = { 'greadeName': greadeArray[i].greadeName, 'greadeImage': '/image/red-' + greadeArray[i].greadeName + '.png'}
        greade = greadeArray[i].greadeName;
        wx.request({
          url: PORT + '/CreditSystem/api',
          data: { 'flag': 'getallclassidbygradeid', 'gradeid': greadeArray[i].greadeName},
          header: { "Content-Type": "application/x-www-form-urlencoded"},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            console.log(res);
            if (res.data.result == '1'){
              classArray = res.data.data;

              for (var j = 0; j < classArray.length;j++){
                console.log('llll'+classArray[j]);
                classArray[j] = { 'className': classArray[j], 'classImage': '/image/cai-' + classArray[j]+'.png'};
              }
              _this.setData({
                classArray: classArray
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
      }else {
        greadeArray[i] = { 'greadeName': greadeArray[i].greadeName, 'greadeImage': '/image/cai-' + greadeArray[i].greadeName + '.png' }
      }
    }
    this.setData({
      greadeArray: greadeArray
    })

  },
  touchSelectClass:function(e){
    var _this = this;
    for (var i = 0; i < classArray.length; i++) {
      if (i == e.target.dataset.index) {

        classArray[i] = { 'className': classArray[i].className, 'classImage': '/image/red-' + classArray[i].className + '.png' };
        classID = classArray[i].className;
        console.log('greadeid'+greade + 'classId'+classID);
        wx.request({
          url: PORT +'/CreditSystem/api' ,
          data: { 'flag': 'getstudentsbyclass', 'classid': classID,'gradeid':greade},
          header: { "Content-Type": "application/x-www-form-urlencoded"},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {

            studentArray = res.data.data;
            for (var i = 0; i < res.data.data.length; i ++ ){
              res.data.data[i] = { 'sid': res.data.data[i].sid, 'spassword': res.data.data[i].spassword, 'sname': res.data.data[i].sname, 'scredit': res.data.data[i].scredit, 'sex': res.data.data[i].sex, 'color': 'black', 'backgroundcolor': 'white' }
            }
            
            _this.setData({
              studentArray: studentArray
            })
            console.log(res);
          },
          fail: function(res) {
            console.log(res);

          },
          complete: function(res) {
            console.log(res);

          },
        })
      }else{
        classArray[i] = { 'className': classArray[i].className, 'classImage': '/image/cai-' + classArray[i].className + '.png' };

      }
    }
    this.setData({
      classArray: classArray
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
    var subject = getApp().globalData.subject;
    var _this = this;
    if(sendArray.length==0){

      if (greade.length==0){
        wx.showModal({
          title: '错误提示',
          content: '请先选择年级',
          showCancel: false,
          confirmText: '确定',
        })
        return;
      }
      if (classID.length == 0) {
        wx.showModal({
          title: '错误提示',
          content: '请先选择班级',
          showCancel: false,
          confirmText: '确定',
        })
        return;
      }
      wx.showModal({
        title: '错误提示',
        content: '请先选择学生',
        showCancel: false,
        confirmText: '确定',
      })
      return;


    }
    console.log('总共有' + sendArray.length + '个学生提交');
    console.log('sendArray' + sendArray);
    var sid = '';
    var isFrist = true;
    for (var i = 0; i < sendArray.length; i++) {

      if (sendArray[i]) {
        console.log('提交学生名字:' + sendArray[i].sname);
        if (isFrist){
          sid = sendArray[i].sid;
          isFrist = false;
        }else {
          sid = sid + '|' + sendArray[i].sid;
        }
      
      } else {

      }

    }
    console.log('sid' + sid);
    console.log('subject'+subject);
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
        'event': '4',
        'subject': subject,
        'credit': '0.5',
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        if(res.data.data.length==0){
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
              sendArray = [];
             },
            fail: function (res) { },
            complete: function (res) { },
          })
        }else {

        }
      },
      fail: function (res) {

        wx.showModal({
          title: '错误',
          content: res.data.msg,
          showCancel: false,
          confirmText: '确定',
        })
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