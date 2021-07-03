const audioContext = wx.createInnerAudioContext()
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
    isDictationing: true,

  },

  cancelDictation: function (e) {
    wx.switchTab({
      url: '../index/index'
    })
  },

  endDication: function (e) {
    this.setData({
      isDictationing: false
    })
    this.ckickAlltap()
    this.ckickAlltap()
  },

  //全选与取消全选
  ckickAlltap: function () {
    var that = this;
    var lists = that.data.wordlist
    console.log("lists", lists);
    for (let i = 0; i < lists.length; i++) {
      lists[i].checked = (!that.data.isAllClicked)
    }
    that.setData({
      wordlist: lists,
      isAllClicked: (!that.data.isAllClicked)
    })
  },

  playAudio: function (e) {
    var word = e.currentTarget.dataset.word
    var type = this.data.voice
    // console.log(type)
    audioContext.src = "http://dict.youdao.com/dictvoice?type=" + type + "&audio=" + word
    audioContext.play()
  },

  checkChange: function (e) {
    var id = e.currentTarget.dataset.id
    var list = this.data.wordlist
    // console.log(e)
    list.forEach(item => {
      if (item.id == id) {
        item.checked = !item.checked
      }
    })
    this.setData({
      list: list
    })
  },

  addToWordBook: function (e) {
    var list = []
    var i = 0
    var obj = {
      id: '',
      word: '',
      interpretation: ''
    }
    this.data.wordlist.forEach(item => {
      if (item.checked) {
        obj.id = item.id
        obj.word = item.word
        obj.interpretation = item.interpretation
        list[i] = obj
        i++
        obj = {
          id: '',
          word: '',
          interpretation: ''
        }
      }
    })

    var openid = wx.getStorageSync('openid')
    var wordStr = JSON.stringify(list)

    console.log(wordStr)

    wx.request({
      url: app.globalData.URL + '/addWordsList',
      method: "GET",
      header: {
        'content-type': 'application/json' //默认值
      },
      data: {
        wordsStr: wordStr,
        openid: openid
      },
      success: res => {
        // console.log(res)
        if (res.data == 'success') {
          wx.showToast({
            title: '添加成功',
          })
        }else{
          wx.showToast({
            icon:'none',
            title: '单词已存在',
          })
        }

      }
    })

  },

  backIndex:function(e) {
    wx.switchTab({
      url: '../index/index'
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var planId = options.planId
    var voice = options.voice
    console.log(planId)
    console.log(voice)
    this.setData({
      voice: voice,
      planId: planId
    })

    wx.request({
      url: app.globalData.URL + '/getPlanWords',
      method: "GET",
      header: {
        'content-type': 'application/json' //默认值
      },
      data: {
        id: planId,
        planName: null
      },
      success: res => {
        // console.log(res)
        this.setData({
          wordlist: res.data,
          planId: planId,
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