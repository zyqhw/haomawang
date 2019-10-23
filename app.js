App({
  globalData: {
    baseUrl: 'http://123.207.124.26:9876',
    appId: 'wx3a98185c85d1a779',
    sessionKey: '',
    userInfo: {},

    loginPath: '/users/login',
    registPath: '/users/info',
    telInfoPath: '/hmwRecharges/tel/info/',
    singlePath: '/hmwRecharges/single',

    /**
     *  请求业务接口基本方法
     *
     * @param {Object} [data={}] - 对应wx.request里data参数
     * @param {Object} [opts={}] - 对应wx.request里其他参数
     * @returns {Promise}
     */
    fetch: function(url, method, data = {}, opts = {}) {
      if (!method) {
        method = 'GET'
      }
      // 通用设置
      const options = {
        url: getApp().globalData.baseUrl + url,
        header: {
          'X-Token': wx.getStorageSync('token'),
        },
        method: method,
      }

      return new Promise((resolve, reject) => {
          wx.request({
            ...Object.assign(options, opts),
            data,
            success: function(res) {
              resolve(res);
            },
            fail: function(err) {
              reject(err);
            }
          })
        })
        .then(getApp().globalData.checkStatus)
        .catch(() => {
          // do something
        })

    },
    /**
     *  接口返回值状态判断
     *
     * @param {Object} response - 接口返回值
     * @returns {Promise}
     */
    checkStatus: function(response) {
      let msg = '';
      if (response.statusCode == 200) {
        let {
          code, msg, details
        } = response.data
        switch (code) {
          case 200:
            // 请求成功，返回一个Promise对象
            return Promise.resolve(response.data);
            break;
          case 40007:
            // token验证失败
            // wx.navigateTo({
            //   url: `/pages/login/login`
            // });
            break;
          case 42003:
            //用户不存在,获取sessionKey
            // return Promise.resolve(details[0]);
            wx.setStorageSync("sessionKey", details[0])
            wx.navigateTo({
              url: `/pages/login/login`
            });
            break;
          default:
            return Promise.resolve(response.data);
            break;
        }
      }
      // 防止重复跳转
      if (getCurrentPageUrl() != 'pages/error/error') {
        wx.navigateTo({
          url: `/pages/error/error?msg=${msg}`
        });
      }
    },
    /**
     * 带token的请求业务接口
     */
    fetchWithToken: function (url, method, data = {}, opts = {}) {
      const token = wx.getStorageSync('token');
      if (token) {
        return getApp().globalData.fetch(url, method, data, opts)
      } else {
        return getApp().globalData.getToken().then((token) => {
          return getApp().globalData.fetch(url, method, data, opts);
        })
      }

    },
    /**
     *
     * 获取token
     */
    getToken: function() {
      return new Promise((resolve, reject) => {
        wx.login({
          success: function (res) {
            console.log(res)
            if (res.code) {

              let data = {
                code: res.code,
                appid: getApp().globalData.appId
              };

              getApp().globalData.fetch(getApp().globalData.loginPath, 'GET', data).then((res) => {
                wx.setStorageSync("token", res.token)
              })
            } else {
              console.log('code error');
            }
          },
          fail: function (err) {
            console.log('登录失败！' + err.errMsg);
          }
        })
      })

    }
  }
});