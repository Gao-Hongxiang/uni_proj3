<template>
  <view>
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
      <!-- <view>count{{$store.state.m_cart.count}}</view> -->

    </view>

    <uni-swipe-action>
      
      <block v-for="(item,i) in cart" :key="i" @click="swiptActionClickHandler(item)">
        <uni-swipe-action-item :option="option">
           <my-goods :show-num="true" :showRadio="true" :item="item" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
       
      
      </block>
      
    </uni-swipe-action>
   


  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart','count']),
    },
    data() {
      return {
      options:[{
        text:'删除',
        style:{
          backgroundColor:"#C00000"
        }
      }]
      };
    },
    methods: {
      radioChangeHandler(e) {
        // console.log(e) // 输出得到的数据 -> {goods_id: 395, goods_state: false}
        this.updateGoodsState(e)
      },
      numberChangeHandler(e) {
         this.updateGoodsCount(e)
      },
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount']),
      swipeActionClickHander(item){
        console.log(item)
      }
      
    }
  }
</script>

<style lang="scss">
  .cart-title {
    padding: 0 10px;
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #efefef;
    font-size: 14px;

    .cart-title-text {
      margin-left: 10px;
    }
  }
</style>
