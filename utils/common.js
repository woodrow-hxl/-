const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const random =function getRandom(){
    let res=''
    let n=16
    for (let i=0;i<n;i++){
        let num=Math.floor(Math.random()*chars.length)
        res+=chars[num]
    }
    return res
}
export {random}