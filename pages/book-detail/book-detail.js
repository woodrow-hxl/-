// pages/book-detail/book-detail.js
import BookModel from "../../models/book";
import LikeModel from "../../models/like";
const bookModel=new BookModel()
const likeModel=new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:true,
    detail:null,
    likeStatus: false,
    likeCount:0,
    comments:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const bid=options.bid
    const detail=bookModel.getBookDetail(bid)
    const likeStatus=bookModel.getLikeSatatus(bid)
    const comments=bookModel.getComments(bid)
    Promise.all([detail,likeStatus,comments])
        .then(res=>{
          this.setData({
            detail:res[0],
            likeStatus:res[1].like_status,
            likeCount:res[1].fav_nums,
            comments:res[2].comments
          })
          wx.hideLoading()
        })
    // detail.then(res=>{
    //   this.setData({
    //     detail:res
    //   })
    // })
    // likeStatus.then(res=>{
    //   this.setData({
    //     likeStatus:res.like_status,
    //     likeCount:res.fav_nums
    //   })
    // })
    // comments.then(res=>{
    //   this.setData({
    //     comments:res.comments
    //   })
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onLike(eve){
    const behavior=eve.detail.behavior
    likeModel.like(behavior,this.data.detail.id,400)
  },
  onInput(){
    this.setData({
      show:!this.data.show
    })
  },
  onPost(event){
    const comment=event.detail.text||event.detail.value
    if(!comment){
      return
    }
    if(comment.length>12){
      wx.showToast({
        title:"短评最多12个字",
        icon:"none"
      })
      return
    }
    bookModel.updateComment(this.data.detail.id,comment)
        .then(res=>{
          wx.showToast({
            title:"+1",
            icon:"none"
          })
          this.data.comments.unshift({
            content:comment,
            nums:1
          })
          this.setData({
            comments:this.data.comments,
            show:!this.data.show
          })
        })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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