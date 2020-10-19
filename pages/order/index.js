import { request } from '../../request/index.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {
                id: 0,
                value: '全部',
                isActive: true,
            },
            {
                id: 1,
                value: '待付款',
                isActive: false,
            },
            {
                id: 2,
                value: '待发货',
                isActive: false,
            },
            {
                id: 3,
                value: '待收货',
                isActive: false,
            },
            {
                id: 4,
                value: '待评价',
                isActive: false,
            },
        ],
        projectList: [],
        orderList: [],
        orderInfo: {},
    },
    onLoad: function (options) {
        const id = parseInt(options.id)
        let { tabs } = this.data
        tabs.forEach((v, i) => (i === id ? (v.isActive = true) : (v.isActive = false)))
        this.setData({
            tabs,
        })
        this.getProject()
        this.getOrderList()
    },
    onShow() {
        this.getOrderList()
    },
    async getOrderList() {
        try {
            const token = wx.getStorageSync('token')
            let res = await request({
                url: 'https://api.it120.cc/lazyYangn/order/list',
                data: { token, statusBatch: [0, 1, 2, 3] },
                method: 'POST',
                header: 'application/x-www-form-urlencoded',
            })
            console.log(res)
            if (res.data.msg == '暂无数据') {
                this.setData({
                    orderInfo: {},
                    orderList: [],
                })
                return
            } else {
                this.setData({
                    orderInfo: res.data.data,
                    orderList: res.data.data.orderList,
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    // 父组件的事件
    handleItemChangeTap(e) {
        const { index } = e.detail
        let { tabs } = this.data
        tabs.forEach((v, i) => (i === index ? (v.isActive = true) : (v.isActive = false)))
        this.setData({
            tabs,
        })
    },
    // 获取商品展示信息
    async getProject() {
        const result = await request({
            url: 'https://api.it120.cc/lazyYangn/shop/goods/list',
        })
        let projectList = result.data.data
        this.setData({ projectList })
    },
    async handlePay(e) {
        //获取要支付的订单
        // console.log(e)
        const orderId = e.currentTarget.dataset.id
        const token = wx.getStorageSync('token')
        let res = await request({
            url: 'https://api.it120.cc/lazyYangn/order/pay',
            data: { token, orderId },
            method: 'POST',
            header: 'application/x-www-form-urlencoded',
        }).then(this.getOrderList())
    },
    async handleSubmit(e) {
        const orderId = e.currentTarget.dataset.id
        const token = wx.getStorageSync('token')
        let res = await request({
            url: 'https://api.it120.cc/lazyYangn/order/delivery',
            data: { token, orderId },
            method: 'POST',
            header: 'application/x-www-form-urlencoded',
        }).then(this.getOrderList())
    },
    async handleCancel(e) {
        //获取要支付的订单
        // console.log(e)
        const orderId = e.currentTarget.dataset.id
        const token = wx.getStorageSync('token')
        let res = await request({
            url: 'https://api.it120.cc/lazyYangn/order/delete',
            data: { token, orderId },
            method: 'POST',
            header: 'application/x-www-form-urlencoded',
        }).then((res) => {
            console.log(res)
            this.getOrderList()
        })
    },
    async handleClose(e) {
        const orderId = e.currentTarget.dataset.id
        const token = wx.getStorageSync('token')
        let res = await request({
            url: 'https://api.it120.cc/lazyYangn/order/delete',
            data: { token, orderId },
            method: 'POST',
            header: 'application/x-www-form-urlencoded',
        }).then((res) => {
            console.log(res)
            this.getOrderList()
        })
    },
})
