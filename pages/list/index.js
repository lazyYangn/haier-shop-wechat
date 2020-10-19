import { request } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true,
      },
      {
        id: 1,
        value: '销量',
        isActive: false,
      },
      {
        id: 2,
        value: '价格',
        isActive: false,
      },
      {
        id: 3,
        value: '上新',
        isActive: false,
      },
    ],
    aryList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id } = options
    this.getData(id)
  },
  async getData(categoryId) {
    let res = await request({
      url: 'https://api.it120.cc/lazyYangn/shop/goods/list',
      data: { categoryId },
      method: { method: 'post' },
    })
    let aryList = res.data.data
    this.setData({
      aryList,
    })
  },

  // 父组件的事件
  handleItemChangeTap(e) {
    // console.log(e)
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => (i === index ? (v.isActive = true) : (v.isActive = false)))
    this.setData({
      tabs,
    })
  },
})
