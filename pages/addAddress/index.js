// pages/addAddress/index.js
import { request } from '../../request/index.js'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        region: ['广东省', '广州市', '海珠区'],
    },
    address: { address: '', cityId: '', linkMan: '', mobile: '', provinceId: '', isDefault: true },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow() {},
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
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value,
        })
        this.address.cityId = e.detail.value[1]
        this.address.provinceId = e.detail.value[0]
    },
    async addAddressInfo(e) {
        const token = wx.getStorageSync('token')
        const addressParms = {
            ...this.address,
            token,
        }
        await request({
            url: 'https://api.it120.cc/lazyYangn/user/shipping-address/add',
            data: addressParms,
            header: 'application/x-www-form-urlencoded',
            method: 'post',
        })
        wx.navigateBack({
            delta: 1,
        })
    },
})
