import './css/base.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router'
import './directive';
import './utils/pageFit';
import VueScroller from 'vue-scroller'
Vue.use(VueScroller);

import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: './src/images/error.gif',
    loading: './src/images/loading.gif',
    attempt: 1
});

import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);

// 在进入路由前，每次执行的方法
/*router.beforeEach(function (to, from, next) {
    document.title = to.meta.title;
    console.log(to);
    next();
});*/

new Vue({
    router,
    el: '#app',
    render: (h) => h(App)
});