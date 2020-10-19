import { request } from '../../request/index.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        addressList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.onShow()
    },
    onShow() {
        this.getAddressList()
    },
    async getAddressList() {
        const token = wx.getStorageSync('token')
        let res = await request({
            url: 'https://api.it120.cc/lazyYangn/user/shipping-address/list',
            method: 'GET',
            header: 'application/x-www-form-urlencoded',
            data: { token },
        })
        this.setData({
            addressList: res.data.data,
        })
    },
    async addAddress() {
        wx.navigateTo({
            url: '/pages/addAddress/index',
        })
    },
    async addressModify(e) {
        wx.navigateTo({
            url: '/pages/addressModify/index?' + 'id=' + e.currentTarget.dataset.id + '&index=' + e.currentTarget.dataset.index,
        })
        this.getAddressList()
    },
    async addressRemove(e) {
        const token = wx.getStorageSync('token')
        const { id } = e.currentTarget.dataset
        await request({
            url: 'https://api.it120.cc/lazyYangn/user/shipping-address/delete',
            method: 'POST',
            header: 'application/x-www-form-urlencoded',
            data: { token, id },
        }).then(this.getAddressList())
    },
})
