// components/search/search.js
import KeywordModel from "../../models/keyword.js"
import BookModel from "../../models/book";

const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        more: {
            type: String,
            observer: "loadMore"
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotKeywords: [],
        dataArray: [],
        searching: false,
        words: '',
        total: null,
        loading: false,
        loadingCenter: false,
        noResult: false
    },

    attached() {
        this.setData({
            historyWords: keywordModel.getHistory()
        })
        keywordModel.getHot()
            .then(res => {
                this.setData({
                    hotKeywords: res.hot
                })
            })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onConfirm(eve) {
            const q = eve.detail.value || eve.detail.text
            if (!q) {
                wx.showToast({
                    title: "请输入查询内容",
                    icon: "none"
                })
                return
            }
            this.setData({
                searching: true,
                words: q,
                loadingCenter: true
            })
            bookModel.search(0, q).then(res => {
                this.hasTotal(res)
                keywordModel.addToHistory(q)
            })
        },
        hasTotal(res) {
            this.setData({
                dataArray: res.books,
                loadingCenter: false,
            })
            this.data.total=res.total
            if (res.total == 0) {
                this.setData({
                    noResult: true
                })
            }
        },
        onCancel() {
            this.setData({
                dataArray: [],
                loadingCenter: false,
                loading: false
            })
            this.triggerEvent('cancel', {}, {})
        },
        onDelete(eve) {
            this.setData({
                words: '',
                searching: false,
                loading: false,
                dataArray: [],
                loadingCenter: false
            })
        },
        loadMore() {
            if (this.data.dataArray.length == this.data.total) {
                return
            }
            if (this.data.loading || this.data.words == '') {
                return
            }
            this.setData({
                loading: true
            })
            bookModel.search(this.data.dataArray.length, this.data.words)
                .then(res => {
                    const array = this.data.dataArray.concat(res.books)
                    this.setData({
                        dataArray: array,
                        loading: false
                    })
                }, () => {
                    this.setData({
                        loading: false
                    })
                })
        }
    }
})
