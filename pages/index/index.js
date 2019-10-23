import Toast from '../../dist/toast/toast';

var baseUrl = getApp().globalData.baseUrl
var price = '/hmwRecharges/price'
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    textareaText: '',
    icon: {
      homeNormal: '/style/images/home.png',
      homeActive: '/style/images/home-active.png',
      mineNormal: '/style/images/mine.png',
      mineActive: '/style/images/mine-active.png'
    },
    listData: [],
    remark: '',
    telInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.login({
    //   success: function (res) {
    //     console.log(res)
    //     if (res.code) {
    //       wx.setStorageSync("code", res.code)
    //     } else {
    //       console.log('code error');
    //     }
    //   },
    //   fail: function (err) {
    //     console.log('登录失败！' + err.errMsg);
    //   }
    // })

    getApp().globalData.fetch(price).then((res) => {
        let {
          code,
          rechargePrices,
          result
        } = res
      this.setData({
        listData: rechargePrices
      });
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

  },
  // event.detail 的值为当前选中项的索引
  onChange(event) {
    console.log(event.detail);
    if (event.detail == 1) {
      wx.navigateTo({
        url: '../order/order',
        success: function (res) {
          // success 
        },
        fail: function () {
          // fail 
        },
        complete: function () {
          // complete 
        }
      }) 
    }
  },
  clearText(event) {
    console.log(event.currentTarget.dataset.item)
    console.log(getApp().globalData.baseUrl)
  },
  //上传文件
  chooseMessageFile(event) {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFile = res.tempFiles[0].path
        console.log(res)
        Toast.success(tempFile.name);
      }
    })
    // wx.uploadFile({
    //   url: '',
    //   filePath: '',
    //   name: '',
    //   header: {},
    //   formData: {},
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  },
  onChangeNumber(event) {
    getApp().globalData.fetchWithToken(getApp().globalData.telInfoPath + event.detail.value).then((res) => {
      console.log(res)
      this.telInfo = res.telInfo
      this.remark = res.telInfo.province + ‘|’ + 
    })
  },
  onFocusTextarea(event) {
    if (!this.textareaText) {
      this.setData({
        hiddenName: !this.data.hiddenName
      })
    }
  },
  onBlurTextarea(event) {
    if (!this.textareaText) {
      this.setData({
        hiddenName: !this.data.hiddenName
      })
    }
  },
  onChangeTextarea(event) {
    this.textareaText = event.detail.value;
    console.log(this.textareaText)
  },
  paySingle() {

    getApp().globalData.fetchWithToken(getApp().globalData.singlePath, 'POST')
    
    // wx.requestPayment({
    //   appid: 'wx3a98185c85d1a779',
    //   timeStamp: '1571816005',
    //   nonceStr: 'S0ExfpRpCP4FSHD28RQncKPdwD2ASuMo',
    //   package: 'prepay_id=wx23153325463845dbea0500781832801800',
    //   signType: 'RSA',
    //   paySign: 'Z4AxLNOw0zVdqPcud3ThP7W4bcdAw2A5SaS9aWvM5GM6oHodaDnvtVMEirkFrXXUovf+3jPpUw3AB0kOsp1xIFzF/DpsXYFH7D7tnIGWVTYdPxzrifedbYB9CBrtofcnHvLZRRq63PMcP1M7Q/x33WPH52KR6HRiFbSoRkw/vt85Z/uD9et0kY61Uxl+vNumxzQZZW5DiZneJRCOEAAchRTE4zE6P5uGaKoyOCY5E4cuZNFl4lmI0oUl3SP5y/O0Lpf8kmFzdcv2L20DwyuMQ4nzucwMRZbfuyzr1CTg9rFrZbjsn3mkDvxEH475MxjCdJskdlyF6jPGslV2PLEphQ==',
    //   success(res) {
        
    //   },
    //   fail(res) {

    //   }
    // })
  }
})