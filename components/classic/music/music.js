// components/classic/music/music.js
import classicBeh from "../classic-beh";
const audioManager=wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[classicBeh],
  properties: {
    src:String,
    content:String,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    playSrc:"images/player@play.png",
    pauseSrc:"images/player@pause.png"
  },

  attached(){
    this.recoverStatus()
    this.monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(){
      if(!this.data.playing){
        this.setData({
          playing:true
        })
        audioManager.src=this.properties.src
        audioManager.title=this.properties.title
      }else{
        this.setData({
          playing:false
        })
        audioManager.pause()
      }
    },
    recoverStatus(){
      if(audioManager.paused){
        this.setData({
          playing:false
        })
        return
      }
      if(audioManager.src==this.properties.src){
        this.setData({
          playing:true
        })
      }
    },
    monitorSwitch(){
      audioManager.onPlay(()=>{
        this.recoverStatus()
      })
      audioManager.onPause(()=>{
        this.recoverStatus()
      })
      audioManager.onStop(()=>{
        this.recoverStatus()
      })
      audioManager.onEnded(()=>{
        this.recoverStatus()
      })
    }

  }
});
