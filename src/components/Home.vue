<template>
    <div class="index-contain" v-title="title">
		<Loading v-if="loading"></Loading>
        <template v-else>
            <div class="swiper-main">
                <Swiper :swiperSlides="sliders"></Swiper>
            </div>
            <div class="notice bt-bd" id="notice">
                <i class="i-48 i-notice"></i>
                <notice-swiper></notice-swiper>
                <router-link to="/notice" class="notice-more" id="clos">
                    <i class="i-36 i-more"></i>
                </router-link>
            </div>
            <!--/ notice end -->
            <div class="page-contain bt-bd" v-for="(gameCategory, index) in games">
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
        </template>
    </div>
</template>

<script>
    import Swiper from '../base/Swiper.vue';
    import NoticeSwiper from '../base/noticeSwiper.vue';
    import Loading from '../base/Loading.vue';
    import { setCategory } from '../utils/util';

    import '../css/home.css';
    import 'swiper/dist/css/swiper.css';

    export default {
        data() {
            return {title: '首页', games: [], sliders: [], loading: true}
        },
        created() {
            this.getSlides();
            this.getCategoryGames();
        },
        methods: {
            categoryName(val){ // 通过category来定义对应的中文名
                return setCategory(val);
            },
            getSlides(){ // 轮播图
				this.$http.get('/api/slide').then((response) => {
					response = response.body;
					if(response) {
						this.loading = false;
						this.sliders = response;
					}
				}).catch((response) => {
					console.log(response);
				});
            },
            getCategoryGames(){ // 所有游戏
				this.$http.get('/api/games').then((response) => {
					response = response.body;
					this.games = response;
				});
            },
            readNum(source, num){ // 从source中读取num条数据
                return source.slice(0, num);
            }
        },
        components: { Swiper, 'notice-swiper': NoticeSwiper, Loading }
    }
</script>