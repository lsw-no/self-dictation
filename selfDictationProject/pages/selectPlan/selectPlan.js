var app = getApp()
var eventChannel
Page({

  /**
   * 页面的初始数据
   */
  data: {
    planList: [{
        id: '',
        planName: ''
      }
    ]
  },



  checkChange: function (e) {
    var id = e.currentTarget.dataset.id
    var list = this.data.planList
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


  addChecked: function () {
    var list = []
    var i = 0
    this.data.planList.forEach(item => {
      item.checked = false
      list[i] = item
      i++
    })
    this.setData({
      planList: list
    })
  },

  addToPlan: function (e) {
    var planList = []
    var wordList = this.data.wordList
    var i = 0
    var obj = {
      id: '',
      planName: ''
    }
    this.data.planList.forEach(item => {
      if (item.checked) {
        obj.id = item.id
        obj.planName = item.planName
        planList[i] = obj
        i++
        obj = {
          id: '',
          planName: ''
        }
      }
    })

    var plansStr = JSON.stringify(planList)
    var wordsStr = JSON.stringify(wordList)

    console.log(plansStr)
    console.log(wordsStr)

    wx.request({
      url: app.globalData.URL + '/addPlansWords',
      method: "GET",
      header: {
        'content-type': 'application/json' //默认值
      },
      data: {
        wordsStr: wordsStr,
        plansStr: plansStr
      },
      success: res => {
        eventChannel.emit("backResult",res.data)
        wx.navigateBack({
          delta: 1,
        })
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = wx.getStorageSync('openid')

    wx.request({
      url: app.globalData.URL + '/getPlans',
      method: "GET",
      header: {
        'content-type': 'application/json' //默认值
      },
      data: {
        openid:openid
      },
      success: res => {
        // console.log(res)
        this.setData({
          planList:res.data
        })
        this.addChecked()
      }
    })

    eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', data => { //获取父页面传来的数据
      // console.log(data)
      this.setData({
        wordList: data.data
      })
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