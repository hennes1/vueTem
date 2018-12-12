import './css/base.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './directive';
import './utils/pageFit';
import VueScroller from 'vue-scroller';
Vue.use(VueScroller);

import VueLazyload from 'vue-lazyload';
import errorImg from './assets/error.gif';
import loadImg from './assets/loading.gif';
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: errorImg,
	loading: loadImg,
	attempt: 1
});

import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);

import layerRegistry from './utils/layer';
Vue.use(layerRegistry);

new Vue({
	router,
	el: '#app',
	render: (h) => h(App)
});