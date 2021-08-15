<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchBoxHandler">
    <view class="my-search-box" :style="{'border-radius':radius+'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
		
	</view>
</template>

<script>
	export default {
    props:{
      bgcolor:{
        type:String,
        default:'#c00000'
      },
      radius:{
        type:Number,
        default:18
      }
    },
		data() {
			return {
				
			};
		},
    methods:{
      searchBoxHandler(){
        this.$emit('click')
      }
    }
	}
</script>

<style lang="scss">
.my-search-container{
  height: 50px;
  // background-color: #C00000;
  display: flex;
  align-items: center;
  padding: 0 15px;
  .my-search-box{
    background-color: #fff;
    line-height: 36px;
    // border-radius: 18px;
    width: 100%;
    display: flex;
    align-items:center;
    justify-content:center;
    .placeholder{
      
    }
  }
}
</style>
