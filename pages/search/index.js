// 引入用来发送请求的方法
import { request } from '../../request/index.js'
Page({
  data: {
    goods: [],
    // 输入框的值
    inputValue: '',
  },
  // 定义全局定时器
  TimeId: null,
  // 表单数据发生变化触发的事件
  handleInput(e) {
    const { value } = e.detail
    if (!value.trim()) {
      // 当输入框没有值的时候清空数组
      setTimeout(() => {
        this.setData({
          goods: [],
        })
      }, 1000)
      return
    }
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.qSearch(value)
    }, 1000)
  },
  // 发送请求
  async qSearch(query) {
    const result = await request({
      url: 'https://api.it120.cc/lazyYangn/shop/goods/list',
      data: { tagsLike: query },
      method: { method: 'post' },
    })
    // 获取数据
    let goods = result.data.data
    // 更新data中的数组
    this.setData({
      goods,
    })
  },
  
})
