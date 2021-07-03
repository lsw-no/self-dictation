var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    planList: [
      "文学",
      "流行",
      "文化",
      "科技",
      "生活"
    ],
    selectIndex: 0,
    isBritish: true,
    userImage: '../../images/login_user.png',
    isLogin: false
  },

  searchWord:function(e) {
    this.setData({
      searchWord: e.detail.value
    })
  },


  search:function() {
    wx.request({
      url: app.globalData.URL+'/getWordByWord',
      method: "GET",
      header: {
        'content-type': 'application/json' //默认值
      },
      data: {
        wordStr: this.data.searchWord
      },
      success: res => {
        wx.navigateTo({
          url: '../word/word?wordId=' + res.data.id
        })
      }
    })
  },


  switchSection: function (e) {
    console.log(e.currentTarget.dataset.type)
    if (e.currentTarget.dataset.type == 'E') {
      this.setData({
        isBritish: true
      })
    } else {
      this.setData({
        isBritish: false
      })
    }
  },

  typePickChange: function (e) {
    this.setData({
      selectIndex: e.detail.value
    })
  },

  getPlanList: function (e) {
    var openid = wx.getStorageSync('openid')
    // console.log(openid)
    wx.request({
      url: app.globalData.URL+'/getPlans',
      method: "GET",
      header: {
        'content-type': 'application/json' //默认值
      },
      data: {
        openid: openid
      },
      success: res => {
        this.setData({
          planList:res.data
        })
      }
    })
  },

  addPlan:function(e) {
    wx.navigateTo({
      url: '../plan/plan?planId=0'
    })
  },

  updatePlan:function(e) {
    var selectIndex = this.data.selectIndex
    var plan = this.data.planList[selectIndex]
    // console.log(plan)
    wx.navigateTo({
      url: '../plan/plan?planId='+plan.id+'&planName='+plan.planName
    })
  },

  startDictation:function(e) {
    var voice  = 1
    var selectIndex = this.data.selectIndex
    var plan = this.data.planList[selectIndex]
    if(this.data.isBritish){
      voice = 1
    }else{
      voice = 2
    }
    wx.redirectTo({
      url: '../dictation/dictation?planId='+plan.id+'&voice='+voice
    })
  },


  onTabItemTap: function (item) {
    wx.getStorage({
      key: 'src',
      success: res => {
        // console.log(res)
        this.setData({
          userImage: res.data,
          searchWord:''
        })
        this.getPlanList()
      }
    })
    // this.getPlanList()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'src',
      success: res => {
        // console.log(res)
        this.setData({
          userImage: res.data
        })
        this.getPlanList()
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getStorage({
      key: 'src',
      success: res => {
        // console.log(res)
        this.setData({
          userImage: res.data,
          selectIndex:0
        })
        this.getPlanList()
      }
    })
  },
})