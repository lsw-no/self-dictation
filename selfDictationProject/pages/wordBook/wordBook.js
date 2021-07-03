var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordlist: [{
      id: "",
      word: "",
      interpretation: ""
    }],
  },

  getWords: function () {
    var openid = wx.getStorageSync('openid')
    wx.request({
      url: app.globalData.URL+'/getPlanBookWords',
      method: "GET",
      header: {
        'content-type': 'application/json' //默认值
      },
      data: {
        openid: openid
      },
      success: res => {
        this.setData({
          wordlist: res.data
        })
        // console.log(res)
      }
    })


  },

  goToWordInfo: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)

    wx.navigateTo({
      url: '../word/word?wordId=' + id
    })

  },

  deleteWord: function (e) {
    var _this = this
    wx.showModal({
      content: '是否将该单词从单词本移出',
      success: res => {
        if (res.confirm) {
          var id = e.currentTarget.dataset.id
          var openid = wx.getStorageSync('openid')
          console.log(id)

          wx.request({
            url: app.globalData.URL+'/deleteWord',
            method: "GET",
            header: {
              'content-type': 'application/json' //默认值
            },
            data: {
              openid: openid,
              wordId:id
            },
            success: res => {
              // console.log(res.data)
              _this.getWords()
            }
          })
        }
      }
    })

  },

  onTabItemTap: function (item) {
    this.getWords()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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