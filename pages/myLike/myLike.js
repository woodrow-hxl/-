// pages/myLike/myLike.js
import ClassicModel from "../../models/classic";
import BookModel from "../../models/book";
const classicModel=new ClassicModel()
const bookModel=new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    login: false,
    bookCount:0,
    classic:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSettingInfo()
    this.getMyFavor()
    this.getBookCount()
  },
  getBookCount(){
    bookModel.getBookCount().then(res=>{
      this.setData({
        bookCount:res.count
      })
    })
  },
  getSettingInfo(){
    wx.getSetting({
      success:res=>{
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:res=>{
              this.setData({
                login:true,
                userInfo:res.userInfo
              })
            }
          })
        }
      }
    })
  },
  getUserInfo(eve){
    const userInfo=eve.detail.userInfo
    if(userInfo){
      this.setData({
        userInfo,
        login:true
      })
    }
  },
  getMyFavor(){
    classicModel.getMyFavor(res=>{
      this.setData({
        classic:res
      })
    })
  },
  onTapping(event){
    const cid=event.detail.id
    const type=event.detail.type
    wx.navigateTo({
      url:`/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})