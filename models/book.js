import HTTP from "../utils/http-pro";

class BookModel extends HTTP{
    getHotList(){
        return this.request({
            url:`book/hot_list`,
        })
    }
    getBookDetail(bid){
        return this.request({
            url:`book/${bid}/detail`
        })
    }
    getLikeSatatus(bid){
        return this.request({
            url:`book/${bid}/favor`
        })
    }
    getComments(bid){
        return this.request({
            url:`book/${bid}/short_comment`
        })
    }
    updateComment(bid,comment){
        return this.request({
            url:`book/add/short_comment`,
            method:'POST',
            data:{
                book_id:bid,
                content:comment
            }
        })
    }
    search(start,q){
        return this.request({
            url:"/book/search?summary=1",
            data:{start,q}
        })
    }
    getBookCount(){
        return this.request({
            url:"/book/favor/count"
        })
    }
}
export default BookModel