import HTTP from "../utils/http-pro";

class KeywordModel extends HTTP{
    key='key'
    maxLength=10

    getHistory(){
        let words=wx.getStorageSync(this.key)
        if(!words){
            return []
        }
        return words
    }
    getHot(){
        return this.request({
            url:"/book/hot_keyword"
        })
    }
    addToHistory(keyword){
        let words=this.getHistory()
        const has=words.includes(keyword)
        if(!has){
            const length=words.length
            if(length>=this.maxLength){
                words.pop()
            }
            words.unshift(keyword)
            wx.setStorageSync(this.key,words)
        }
    }
}
export default KeywordModel