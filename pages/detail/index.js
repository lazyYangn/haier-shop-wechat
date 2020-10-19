import { request } from '../../request/index.js'
const WXAPI = require('apifm-wxapi')
WXAPI.init('lazyYangn')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        goodsDetail: [],
        goodsInfo: {},
    },
    newGoodsInfo: {
        goods_id: '',
        goods_num: 0,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { id } = options
        // console.log(id)
        this.getData(id)
    },

    async getData(id) {
        let res = await request({
            url: 'https://api.it120.cc/lazyYangn/shop/goods/detail',
            data: { id },
            method: { method: 'get' },
        })
        this.setData({
            goodsDetail: {
                pics: res.data.data.pics,
                basicInfo: res.data.data.basicInfo,
                content: res.data.data.content.replace(/\.jpg/g, '.jpg" width="100%" height="auto"'),
            },
            goodsInfo: res.data.data.basicInfo,
        })
        this.newGoodsInfo.goods_id = this.data.goodsInfo.id
        this.newGoodsInfo.goods_num = 1
    },
    handleCartAdd() {
        //判断有没有token
        let token = wx.getStorageSync('token')
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index',
            })
        } else {
            const cartParam = {
                goodsId: this.newGoodsInfo.goods_id,
                number: this.newGoodsInfo.goods_num,
                token,
            }
            wx.request({
                url: 'https://api.it120.cc/lazyYangn/shopping-cart/add',
                data: cartParam,
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                method: 'post',
                success: (result) => {
                    console.log(result)
                    wx.showToast({
                        title: '加入购物车成功',
                        icon: 'success',
                    })
                },
            })
        }
    },
    async buyNow() {
        const token = wx.getStorageSync('token')
        let goodsJsonStr = []
        goodsJsonStr[0] = { goodsId: this.data.goodsInfo.id, number: 1 }
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
    },
})
