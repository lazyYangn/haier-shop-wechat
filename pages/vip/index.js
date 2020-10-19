// pages/vip/index.js
Page({
  data: {
    // 设置头像的地址
    iconAddress: '',
    // 设置用户名
    userName: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIcon()
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
})
