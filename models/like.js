import HTTP from "../utils/http";

class LikeModel extends HTTP{
    like(behaivor,artId,category){
        let url=behaivor=='like'?'like':'like/cancel';
        this.request({
            url:url,
            method:'POST',
            data:{
                art_id:artId,
                type:category
            }
        })
    }
    getClassicLikeStatus(artId,category,callback){
        this.request({
            url:`classic/${category}/${artId}/favor`,
            success:res=>{
                callback(res)
            }
        })
    }
}

export default LikeModel