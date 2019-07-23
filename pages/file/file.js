// pages/file/file.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    'encryptedData': '',
    'iv': '',
    'key': '',
    'formId': '',
    'TIP':'选择文件'
  },
  chooseFile:function(){
    var change=this;
    var encryptedData = wx.getStorageSync('encryptedData');
    var iv = wx.getStorageSync('iv');
    var formId = this.data.formId;
    wx.chooseMessageFile({
      count: 10,
      type: 'all',
      success(file) {
        change.setData({
          'TIP': '文件上传中'
        });
        uploadFile(file.tempFiles, 0, formId,change);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var encryptedData = options.encryptedData;
    var iv = options.iv;
    var key = options.key;
    var formId = options.formId;
    this.setData({
      encryptedData: encryptedData,
      iv: iv,
      key: key,
      formId: formId
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

function uploadFile(fileTemp, NUMBER, formId,set){
  console.log(fileTemp.length);
  console.log(NUMBER);
  wx.uploadFile({
    url: 'https://www.gycxe.com/underwriting/upload',
    filePath: fileTemp[NUMBER].path,
    name: 'file',
    formData: {
      'encryptedData': wx.getStorageSync('encryptedData'),
      'iv': wx.getStorageSync('iv'),
      'key': wx.getStorageSync('Session_Key'),
      'formId': formId
    },
    success(res) {
      set.setData({
        'TIP': '第' + (NUMBER+1) + '个文件上传成功'
      });
      console.log(res);
      if (NUMBER+1 == fileTemp.length) {
        wx.showModal({
          title: '提示',
          content: '上传成功',
          success: function (res) {
            wx.switchTab({
              url: "/pages/submit/submit"
            })
          }
        })
      } else {
        uploadFile(fileTemp, NUMBER+1, formId,set);
      }
    }
  })
}