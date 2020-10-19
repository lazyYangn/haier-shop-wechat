const WXAPI = require('apifm-wxapi')
Page({
    data: {},
    onLoad: function (options) {
        WXAPI.init('lazyYangn')
    },
    handleGetUserInfo(e) {
        console.log(e)
        // //获取用户信息
        // const { encryptedData, rawData, signature, iv } = e.detail
        if (!e.detail.userInfo) {
            // 你点了取消授权
            return
        }
        wx.login({
            success: function (res) {
                console.log(res)
                const code = res.code // 微信登录接口返回的 code 参数，下面注册接口需要用到
                // WXAPI.register_simple({
                //     code: code,
                // }).then(function (res) {
                //     // 注册接口返回结果
                //     console.log(res)
                // })
                //获取token
                WXAPI.login_wx(code).then((res) => {
                    // console.log(res)
                    wx.setStorageSync('token', res.data.token)
                })
            },
        })
        // //获取小程序登陆成功后的code
        // wx.login({
        //     success: (result) => {
        //         // console.log(result)
        //         // const { code } = result
        //         // const loginParams = { encryptedData, rawData, signature, iv, code }
        //         //注册
        //         // wx.request({
        //         //     url: 'https://api.it120.cc/lazyYangn/user/wxapp/register/simple',
        //         //     data: { code },
        //         //     header: { 'content-type': 'application/x-www-form-urlencoded' },
        //         //     method: 'post',
        //         //     success: (result) => {
        //         //         console.log(result)
        //         //     },
        //         // })
        //         //获取token
        //         // WXAPI.login_wx(code).then((res) => {
        //         //     // console.log(res)
        //         //     wx.setStorageSync('token', res.data.token)
        //         // })
        //     },
        // })
        wx.navigateBack({
            delta: 1,
        })
    },
})
