import HTTP from "../utils/http.js"

class ClassicModel extends HTTP{
    getLatest(callback){
        this.request({
            url:"classic/latest",
            success:res=>{
                wx.setStorageSync(this._getkey(res.index),res);
                callback(res);
                this._setLatestIndex(res.index)
            }
        })
    }
    getMyFavor(callback){
        this.request({
            url:"classic/favor",
            success:res=>{
                callback(res)
            }
        })
    }
    getById(type,id,callback){
        this.request({
            url:`classic/${type}/${id}`,
            success:res=>{
                callback(res)
            }
        })
    }
    getClassic(index,nextOrPrevious,callback){
        let key=nextOrPrevious=='next'?this._getkey(index+1):this._getkey(index-1);
        let classic=wx.getStorageSync(key);
        if(!classic){
            this.request({
                url:`classic/${index}/${nextOrPrevious}`,
                success:res=>{
                    wx.setStorageSync(this._getkey(res.index),res);
                    callback(res)
                }
            })
        }else{
            callback(classic)
        }
    }
    isFirst(index){
        return index==1? true:false
    }
    isLatest(index){
        return index==this._getLatestIndex()?true:false
    }
    _setLatestIndex(index){
        wx.setStorageSync('latest',index)
    }
    _getLatestIndex(){
        const index=wx.getStorageSync('latest');
        return index
    }
    _getkey(index){
        let key=`classic-${index}`;
        return key
    }
}

export default ClassicModel