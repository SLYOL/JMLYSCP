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
    this.setData({
      Name: getApp().globalData.name
      // height: 80 * array.length + (array.length - 1) * 10 + 80,
      // calssArray: array

    })
    
  },
  touchFunction: function(e){
    var index = e.target.dataset.index;
    console.log(e);
    if(index == '1'){
      console.log('点击了文艺活动');
      wx.navigateTo({
        url: '/pages/studentFunction/awards?style='+index,
      })


    } else if (index == '2'){
      console.log('点击了艺术学习');
      wx.navigateTo({
        url: '/pages/studentFunction/art?style='+index,
      })


    } else if (index == '3') {
      console.log('点击了艺术实践');
      wx.navigateTo({
        url: '/pages/studentFunction/art?style=' + index,
      })

    } else if (index == '4') {
      console.log('点击了荣誉获奖');
      wx.navigateTo({
        url: '/pages/studentFunction/awards?style=' + index,
      })
    }

  },

  touchChangePWD:function(){

   
    console.log('点击了修改密码');
    wx.showModal({
      title: '异常',
      content: '暂时不支持修改密码',
      showCancel: false,
      confirmText: '确定',
      confirmColor: '',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  touchChangeImage:function(){
    console.log('点击了修改头像');
    wx.showModal({
      title: '异常',
      content: '暂时不支持修改头像',
      showCancel: false,
      confirmText: '确定',
      confirmColor: '',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  touchResult:function(){
    console.log("点击了成绩按钮");
    wx.navigateTo({
      url: '/pages/index/StudentResult',
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