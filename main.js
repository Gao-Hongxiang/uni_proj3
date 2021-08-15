import Vue from 'vue'
import App from './App'
import{$http} from '@escook/request-miniprogram'
Vue.config.productionTip = false

App.mpType = 'app'
// 封装的展示消息提示的方法
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
 uni.showToast({
  title,
  duration,
  icon: 'none',
})
}
uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'

$http.beforeRequest = function(option) {
  uni.showLoading({
    
    title:'数据加载中'
  })
}

$http.afterRequest = function(option) {
  uni.hideLoading()
}
// $http.afterRequest = function(){

// $http.afterRequest = function(option) {

//   uni.hideLoading()
// }
// $http.afterRequest = function(option){
//   uni.hideLoading()
// }
const app = new Vue({
	...App
})
app.$mount()
