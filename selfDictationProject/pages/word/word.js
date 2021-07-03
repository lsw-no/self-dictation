const audioContext = wx.createInnerAudioContext()
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    word: "",
    interpretation: ""
  },

  playAudio:function(e) {
    var type = e.currentTarget.dataset.type
    // console.log(type)
    audioContext.src = "http://dict.youdao.com/dictvoice?type="+type+"&audio="+this.data.word
    audioContext.play()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.wordId
    console.log(id)
    wx.request({
      url: app.globalData.URL+'/getWordById',
            method: "GET",
            header: {
              'content-type': 'application/json' //默认值
            },
            data: {
              wordId:id
            },
            success: res => {
              // console.log(res.data)
             this.setData({
               id:res.data.id,
               word:res.data.word,
               interpretation:res.data.interpretation,
             })
            }
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