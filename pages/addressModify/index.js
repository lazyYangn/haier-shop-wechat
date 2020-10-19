// pages/addAddress/index.js
import { request } from '../../request/index.js'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        region: ['广东省', '广州市', '海珠区'],
        addressList: [],
        id: '',
        index: '',
    },
    address: { address: '', cityId: '', linkMan: '', mobile: '', provinceId: '', isDefault: false },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getAddressList()
        this.setData({
            id: options.id,
            index: options.index,
        })
    },
    onShow() {
        this.getAddressList()
        let { index, addressList } = this.data
        this.address = { ...addressList[index] }
    },
    switch1Change() {
        this.address.isDefault = !this.address.isDefault
        // console.log(this.address.isDefault)
    },
    inputUserName(e) {
        this.address.linkMan = e.detail.value
    },
    inputTel(e) {
        this.address.mobile = e.detail.value
    },
    inputAddress(e) {
        this.address.address = e.detail.value
    },
    bindRegionChange: function (e) {
        this.setData({
            region: e.detail.value,
        })
        this.address.cityId = e.detail.value[1]
        this.address.provinceId = e.detail.value[0]
    },
    async getAddressList() {
        const token = wx.getStorageSync('token')
        let res = await request({
            url: 'https://api.it120.cc/lazyYangn/user/shipping-address/list',
            data: { token },
            header: 'application/x-www-form-urlencoded',
            method: 'GET',
        })
        this.setData({
            addressList: res.data.data,
        })
    },
    async modifyAddressInfo() {
        const token = wx.getStorageSync('token')
        const addressParms = {
            ...this.address,
            token,
            id: this.data.id,
        }
        let res = await request({
            url: 'https://api.it120.cc/lazyYangn/user/shipping-address/update',
            data: addressParms,
            header: 'application/x-www-form-urlencoded',
            method: 'POST',
        }).then(this.getAddressList())
        wx.navigateBack({
            delta: 1,
        })
    },
})
