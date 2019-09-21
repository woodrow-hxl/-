// components/like-list/like-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: {
      type:Object,
      observer:function (newVal) {
        if(newVal){
          var textType={
            100:"电影",
            200:"音乐",
            300:"句子",
          }[newVal.type]
        }
        this.setData({
          textType
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    textType: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      this.triggerEvent('tapping',{
        id:this.properties.classic.id,
        type:this.properties.classic.type
      },{})
    }
  }
})
