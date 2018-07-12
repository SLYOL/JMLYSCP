var PORT = getApp().globalData.PORT;
var event = '';
var credit = '1';
var detail = '';
var subject = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    artImage: '/image/art.png',
    musicImage: '/image/music.png'
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.style);
    subject = '';
    detail = '';
    if (options.style=='2'){
      event = 9;
      wx.setNavigationBarTitle({
        title: '艺术学习',
        
      })
    }else{
      event = 10;

      wx.setNavigationBarTitle({
        title: '艺术实践',
      })
    }

  },
  touchSubject:function(e){

    var index = e.target.dataset.index;
    if(index == 1){
      subject = 'art';
      this.setData({
        artImage: '/image/art-select.png',
        musicImage: '/image/music.png'
      })

    }else {
      subject = 'music';

      this.setData({
        artImage: '/image/art.png',
        musicImage: '/image/music-select.png'
      })
    }

  },
  touchImage: function () {
   

    if(subject.length<3){
      wx.showModal({
        title: '错误提示',
        content: '亲先选择类型',
        showCancel: false,
        success: function (res) {
        }
      })
      return;
    }

    if (detail.length==0){
      wx.showModal({
        title: '错误提示',
        content: '请先填写感悟，如已经填写完毕，请重新点击',
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
              'credit': credit,
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
              if (data.result  == '1'){
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

              //如果是最后一张,则隐藏等待中  
              // if (uploadImgCount == tempFilePaths.length) {
              //   wx.hideToast();
              // }
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
  bindTextAreaBlur:function(e){
    detail = e.detail.value;
    console.log('2222222'+e.detail.value);
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