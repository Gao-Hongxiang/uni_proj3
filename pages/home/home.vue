<template>
  <view>
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
          <navigator class="swiper-item" open-type="navigate" :url="'/subpkg/goods_ditail/goods_ditail?goods_id=' + item.goods_id">
             
          <!-- 动态绑定图片的 src 属性 -->
             <image :src="item.image_src"></image>
            </navigator>
      </swiper-item>
    </swiper>
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
        <image class="nav-img" :src="item.image_src">

        </image>
      </view>
    </view>
    <!-- 楼层 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item,i) in floorList" :key="i">
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <view class="floor-img-box">
          <navigator class="left-img-box" :url="item.product_list[0].url" open-type="navigate">
            <image :src="item.product_list[0].image_src" mode="widthFix" :style="{width:item.product_list[0].image_width + 'rpx'}"></image>
          </navigator>
          <view class="right-img-box">
            <navigator class="right-img-item" :url="item2.url" v-for="(item2,index2) in item.product_list" :key="index2"
              v-if="index2 !== 0">
              <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
            </navigator>
          </view>

        </view>
      </view>

    </view>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix],
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      }
    },
    onLoad() {
      this.getSwiperList(),
        this.getNavList(),
        this.getFloorList()

    },
    methods: {

      async getSwiperList() {
        console.log(1)
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        // console.log(res)
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        // 3.3 请求成功，为 data 中的数据赋值
        this.swiperList = res.message
        // uni.$showMsg("成功")
      },
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        // console.log(res)
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message

      },
      navClickHandler(item) {
        // console.log(item)
        if (item.name === '分类') {
          // if (item.name === '分类') {
          // console.log(1)
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }

      },
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        // console.log(res)
        if (res.meta.status !== 200) return uni.showMsg()
        res.message.forEach(floor => {
          floor.product_list.forEach(prod => {
            prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message

      },
      gotoSearch() {
        // console.log(1)
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    },
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }

  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }

  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>
