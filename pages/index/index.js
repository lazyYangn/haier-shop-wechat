// 引入用来发送请求的方法
import { request } from '../../request/index.js'
const WXAPI = require('apifm-wxapi')
WXAPI.init('lazyYangn')
Page({
  data: {
    // 导航栏列表
    iconsList: [],
    // 楼层列表
    floorList: [],
    // 首页商品展示列表
    showList: {
      // 空调
      airConditioner: [],
      // 冰箱
      refrigerator: [],
      // 洗衣机
      washingMachine: [],
      // 电视
      television: [],
      // 热水器
      waterHeater: [],
      // 冷柜
      freezer: [],
      // 厨电
      kitchenAppliance: [],
    },
    // 是否显示侧边栏
    isShowAside: false,
    // 是否显示底部弹窗
    showModalStatus: false,
    // 底部弹窗显示信息
    bottomShow: {},
    // 商品颜色
    projectColor: '',
  },
  onLoad() {
    // 获取轮播图
    this.getSwiper()
    // 获取导航图
    this.getIcons()
    // 获取楼层信息
    this.getFloor()
    // 获取商品展示信息
    this.getProject()
  },
  // 获取轮播图
  getSwiper() {
    WXAPI.banners().then((res) => {
      if (res.code == 0) {
        this.setData({ banners: res.data })
      }
    })
  },
  // 获取导航图
  async getIcons() {
    const result = await request({
      url: 'https://api.it120.cc/lazyYangn/shop/goods/category/all',
    })
    let iconsList = []
    // 将获取到的数据进行筛选 选出icons图标
    result.data.data.filter((res) => {
      if (res.key === 'navbar') {
        iconsList.push(res)
      }
    })
    // 将筛选后的数据存到data中
    this.setData({
      iconsList,
    })
  },
  // 获取楼层信息
  async getFloor() {
    const result = await request({
      url: 'https://api.it120.cc/lazyYangn/cms/category/list',
    })
    let floorList = result.data.data
    // 将筛选后的数据存到data中
    this.setData({
      floorList,
    })
  },
  // 获取商品展示信息
  async getProject() {
    const result = await request({
      url: 'https://api.it120.cc/lazyYangn/shop/goods/list',
    })
    let showList = this.data.showList
    result.data.data.filter((res) => {
      if (res.barCode === 'kt') {
        showList.airConditioner.push(res)
      } else if (res.barCode === 'bx') {
        showList.refrigerator.push(res)
      } else if (res.barCode === 'xyj') {
        showList.washingMachine.push(res)
      } else if (res.barCode === 'ds') {
        showList.television.push(res)
      } else if (res.barCode === 'rsq') {
        showList.waterHeater.push(res)
      } else if (res.barCode === 'bg') {
        showList.freezer.push(res)
      } else if (res.barCode === 'cd') {
        showList.kitchenAppliance.push(res)
      } else {
        return
      }
    })
    this.setData({ showList })
  },
  // 侧边栏的点击事件
  handleClick() {
    let { isShowAside } = this.data
    isShowAside = !isShowAside
    this.setData({ isShowAside })
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true,
      })
    } else {
      this.setData({
        floorstatus: false,
      })
    }
  },
  //回到顶部
  goTop: function (e) {
    // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
  },
  // 底部弹窗
  // 点击添加购物车
  async handleAddCartClick(e) {
    const id = e.target.dataset.index
    const result = await request({
      url: `https://api.it120.cc/lazyYangn/shop/goods/detail?id=${id}`,
    })
    let { showModalStatus } = this.data
    this.setData({
      showModalStatus: !showModalStatus,
      bottomShow: result.data.data.basicInfo,
      projectColor: result.data.data.properties[0].childsCurGoods[0].name,
    })
  },
  handleCancelClick() {
    let { showModalStatus } = this.data
    this.setData({
      showModalStatus: !showModalStatus,
      projectColor: '',
    })
  },
})
