// pages/add/index.js
import { request } from '../../request/index.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        cart: [],
        startX: 0, //开始坐标
        startY: 0,
        carInfo: {},
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
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
        //获取购物车中的数据
        //获取token
        this.getData()
        this.getCartInfo()
    },
    //手指触摸动作开始 记录起点X坐标

    touchstart: function (e) {
        //开始触摸时 重置所有删除
        this.data.cart.forEach(function (v, i) {
            if (v.isTouchMove)
                //只操作为true的
                v.isTouchMove = false
        })
        this.setData({
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY,
            cart: this.data.cart,
        })
    },

    //滑动事件处理

    touchmove(e) {
        let index = e.currentTarget.dataset.index //当前索引
        let startX = this.data.startX //开始X坐标
        let startY = this.data.startY //开始Y坐标
        let touchMoveX = e.changedTouches[0].clientX //滑动变化坐标
        let touchMoveY = e.changedTouches[0].clientY //滑动变化坐标
        //获取滑动角度
        let angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY })
        this.data.cart.forEach(function (v, i) {
            v.isTouchMove = false
            //滑动超过30度角 return
            if (Math.abs(angle) > 30) return
            if (i == index) {
                if (touchMoveX > startX)
                    //右滑
                    v.isTouchMove = false
                //左滑
                else v.isTouchMove = true
            }
        })
        //更新数据
        this.setData({
            cart: this.data.cart,
        })
    },

    /**
  
  * 计算滑动角度
*/
    angle: function (start, end) {
        var _X = end.X - start.X,
            _Y = end.Y - start.Y

        //返回角度 /Math.atan()返回数字的反正切值

        return (360 * Math.atan(_Y / _X)) / (2 * Math.PI)
    },

    //删除事件

    del(e) {
        this.remove(e.currentTarget.dataset.key)
    },
    async remove(key) {
        console.log(key)
        const token = wx.getStorageSync('token')
        const res = await request({
            url: 'https://api.it120.cc/lazyYangn/shopping-cart/remove',
            data: { token, key },
            header: 'application/x-www-form-urlencoded',
            method: 'POST',
        })
        // console.log(res)
        if (res.data.code != 0 && res.data.code != 700) {
        } else {
            this.getCartInfo()
        }
    },
    async handleChangeNumjian(e) {
        const { cart } = this.data
        const { index, key } = e.currentTarget.dataset
        const number = cart[index].number - 1
        if (number <= 0) {
            //提示删除
            wx.showModal({
                content: '确定要删除吗?',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (result) => {
                    if (result.confirm) {
                        this.remove(key)
                    }
                },
            })
            return
        }
        const token = wx.getStorageSync('token')
        const res = await request({
            url: 'https://api.it120.cc/lazyYangn/shopping-cart/modifyNumber',
            data: { token, number, key },
            header: 'application/x-www-form-urlencoded',
            method: 'POST',
        })
        // console.log(res)
        this.getCartInfo()
    },
    async handleChangeNumjia(e) {
        const { cart } = this.data
        const { index, key } = e.currentTarget.dataset
        const number = cart[index].number + 1
        const token = wx.getStorageSync('token')
        const res = await request({
            url: 'https://api.it120.cc/lazyYangn/shopping-cart/modifyNumber',
            data: { token, number, key },
            header: 'application/x-www-form-urlencoded',
            method: 'POST',
        })
        // console.log(res)
        this.getCartInfo()
    },
    async changeCartNumber(e) {
        const { key } = e.currentTarget.dataset
        const token = wx.getStorageSync('token')
        const number = e.detail.value
        const res = await request({
            url: 'https://api.it120.cc/lazyYangn/shopping-cart/modifyNumber',
            data: { token, number, key },
            header: 'application/x-www-form-urlencoded',
            method: 'POST',
        })
        this.getCartInfo()
    },
    async getCartInfo() {
        const token = wx.getStorageSync('token')
        const res = await request({
            url: 'https://api.it120.cc/lazyYangn/shopping-cart/info',
            data: { token },
            header: 'application/x-www-form-urlencoded',
            method: 'GET',
        })
        // console.log(res)
        if (res.data.code == 0) {
            this.setData({
                carInfo: res.data.data,
                cart: res.data.data.items,
            })
        } else {
            this.setData({
                carInfo: {},
                cart: [],
            })
        }
    },
    async getData() {
        let res = await request({
            url: 'https://api.it120.cc/lazyYangn/shop/goods/list',
            method: { method: 'POST' },
            data: { tagsLike: '海尔' },
        })
        this.setData({ goodsList: res.data.data })
    },
    async handlepay(e) {
        //跳转到结算页面
        wx.navigateTo({
            url: '/pages/pay/index',
        })
    },
})
