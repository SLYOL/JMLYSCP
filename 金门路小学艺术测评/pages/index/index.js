Page({

  /**
   * 页面的初始数据
   */
  data: {
    // Name: getApp().globalData.tname
    calssArray:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('教师名字' + getApp().globalData.name);
    console.log('教师subject' + getApp().globalData.subject);
    
    var array = JSON.parse(options.classArray);
    console.log('班级列表' + array);
    this.setData({
      Name: getApp().globalData.tname,
      height: 80 * array.length+(array.length-1)*10+80,
      calssArray: array

    })
    
  },
  touchChangeImage:function(){
    console.log('点击了修改头像');
    wx.showModal({
      title: '提示',
      content: '暂不支持修改头像',
      showCancel: false,
      confirmText: '确定',
    })
    
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
    
    // wx.navigateTo({
    //   url: '/pages/index/ChangePWD',
    // })
  },
  touchChangeEmile:function(){
    console.log('点击了修改邮箱');

    wx.showModal({
      title: '异常',
      content: '暂时不支持修改邮箱',
      showCancel: false,
      confirmText: '确定',
      confirmColor: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  formSubmit:function (e){
    console.log(e.detail);
  },
  touchSelect:function(e) {
    wx.request({
      url: '',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    console.log(e.currentTarget.dataset.text);
    wx.navigateTo({
      url: '/pages/function/function?title=' + e.currentTarget.dataset.text,
    })

  },
  addClass:function(e){
    wx.navigateTo({
      url: '/pages/index/AddClass',
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