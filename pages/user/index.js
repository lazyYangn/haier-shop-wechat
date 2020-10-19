import { request } from '../../request/index.js'

Page({
    data: {
        // 设置头像的地址
        iconAddress: '',
        // 设置用户名
        userName: '',
        // 用户信息
        userInfo: [
            { id: 0, name: '余额', value: '0.00' },
            { id: 1, name: '海尔积分', value: '0' },
            { id: 2, name: '卡', value: '0' },
            { id: 3, name: '优惠卷/码', value: '0' },
            { id: 4, name: '零钱', value: '0' },
        ],
        // 订单列表信息
        indentList: [
            { id: 0, name: '待支付', icon: 'icon-pay', url: '/pages/order/index?id=1', count: 0 },
            { id: 1, name: '待发货', icon: 'icon-send', url: '/pages/order/index?id=2', count: 0 },
            { id: 2, name: '待收货', icon: 'icon-deliver', url: '/pages/order/index?id=3', count: 0 },
            { id: 3, name: '待评价', icon: 'icon-mark', url: '/pages/order/index?id=4', count: 0 },
            { id: 4, name: '退款/售后', icon: 'icon-sponsor', url: '/pages/refund/index', count: 0 },
        ],
        // 详细信息列表
        detailList: [
            {
                id: 0,
                name: '购物车',
                icon: 'icon-cart',
                url: '/pages/cart/index',
                type: 'switchTab',
            },
            { id: 1, name: '任务中心', icon: 'icon-text', type: 'navigate' },
            {
                id: 2,
                name: '返现',
                icon: 'icon-refund',
                url: '/pages/returnMoney/index',
                type: 'navigate',
            },
            {
                id: 3,
                name: '赠品',
                icon: 'icon-present',
                type: 'navigate',
                url: '/pages/complimentary/index',
            },
        ],
        orderInfo: {},
        orderList: [],
    },
    // 获取头像
    getIcon() {
        wx.getUserInfo({
            withCredentials: 'false',
            lang: 'zh_CN',
            timeout: 10000,
            success: (result) => {
                let { iconAddress, userName } = this.data
                iconAddress = result.userInfo.avatarUrl
                userName = result.userInfo.nickName
                this.setData({
                    userName,
                    iconAddress,
                })
            },
        })
    },
    onLoad(options) {
        const token = wx.getStorageSync('token')
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index',
            })
        } else {
            this.onShow()
        }
    },
    onShow() {
        this.getOrderList()
        this.getIcon()
    },
    async getOrderList() {
        const token = wx.getStorageSync('token')
        try {
            let res = await request({
                url: 'https://api.it120.cc/lazyYangn/order/list',
                data: { token },
                method: 'POST',
                header: 'application/x-www-form-urlencoded',
            })
            console.log(res)
            this.setData({
                orderInfo: res.data.data,
                orderList: res.data.data.orderList,
            })
            this.getCount()
        } catch (error) {
            console.log(error)
        }
    },
    async getCount() {
        let { orderList, indentList } = this.data
        let status1 = 0
        let status2 = 0
        let status3 = 0
        let status4 = 0
        orderList.forEach((v) => {
            if (v.statusStr == '待支付') {
                status1++
            } else if (v.statusStr == '待发货') {
                status2++
            } else if (v.statusStr == '待收货') {
                status3++
            } else if (v.statusStr == '待评价') {
                status4++
            }
        })
        indentList.forEach((m) => {
            if (m.name == '待支付') {
                m.count = status1
            } else if (m.name == '待发货') {
                m.count = status2
            } else if (m.name == '待收货') {
                m.count = status3
            } else if (m.name == '待评价') {
                m.count = status4
            }
        })
        this.setData({
            orderList,
            indentList,
        })
    },
})
