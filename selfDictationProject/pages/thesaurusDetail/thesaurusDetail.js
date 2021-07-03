var app = getApp()
var page = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    num: 0,
    isAllClicked: false,
    list: [{
      id: '',
      word: '',
      interpretation: ''
    }, ]
  },

  //全选与取消全选
  ckickAlltap: function () {
    var that = this;
    var lists = that.data.list
    // console.log("lists", lists);
    for (let i = 0; i < lists.length; i++) {
      lists[i].checked = (!that.data.isAllClicked)
    }
    that.setData({
      list: lists,
      isAllClicked: (!that.data.isAllClicked)
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
    this.data.list.forEach(item => {
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
        } else {
          wx.showToast({
            icon: 'none',
            title: '单词已存在',
          })
        }

      }
    })
  },


  checkChange: function (e) {
    var id = e.currentTarget.dataset.id
    var list = this.data.list
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

  goToWordInfo: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)

    wx.navigateTo({
      url: '../word/word?wordId=' + id
    })

  },


  addToPlan: function (e) {
    var _this = this
    var list = []
    var i = 0
    var obj = {
      id: '',
      word: '',
      interpretation: ''
    }
    this.data.list.forEach(item => {
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


    wx.navigateTo({
      url: '../selectPlan/selectPlan',
      events: {
        backResult: res => { //监听打开页面传输数据
          setTimeout(function () {
            _this.showSomeHint(res)
          }, 0)

        }
      },
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: list
        })
      }
    })
  },

  showSomeHint: function (res) {
    if (res == 'success') {
      wx.showToast({
        title: '添加成功',
      })
    } else {
      wx.showToast({
        title: '单词已存在',
        icon: 'none'
      })
    }
  },

  loadMore: function (e) {
    page++
    var list = this.data.list
    wx.request({
      url: app.globalData.URL + '/getWordByType',
      method: "GET",
      header: {
        'content-type': 'application/json' //默认值
      },
      data: {
        type: this.data.type,
        page: page
      },
      success: res => {
        this.setData({
          list: list.concat(res.data),
        })
        this.addChecked
      }
    })
  },

  addChecked: function () {
    var list = []
    var i = 0
    this.data.list.forEach(item => {
      item.checked = false
      list[i] = item
      i++
    })
    this.setData({
      planList: list
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var name = options.name
    // console.log(id)
    wx.request({
      url: app.globalData.URL + '/getWordByType',
      method: "GET",
      header: {
        'content-type': 'application/json' //默认值
      },
      data: {
        type: id,
        page: page
      },
      success: res => {
        this.setData({
          list: res.data,
          name: name,
          type: id
        })
        this.ckickAlltap()
        this.ckickAlltap()
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