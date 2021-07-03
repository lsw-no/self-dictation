var app = getApp()
Page({

  data: {
    openid: '',
    nickName: '未登录',
    src: '/images/user_noClick.png',
    isAdmin: false
  },
  getMyInfo: function (e) {
    let info = e.detail.userInfo;
    // console.log(info);
    this.setData({
      isLogin: true,
      src: info.avatarUrl,
      nickName: info.nickName
    })

    wx.setStorageSync("nickName", info.nickName);
    wx.setStorageSync("src", this.data.src);

    wx.login({
      success: function (res) {
        // console.log(res.code)
        wx.request({//appid=APPID    secret=SECRET
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + 'APPID' + '&secret=' + 'SECRET' + '&js_code=' + res.code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data.openid)
            var openid = res.data.openid
            wx.setStorageSync("openid",openid);
          }
        })
      }
    })
  },

})