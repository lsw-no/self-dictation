var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAllClicked: false,
    list: [
      //   {
      //   id: '',
      //   word: '',
      //   interpretation: ''
      // }
    ],
    removeList: [],
    wordNum: 0,
    planName: '',
    hasSave: false
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
    // console.log(id)

    wx.navigateTo({
      url: '../word/word?wordId=' + id
    })

  },

  deletePlan: function (e) {
    wx.showModal({
      content: '是否删除该听写计划',
      success: res => {
        if (res.confirm) {
          wx.request({
            url: app.globalData.URL + '/deletePlan',
            method: "GET",
            header: {
              'content-type': 'application/json' //默认值
            },
            data: {
              planId: this.data.planId
            },
            success: res => {
              wx.navigateBack({
                delta: 1,
                success: res => {
                  wx.showToast({
                    title: '删除成功',
                  })
                }
              })
            }
          })
        }
      }
    })
  },

  removeWords: function (e) {
    var stayList = [];
    var removeList = []
    var i = 0
    var j = 0
    this.data.list.forEach(item => {
      if (!item.checked) {
        stayList[j] = item
        j++
      } else {
        removeList[i] = item
        i++
      }
    })

    this.setData({
      list: stayList,
      removeList: removeList
    })

    wx.showToast({
      title: '移除成功',
    })

  },

  savePlan: function (e) {
    wx.showModal({
      content: '是否保存计划',
      success: res => {
        if (res.confirm&&this.data.planId!=0) {
          var list = []
          var obj = {
            id: '',
            word: '',
            interpretation: ''
          }
          var i = 0
          this.data.removeList.forEach(item => {
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
          })

          var wordStr = JSON.stringify(list)
          // console.log(wordStr)
          wx.request({
            url: app.globalData.URL + '/updatePlan',
            method: "GET",
            header: {
              'content-type': 'application/json' //默认值
            },
            data: {
              wordsStr: wordStr,
              planId: this.data.planId,
              planName: this.data.planName
            },
            success: res => {
              wx.navigateBack({
                delta: 1,
                success: res => {
                  wx.showToast({
                    title: '保存成功',
                  })
                }
              })
            }
          })
        }else if(res.confirm&&this.data.planId==0){
          var openId = wx.getStorageSync('openid')
          wx.request({
            url: app.globalData.URL + '/addNewPlan',
            method: "GET",
            header: {
              'content-type': 'application/json' //默认值
            },
            data: {
              planName: this.data.planName,
              openId:openId
            },
            success: res => {
              wx.navigateBack({
                delta: 1,
                success: res => {
                  wx.showToast({
                    title: '保存成功',
                  })
                }
              })
            }
          })
        }
      }
    })
  },

  planNameChange: function (e) {
    this.setData({
      planName: e.detail.value
    })
  },

  pageInit: function (planId, planName) {
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
          list: res.data,
          wordNum: res.data.length,
          planName: planName,
          planId: planId,
          hasSave: true
        })
        this.ckickAlltap()
        this.ckickAlltap()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var planId = options.planId
    var planName = options.planName
    if (planId && planName) {
      this.pageInit(planId, planName)
    }

    this.setData({
      planName: "",
      planId: planId
    })

    // console.log(planId==0)


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