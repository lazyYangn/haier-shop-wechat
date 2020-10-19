Page({
  data: {
    findList: [
      {
        id: 0,
        date: '4月14日',
        likeNum: 3,
        title: '养娃就是升级打怪',
        text: '为新手妈妈准备的【王者装备】都在这里了',
        mainImg: 'https://ae01.alicdn.com/kf/Hce7df8d365b14297b71582dca6222afdT.jpg',
        productImg: 'https://ae01.alicdn.com/kf/Hb955485f65d547469ba2a321642f179dd.jpg',
        imgText: '节能风小1.5匹壁挂式定频空调KFR-32GW/05GDS33',
        price: '4099.00',
        // 判断是否点赞
        isLike: false,
        // 点赞字体样式
        fontStyle: '',
        projectId: '466779',
        url: '/pages/pessage/index',
      },
      {
        id: 1,
        date: '4月10日',
        likeNum: 2,
        title: '打造春日舒适家居生活,尽在海尔家电!',
        text: '',
        mainImg: 'https://ae01.alicdn.com/kf/H46887124c59f406b9b3dafb99e5edddb4.jpg',
        productImg: 'https://ae01.alicdn.com/kf/H4551398021dd4d8bb0052768da5bae55A.jpg',
        imgText: 'Haier/海尔BCD-470WDPG+字对开门风冷静音-级节能家用官方冰箱',
        price: '4599.00',
        isLike: false,
        fontStyle: '',
        projectId: '466873',
        url: '/pages/pessage1/index',
      },
      {
        id: 2,
        date: '4月10日',
        likeNum: 3,
        title: '焕新家电,乐享肥宅生活',
        text: '作为现代人,家电或许是生活中必不可少的,只要选择合适的家电,生活就会大不同!',
        mainImg: 'https://ae01.alicdn.com/kf/Hdd14a11f8df94a2f808881322a79369aM.jpg',
        productImg: 'https://ae01.alicdn.com/kf/H47dc81bcb0744188976509ca2efbc06ai.jpg',
        imgText: '海尔10kg变频滚筒洗衣机全自动家用洗烘干一体机EG10014HB939SU1',
        price: '4199.00',
        isLike: false,
        fontStyle: '',
        projectId: '466897',
        url: '/pages/pessage2/index',
      },
    ],
  },
  handleClick(e) {
    let { findList } = this.data
    // 获取点击的id索引
    let { index } = e.target.dataset
    // 根据点击的索引对所有的数据进行筛选，找出点击的事件
    findList.filter((res) => {
      // 判断点击的事件的点赞属性是否为true 如果不为true则点赞的数量加1，点赞属性取反,并且点赞图标的样式属性发生改变,如果为true则点赞的数量减一，点赞图标的样式属性改为空
      if (res.id === index && res.isLike === false) {
        res.likeNum++
        res.isLike = !res.isLike
        res.fontStyle = 'redfont'
        this.setData({ findList })
      } else if (res.id === index && res.isLike === true) {
        res.likeNum--
        res.isLike = !res.isLike
        res.fontStyle = ''
        this.setData({ findList })
      } else {
        return
      }
    })
  },
})
