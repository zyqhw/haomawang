// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  goIndex: function() {
    wx.navigateBack({
    })
  },
  bindGetUserInfo: function(res) {
    if (res.detail.errMsg == 'getUserInfo:ok') {
      let data = {
        appid: getApp().globalData.appId,
        sessionKey: wx.getStorageSync("sessionKey"),
        signature: res.detail.signature,
        rawData: res.detail.rawData,
        encryptedData: res.detail.encryptedData,
        iv: res.detail.iv
      }

      getApp().globalData.fetch(getApp().globalData.registPath, 'POST', data)
        .then((res) => {
          wx.setStorageSync("token", res.token)
          getApp().globalData.userInfo = res.userInfo
          wx.navigateBack({
            
          })
        })
    }
  }
})