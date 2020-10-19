import { request } from '../../request/index.js'
Page({
    data: {
        cart: [],
        cartInfo: {},
        userName: '',
        telNumber: '',
        address: {},
        detailInfo: '',
    },
    onLoad(options) {
        let { userName, telNumber, address, detailInfo } = options
        this.setData({
            userName,
            telNumber,
            address,
            detailInfo,
        })
    },
    onShow() {
        //获取购物车中的数据
        //获取token
        const token = wx.getStorageSync('token')
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index',
            })
        }
        this.getCart(token)
        this.getCheck(token)
    },
    async getCheck(token) {
        let res = await request({
            url: 'https://api.it120.cc/lazyYangn/user/shipping-address/default/v2',
            data: { token },
            header: 'application/x-www-form-urlencoded',
            method: 'GET',
        })
        if (res.data.msg === '暂无数据') {
            return
        } else {
            this.setData({ address: res.data.data.info })
        }
    },
    async getCart(token) {
        try {
            let res = await request({
                url: 'https://api.it120.cc/lazyYangn/shopping-cart/info',
                data: { token },
                method: 'get',
                header: 'application/x-www-form-urlencoded',
            })
            console.log(res)
            this.setData({
                cart: res.data.data.items,
                cartInfo: res.data.data,
            })
        } catch (error) {
            console.log(error)
        }
    },
    async handleDefault() {
        const token = wx.getStorageSync('token')
        let res = await request({
            url: 'https://api.it120.cc/lazyYangn/user/shipping-address/default/v2',
            data: { token },
            header: 'application/x-www-form-urlencoded',
            method: 'GET',
        })
        if (res.data.msg === '暂无数据') {
            wx.navigateTo({
                url: '/pages/addAddress/index',
            })
        } else {
            this.setData({ address: res.data.data.info })
        }
    },
    //结算
    async handleOrderPay() {
        const token = wx.getStorageSync('token')
        let { cart } = this.data
        let goodsJsonStr = []
        cart.forEach((v, i) => {
            goodsJsonStr[i] = {
                goodsId: v.goodsId,
                number: v.number,
            }
        })
        goodsJsonStr = JSON.stringify(goodsJsonStr)
        console.log(goodsJsonStr)
        let res = await request({
            url: 'https://api.it120.cc/lazyYangn/order/create',
            data: { token, goodsJsonStr },
            header: 'application/x-www-form-urlencoded',
            method: 'POST',
        }).then(
            wx.showToast({
                title: '订单创建成功',
            })
        )
        wx.navigateTo({
            url: '/pages/order/index?id=0',
        })

        //清空购物城
        this.emptyCart()
    },
    async emptyCart() {
        const token = wx.getStorageSync('token')
        let res = await request({
            url: 'https://api.it120.cc/lazyYangn/shopping-cart/empty',
            data: { token },
            header: 'application/x-www-form-urlencoded',
            method: 'POST',
        })
    },
})
