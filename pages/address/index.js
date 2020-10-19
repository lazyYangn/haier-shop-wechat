// pages/address/index.js
Page({
    data: {
        userName: '',
        telNumber: '',
        address: '',
        detailInfo: '',
    },
    TimeId: -1,
    handleChooseAddress(e) {
        // 获取权限
        wx.getSetting({
            success: (result) => {
                const scopeAddress = result.authSetting['scope.address']
                if (scopeAddress === true || scopeAddress === undefined) {
                    wx.chooseAddress({
                        success: (result1) => {
                            let { userName, telNumber, provinceName, countyName, cityName, detailInfo } = result1
                            let address = provinceName + cityName + countyName
                            this.setData({ userName, telNumber, detailInfo, address })
                        },
                    })
                } else {
                    // 诱导用户打开授权页面
                    wx.openSetting({
                        success: (result) => {
                            wx.chooseAddress({
                                success: (result1) => {
                                    this.setData({ address: result1 })
                                },
                            })
                        },
                    })
                }
            },
        })
    },

    handleDefault() {
        const token = wx.getStorageSync('token')
        wx.request({
            url: 'https://api.it120.cc/lazyYangn/user/shipping-address/default/v2',
            data: { token },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'GET',
            success: (result) => {
                console.log(result)
                if (result.data.msg === '暂无数据') {
                    wx.navigateTo({
                        url: '/pages/addAddress/index',
                    })
                } else {
                    this
                }
            },
        })
    },

    inputUserName(e) {
        clearTimeout(this.TimeId)
        this.TimeId = setTimeout(() => {
            this.setData({
                userName: e.detail.value,
            })
        }, 1000)
    },
    inputTel(e) {
        clearTimeout(this.TimeId)
        this.TimeId = setTimeout(() => {
            this.setData({
                telNumber: e.detail.value,
            })
        }, 1000)
    },
    inputCity(e) {
        clearTimeout(this.TimeId)
        this.TimeId = setTimeout(() => {
            this.setData({
                address: e.detail.value,
            })
        }, 1000)
    },
    inputAddress(e) {
        clearTimeout(this.TimeId)
        this.TimeId = setTimeout(() => {
            this.setData({
                detailInfo: e.detail.value,
            })
        }, 1000)
    },
})
