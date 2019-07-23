//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Welcome',
    userInfo: {},
    hasUserInfo: false,
    text: "这是一条测试公告，看看效果怎么样，2019年3月23日",
    marquee_margin: 30,
    size:14,

    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var userInfoTmp = app.globalData.userInfo;
    if (userInfoTmp == null) {
      // wx.redirectTo({
      //   url: './../self/self',
      // })
    } else {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

    }
    // 请求公告
    wx.request({
      url: 'https://www.gycxe.com/announcement',
      method: 'get',
      header: {
        'content-type': 'application/json' 
      },
      success: res => {
        console.log(res);
        
         if(res.data.status==1){
          let textList=res.data.list;
          console.log(textList);
           let textcon = textList[0].type + ',' + textList[0].content + ',' + textList[0].date;
          this.setData({
            text: textcon
          })
        }
      }
    })
  },
  loginoutClick: function(even) {
    this.setData({
      userInfo: null,
      hasUserInfo: false,
    }),
    app.globalData.userInfo = null
    wx.redirectTo({
      url: './../self/self'
    })
  }


})
