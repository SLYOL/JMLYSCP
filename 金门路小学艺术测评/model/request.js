var rootDocment = '';
function myREQ(url,data,cb){
  wx.request({
    url: rootDocment + url,
    data: data,
    header: { 'Content-Type': 'application/json'},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function(res) {
      return typeof cb == "function" && cb(false)
    },
    complete: function(res) {},
  })


}

module.exports = {
  myREQ: myREQ
}