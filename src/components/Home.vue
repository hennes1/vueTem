<template>
    <div class="index-contain" v-title="title">
		<div id="fix_head" class="fix-head-fixed" ref="fixHead">
			<div class="head-search">
				<i class="i-36 i-sear"></i>
				<div class="hd-search-inner">
					<notice-swiper :noticeSlides="hot"></notice-swiper>
				</div>
			</div>
			<span class="hd-user" @click="openLay">
                <i class="i-48 i-user hd-img"></i>
            </span>
		</div>
		<userCenter v-show="isOpen" @hideShow="hideShow" @exit="exit">{{currName}}</userCenter>
		<div class="swiper-main">
			<Swiper :swiperSlides="sliders"></Swiper>
		</div>
		<div class="notice bt-bd" id="notice">
			<i class="i-48 i-notice"></i>
			<notice-swiper :noticeSlides="notice"></notice-swiper>
			<router-link to="/notice" class="notice-more">
				<i class="i-36 i-more"></i>
			</router-link>
		</div>
		<!--/ notice end -->
		<Loading v-if="loading"></Loading>
		<div class="page-contain bt-bd" v-for="(gameCategory, index) in games" v-else>
			<div class="page-head">
				<div class="page-title">
					<i class="v-line"></i>
					<h2 class="page-tle">{{categoryName(gameCategory.category)}}</h2>
					<router-link :to="{name: 'game', params: {category: gameCategory.category}}" class="a-more" :key="index">
						更多<i class="i-36 i-more"></i>
					</router-link>
				</div>
			</div>
			<div class="page-body">
				<div class="page-wrap">
					<ul>
						<li v-for="(game, item) in readNum(gameCategory.list, 6)">
							<router-link :to="{name: 'detail', params: {category: gameCategory.category, id: game.id}}" class="a-game" :key="item">
								<span class="sale-tx" v-if="game.discount > 0">首充{{game.discount}}折</span>
								<img v-lazy="game.face" :alt="game.name" class="lazy" width="3.5rem" height="3.5rem">
								<h6 class="page-name ellipsis">{{game.name}}</h6>
								<p class="page-info ellipsis">{{game.description}}</p>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!--/ page-list end -->
    </div>
</template>

<script>
	import userCenter from '../base/userCenter';
    import Swiper from '../base/Swiper';
    import NoticeSwiper from '../base/noticeSwiper';
    import Loading from '../base/Loading';
    import { setCategory } from '../utils/util';

    import '../css/home.css';
    import 'swiper/dist/css/swiper.css';

    export default {
        data() {
            return {
            	title: '首页',
				games: [],
				sliders: [
					{face: "../static/index/01.jpg", title: "图片1"},
					{face: "../static/index/02.jpg", title: "图片2"},
					{face: "../static/index/03.jpg", title: "图片3"},
					{face: "../static/index/04.jpg", title: "图片4"}
				],
				hot: [
					'妖游记',
					'勇士之轮',
					'少女前线',
					'妲己传'
				],
				notice: [
					'平台游戏下架通知',
					'双十一来临，你的钱包准备好了吗？',
					'VUE的确是一个不错的框架，很强大！',
					'用Swiper做文字滚动看行不行？'
				],
				loading: true,
				isOpen: false,
				isLogin: parseInt(localStorage.getItem('isLogin')) || 0
            }
        },
        created() {
            this.getCategoryGames();
        },
		mounted(){
			let that = this;
			window.addEventListener('scroll', that.handleScroll, true);
		},
        methods: {
			openLay(){
				if (this.isLogin > 0) {
					this.isOpen = !this.isOpen;
				} else {
					this.$router.push('/login');
				}
			},
			hideShow(){
				this.isOpen = false;
			},
			exit(){
				this.isOpen = false;
				this.isLogin = 0;
				localStorage.setItem('isLogin', '0');
				localStorage.removeItem('currUser');
			},
            categoryName(val){ // 通过category来定义对应的中文名
                return setCategory(val);
            },
            getCategoryGames(){ // 所有游戏
				this.$http.get('/api/games').then((response) => {
					response = response.body;
					if(response) {
						this.loading = false;
						this.games = response;
					}
				});
            },
            readNum(source, num){ // 从source中读取num条数据
                return source.slice(0, num);
            },
			handleScroll: function () {
            	let fixHead = this.$refs.fixHead;
            	let { offsetHeight } = fixHead;
            	let scrollTop = document.getElementById('scroll_main').scrollTop;
				if(scrollTop >= offsetHeight){
					fixHead.removeAttribute('class');
					fixHead.setAttribute('class', 'fix-head-scroll');
				}else{
					fixHead.removeAttribute('class');
					fixHead.setAttribute('class', 'fix-head-fixed');
				}
			},
			destroyed(){
				let that = this;
            	window.removeEventListener('scroll', that.handleScroll);
			}
        },
		computed: {
			currName(){
				let str = localStorage.getItem('currUser') || '';
				let userName = str.substr(0,parseInt(str.split('').length/3))+'****'+str.substr(parseInt(str.split('').length/2+3),str.split('').length);
				return userName;
			}
		},
        components: { userCenter, Swiper, 'notice-swiper': NoticeSwiper, Loading }
    }
</script>