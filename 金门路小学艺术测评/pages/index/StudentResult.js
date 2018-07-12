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
    var student = getApp().globalData.student;
    this.setData({
      e1Art: '美术:'+student.e1Art,
      e1Music: '音乐:'+student.e1Music,
      e2Art: '美术:' +student.e2Art,
      e2Music: '音乐:' +student.e2Music,
      e3Art: '美术:' +student.e3Art,
      e3Music: '音乐:' +student.e3Music,
      e4: student.e4,
      e5: student.e5,
      e6: '美术:' +student.e6,
      e7: '音乐:' +student.e7,
      e8: student.e8,
      e9: student.e9,
      e10: student.e10,
      e11: student.e11,
      level: student.level,

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