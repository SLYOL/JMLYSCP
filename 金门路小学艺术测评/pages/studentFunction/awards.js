var PORT = getApp().globalData.PORT;
var event = '';
var credit = '1';
var detail = '';
var subject = '';
var Cityindex = '';
var city = [{ 'cityNmae': '世界', 'backgroundColor': 'black' }, { 'cityNmae': '国家', 'backgroundColor': 'black' }, { 'cityNmae': '省级', 'backgroundColor': 'black' }, { 'cityNmae': '市级', 'backgroundColor': 'black' }, { 'cityNmae': '区级', 'backgroundColor': 'black' }];
var awards = [{ 'awardsName': '一等奖', 'backgroundColor': 'black' }, { 'awardsName': '二等奖', 'backgroundColor': 'black' }, { 'awardsName': '三等奖', 'backgroundColor': 'black' }, { 'awardsName': '参与奖', 'backgroundColor': 'black' }];
var result = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    artImage: '/image/art.png',
    musicImage: '/image/music.png',
    city: city,
    awards: awards

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    subject = '';

    console.log(options.style);
    result = '';
    if (options.style == '1') {
      event = 5;
      Cityindex = 10;

      city = [{ 'cityNmae': '校级', 'backgroundColor': '#6EBAFF' }];
      awards = [{ 'awardsName': '一等奖', 'backgroundColor': 'black' }, { 'awardsName': '二等奖', 'backgroundColor': 'black' }, { 'awardsName': '三等奖', 'backgroundColor': 'black' }, { 'awardsName': '参与奖', 'backgroundColor': 'black' }];

      
      wx.setNavigationBarTitle({
        title: '文艺活动',

      })
    } else {
      event = 11;
      Cityindex = '';
      city = [{ 'cityNmae': '世界', 'backgroundColor': 'black' }, { 'cityNmae': '国家', 'backgroundColor': 'black' }, { 'cityNmae': '省级', 'backgroundColor': 'black' }, { 'cityNmae': '市级', 'backgroundColor': 'black' }, { 'cityNmae': '区级', 'backgroundColor': 'black' }];
      awards = [{ 'awardsName': '一等奖', 'backgroundColor': 'black' }, { 'awardsName': '二等奖', 'backgroundColor': 'black' }, { 'awardsName': '三等奖', 'backgroundColor': 'black' }, { 'awardsName': '参与奖', 'backgroundColor': 'black' }];
      wx.setNavigationBarTitle({
        title: '获奖荣誉',
      })
    }
    this.setData({
      city: city,
      awards: awards
    })

  },
  touchSubject: function (e) {

    var index = e.target.dataset.index;
    if (index == 1) {
      subject = 'art';
      this.setData({
        artImage: '/image/art-select.png',
        musicImage: '/image/music.png'
      })

    } else {
      subject = 'music';

      this.setData({
        artImage: '/image/art.png',
        musicImage: '/image/music-select.png'
      })
    }

  },
  touchImage: function () {


    if (subject.length < 3) {
      wx.showModal({
        title: '提示',
        content: '请先选择类型',
        showCancel: false,
        success: function (res) {
        }
      })
      return;
    }

    if (detail.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请先填写感悟，如已经填写完毕，请重新点击',
        showCancel: false,
        success: function (res) {
        }
      })
      return;
    }
    if(result.length<1){
      wx.showModal({
        title: '提示',
        content: '请先选择奖项',
        showCancel: false,
        success: function (res) {
        }
      })
      return;
    }

    var that = this;
    console.log('学生id' + getApp().globalData.ID);
    wx.chooseImage({
      count: 1,  //最多可以选择的图片总数  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        var uploadImgCount = 0;

        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          wx.uploadFile({
            url: PORT + '/CreditSystem/upload',
            filePath: tempFilePaths[i],
            name: 'img',
            formData: {
              'flag': 'addeventbyupload',
              'sid': getApp().globalData.ID,
              'subject': subject,
              'event': event,
              'credit': result,
              'detail': detail,

            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {

              console.log(res);
              // uploadImgCount++;
              var data = JSON.parse(res.data);


              console.log(data.result);
              if (data.result == '1') {
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  mask: true,
                  duration: 2000,
                  success: function (res) {
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 1,
                      })
                      //要延时执行的代码  
                    }, 2000) //延迟时间 这里是1秒  
                  },

                })

              }

            },
            fail: function (res) {
              console.log(res);
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) {
                }
              })
            }
          });
        }
      }
    });
  },
  bindTextAreaBlur: function (e) {
    detail = e.detail.value;
    console.log('2222222' + e.detail.value);
  },
  touchCity:function(e){
    Cityindex = e.target.dataset.index;
    console.log(Cityindex);
    awards = [{ 'awardsName': '一等奖', 'backgroundColor': 'black' }, { 'awardsName': '二等奖', 'backgroundColor': 'black' }, { 'awardsName': '三等奖', 'backgroundColor': 'black' }, { 'awardsName': '参与奖', 'backgroundColor': 'black' }];
    for(var i = 0;i < city.length; i++){
      if(i == Cityindex){
        city[i].backgroundColor = '#6EBAFF';
      }else {
        city[i].backgroundColor = 'black';
      }
    }
    this.setData({
      city: city,
      awards: awards
    })


  },
  touchAwards:function(e){
    if (Cityindex.length<1){
      wx.showModal({
        title: '提示',
        content: '请先选择获奖地区',
        showCancel: false,
        success: function (res) {
        }
      })
      return;
    }
    var index = e.target.dataset.index;

    for (var i = 0; i < awards.length; i++) {
      if (i == index) {
        awards[i].backgroundColor = '#6EBAFF';
      } else {
        awards[i].backgroundColor = 'black';
      }
    }
    this.setData({
      awards: awards
    })
    if(Cityindex == 0){
      if(index == 0){
        result = 10;
      } else if (index == 1){
        result = 8;
      } else if (index == 2) {
        result = 6;
      } else if (index == 3) {
        result = 4;
      }
    } else if (Cityindex == 1) {
      if (index == 0) {
        result = 8;
      } else if (index == 1) {
        result = 6;
      } else if (index == 2) {
        result = 4;
      } else if (index == 3) {
        result = 2;
      }
    } else if (Cityindex == 2) {
      if (index == 0) {
        result = 6;
      } else if (index == 1) {
        result = 4;
      } else if (index == 2) {
        result = 2;
      } else if (index == 3) {
        result = 1;
      }
    } else if (Cityindex == 3) {
      if (index == 0) {
        result = 4;
      } else if (index == 1) {
        result = 3;
      } else if (index == 2) {
        result = 2;
      } else if (index == 3) {
        result = 1;
      }   
    } else if (Cityindex == 4) {
      if (index == 0) {
        result = 2;
      } else if (index == 1) {
        result = 1.5;
      } else if (index == 2) {
        result = 1;
      } else if (index == 3) {
        result = 0.5;
      }      
    }else if(Cityindex == 10){
      if (index == 0) {
        result = 10;
      } else if (index == 1) {
        result = 8;
      } else if (index == 2) {
        result = 6;
      } else if (index == 3) {
        result = 4;
      }

    }
    console.log('result'+result);

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