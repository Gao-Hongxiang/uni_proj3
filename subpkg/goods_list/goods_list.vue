<template>
  <view>
    <view class="goods-list">
     <view  v-for="(item,index) in goodsList" :key="index" @click="gotoDetail(item)">
       <my-goods :item="item"></my-goods>
     </view>

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        onLoading:false
        
      };
    },
    onReachBottom(){
      if(this.queryObj.pagesize*this.queryObj.pagenum >= this.total) return uni.$showMsg('数据加载完毕')
      if(this.onLoading) return
       this.queryObj.pagenum++
      this.getGoodsList()
    },
    onLoad(option) {
      this.queryObj.query = option.query || ''
      this.queryObj.cid = option.cid || ''
      this.getGoodsList()

    },
    methods: {
      async getGoodsList(cb) {
        this.onLoading = true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        cb&&cb()
         this.onLoading = false
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.total = res.message.total

      },
      gotoDetail(item){
        uni.navigateTo({
          url:'/subpkg/goods_ditail/goods_ditail?goods_id='+item.goods_id
        })
      }
    },
    onPullDownRefresh(){
      this.total = 0;
      this.onLoading = false
      this.queryObj.pagenum = 1
      this.goodsList = []
      this.getGoodsList(()=>{
        uni.stopPullDownRefresh()
      })
    }
  }
</script>

<style lang="scss">
  

  </style>
