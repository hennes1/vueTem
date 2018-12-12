import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

// 请求拦截
Vue.http.interceptors.push(function(request, next){
	console.log("正在请求");
	next(function(response){
		//console.log(response.data);
		console.log("响应完成");
	});
});