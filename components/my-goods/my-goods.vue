<template>

  <view class="goods-item">
    <view class="goods-item-left">
      <radio :checked="item.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image class="good-pic" :src="item.goods_small_logo||defaultPic"></image>

    </view>
    <view class="goods-item-right">
      <view class="goods-name">
        {{item.goods_name}}
      </view>

      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">￥{{item.goods_price | toFixed}}</view>
        <!-- 商品数量 -->
        <uni-number-box  v-if="showNum" :min="1" :value="item.goods_count" @change="numChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>

</template>

<script>
  export default {
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    props: {
      item: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        dafault: false
      },
      showNum: {
        type: Boolean,
        dafault: false
      }
    },
    filters: {
      toFixed(num) {
        return Number(num).toFixed(2)

      }
    },
    methods: {
      radioClickHandler() {
        // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
        // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
        this.$emit('radio-change', {
          // 商品的 Id
          goods_id: this.item.goods_id,
          // 商品最新的勾选状态
          goods_state: !this.item.goods_state
        })
      },
      numChangeHandler(val){
        this.$emit('num-change',{
          goods_id:this.item.goods_id,
          goods_count:+val
        })
        
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    padding: 5px 5px;
    display: flex;
    border-bottom: 1px solid #efefef;

    .goods-item-left {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 5px;

      .good-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 12px;
        padding-top: 10px;
      }

      .goods-info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .good-price {
          font-size: 16px;
          color: #c00000;
        }
      }

    }
  }
</style>
