import { request } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftMenu: [],
    saloonMenu: [],
    kitchenMenu: [],
    tolietMenu: [],
    curtIndex: 0,
    scrollTop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  async getData() {
    let res = await request({
      url: 'https://api.it120.cc/lazyYangn/shop/goods/category/all',
    })
    let leftMenu = []
    let saloonMenu = []
    let kitchenMenu = []
    let tolietMenu = []
    res.data.data.forEach((v) => {
      if (v.key === 'category') {
        leftMenu.push(v)
      }
    })
    res.data.data.filter((e) => {
      if (e.pid === 139951) {
        saloonMenu.push(e)
      } else if (e.pid === 139952) {
        kitchenMenu.push(e)
      } else if (e.pid === 139953) {
        tolietMenu.push(e)
      }
    })
    this.setData({
      leftMenu,
      saloonMenu,
      kitchenMenu,
      tolietMenu,
    })
  },
  handleChange(e) {
    let curtIndex = e.currentTarget.dataset.index
    this.setData({
      curtIndex,
    })
  },
})
