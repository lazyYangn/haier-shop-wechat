import { request } from '../../request/index.js'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        orderId: '',
        statusStr: '',
        orderNumber: '',
        orderInfo: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { orderId, statusStr, orderNumber } = options
        this.setData({
            orderId,
            statusStr,
            orderNumber,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getOrderList()
    },
    async getOrderList() {
        const token = wx.getStorageSync('token')
        let res = await request({
            url: 'https://api.it120.cc/lazyYangn/order/list',
            data: { token },
            method: 'POST',
            header: 'application/x-www-form-urlencoded',
        })
        console.log(res)
        this.setData({
            orderInfo: res.data.data,
        })
    },
})
