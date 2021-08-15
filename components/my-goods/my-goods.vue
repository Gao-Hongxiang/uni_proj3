<template>
	
		<view class="goods-item">
		  <view class="goods-item-left">
		    <image class="good-pic" :src="item.goods_small_logo||defaultPic"></image>
		
		  </view>
		  <view class="goods-item-right">
		    <view class="goods-name">
		      {{item.goods_name}}
		    </view>
		    <view class="good-price">
		      ￥{{item.goods_price | toFixed}}
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
    props:{
      item:{
        type:Object,
        default:{}
      }
    },
    filters:{
      toFixed(num){
       return Number(num).toFixed(2)
        
      }
    }
	}
</script>

<style lang="scss">


    .goods-item {
      padding: 5px 5px;
      display:flex;
      border-bottom: 1px solid #efefef;
      .goods-item-left {
        margin-right: 5px;
        .good-pic {
          width: 100px;
          height: 100px;
          display: block;
        }
      }
      .goods-item-right {
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        
        .goods-name {
          font-size: 12px;
          padding-top: 10px;
        }

        .good-price {
          font-size: 16px;
          color: #c00000;
        }
      }
    }
  
</style>
