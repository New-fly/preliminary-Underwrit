// pages/submit/submit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"1980-01-01",
      Gender: ['男', '女'],
      encryptedData: '',
      iv: '',
      Session_Key: '',
      phone: ''
  },
  /*
   *性别选择
   */
    bindPickerChange(e) {
        this.setData({
            index: e.detail.value
        })
    },
    /*
   *日期选择
   */
    bindDateChange(e) {
        this.setData({
            date: e.detail.value
        })
    },
    /* 
     *表单提交数据 
    */
    formSubmit: function (e) {
        var Foo = this;
        var name = /^[\u4E00-\u9FA5]{2,4}$/;
        var phoneNum = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if (e.detail.name == '' || !name.test(e.detail.value.name)){
            wx.showModal({
                title: '提示',
                content: '请输入有效的核保人姓名！',
            })
        }else if (e.detail.value.sex != 0 && e.detail.value.sex != 1){
            wx.showModal({
                title: '提示',
                content: '请完善核保人性别！',
            })
        }else if(e.detail.value.birthday==''||!e.detail.value.birthday){
            wx.showModal({
                title: '提示',
                content: '请完善核保人出生年月！',
            })
        } else if (e.detail.value.introduce == '' || !e.detail.value.introduce){
            wx.showModal({
                title: '提示',
                content: '请对核保人健康状况进行简单描述',
            })
        }else{
          wx.checkSession({
            success: function (res) {
              wx.request({
                url: 'https://www.gycxe.com/underwriting/insert',
                  header: {
                      'content-type': 'application/x-www-form-urlencoded'
                  },
                  method: 'POST',
                  data: {
                      'formId': e.detail.formId,
                      'name': e.detail.value.name,
                      'sex': e.detail.value.sex == 0 ? 'male' : 'female',
                      'birthday': e.detail.value.birthday,
                      'phone': e.detail.value.phone,
                      'introduce': e.detail.value.introduce,
                      'encryptedData': Foo.data.encryptedData,
                      'iv': Foo.data.iv,
                      'key': Foo.data.Session_Key
                  },
                  success: function (res) {
                    console.log('res');
                    console.log(res);
                      if (res.data.status == 0) {
                        wx.switchTab({
                          url: './../self/self'
                        });
                      }
                      wx.showModal({
                          title: '提示',
                          content: '是否上传附件',
                          success: function (res) {
                            if (res.confirm) {
                              Foo.setData({
                                form_info: '',
                                index: '',
                                date: '',
                                phone: '',
                                encryptedData: wx.getStorageSync('encryptedData'),
                                iv: wx.getStorageSync('iv'),
                                Session_Key: wx.getStorageSync('Session_Key')
                              })
                              var Session_Key = wx.getStorageSync('Session_Key')
                              wx.navigateTo({
                                url: "/pages/file/file?encryptedData=" + res.encryptedData + "&iv=" + res.iv + "&Session_Key=" + Session_Key + "&formId=" + e.detail.formId
                              })
                            }else{
                              wx.switchTab({
                                url: "/pages/submit/submit"
                              })
                            }
                          }
                      })
                  }
              })
            },
            fail: function (res) {
              console.log(res, '登录过期了')
              wx.showModal({
                title: '提示',
                content: '你的登录信息过期了，请重新登录',
              })
              wx.navigateTo({
                url: "/pages/self/self"
              })
            }
          })
        }
    }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      encryptedData: wx.getStorageSync('encryptedData'),
      iv: wx.getStorageSync('iv'),
      Session_Key: wx.getStorageSync('Session_Key')
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