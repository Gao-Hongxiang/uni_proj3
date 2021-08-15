<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>

    <view class="sugg-list"  v-if="searchResults.length">
      <view class="sugg-item" @click="gotoDetail(item.goods_id)" v-for="(item,index) in searchResults" :key="index">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>

    <view class="history-box" v-else> 
      <view class="history-title">
        <test>搜索历史</test>
        <uni-icons type="trash" @click="cleanHistory" size="17"></uni-icons>

      </view>
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)">
        </uni-tag>

      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        searchResults: [],
        historyList: []
      };
    },
    onLoad() {
     this.historyList = JSON.parse(uni.getStorageSync('kw')||'[]')
    },
    methods: {
      input(e) {
        clearTimeout(this.timer)
        // console.log(e.value)
        this.timer = setTimeout(() => {
          this.kw = e.value
          // console.log(this.kw)
          this.getSearchList()
        }, 500)
      },
      async getSearchList() {
        if (this.kw == "") {
          this.searchResults = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        // console.log(res)
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.searchResults = res.message
        this.saveSearchHistory()
      },
      cleanHistory() {
        this.historyList = []
        uni.setStorageSync('kw','[]')
      },
      gotoDetail(id) {
        console.log(1)
        uni.navigateTo({
          // 指定详情页面的 URL 地址，并传递 goods_id 参数
          url: '/subpkg/goods_ditail/goods_ditail?good_id=' + id
        })
      },
      saveSearchHistory(){
        // this.historyList.push(this.kw)
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      gotoGoodsList(kw) {
         uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    },
    computed:{
      historys() {
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .sugg-list {
    padding: 0 10px;

    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      display: flex;
      // height: 40px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #efefef;

      .goods-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      padding: 0 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>
