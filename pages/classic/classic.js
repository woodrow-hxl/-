// pages/classic/classic.js
import ClassicModel from '../../models/classic.js'
import LikeModel from "../../models/like.js";

let classicModel = new ClassicModel();
let likeModel = new LikeModel();
Component({
  properties:{
    cid:Number,
    type:Number
  },
  data: {
    classic: null,
    first: false,
    latest: true,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  attached(options){
    const cid=this.properties.cid
    const type=this.properties.type
    if(cid){
      classicModel.getById(type,cid,res=>{
        this.updateLikeStatus(res.id,res.type)
        this.setData({
          classic: res,
          likeStatus: res.like_status,
          likeCount: res.fav_nums
        })
      })
    }else{
      classicModel.getLatest(res => {
        this.setData({
          classic: res,
          likeStatus: res.like_status,
          likeCount: res.fav_nums
        })
      })
    }
  },

  methods: {
    onLike(evt) {
      let behavior = evt.detail.behavior;
      likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
    },
    onNext() {
      this.updataClassic('next')
    },
    onPrevious() {
      this.updataClassic('previous')
    },
    updataClassic(nextOrPrevious) {
      let index = this.data.classic.index;
      classicModel.getClassic(index, nextOrPrevious, res => {
        this.updateLikeStatus(res.id, res.type)
        this.setData({
          classic: res,
          first: classicModel.isFirst(res.index),
          latest: classicModel.isLatest(res.index)
        })
      })
    },
    updateLikeStatus(artId, categoty) {
      likeModel.getClassicLikeStatus(artId, categoty, res => {
        this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
      })
    },
  }
})
