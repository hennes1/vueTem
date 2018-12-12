<template>
    <div class="category-contain pd-top" v-title="categoryZHName">
        <Header>{{categoryZHName}}</Header>
        <div class="page-contain">
            <div class="page-body">
                <div class="page-wrap">
                    <ul>
                        <li v-for="(game, index) in games">
                            <router-link  class="a-game"
                                    :to="{name: 'detail', params: {category: categoryName, id: game.id}}" :key="index">
                                <span class="sale-tx" v-show="game.discount > 0">首充{{game.discount}}折</span>
                                <img v-lazy="game.face" :alt="game.name" class="lazy" width="3.5rem" height="3.5rem">
                                <h6 class="page-name ellipsis">{{game.name}}</h6>
                                <p class="page-info ellipsis">{{game.description}}</p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="moreBtn" @click="moreGame" v-show="hasMore">加载更多</div>
        </div>
    </div>
</template>

<script>
    import Header from '../base/Header.vue';
    import {setCategory} from '../utils/util';
    import '../css/home.css';

    export default {
        data() {
            return {
                games: [],
                offset: 0,
                hasMore: true,
                isLoading: false
            }
        },
        created() {
            this.moreGame();
        },
        methods: {
            getCategoryGames(){ // 一次加载项目内全部数据
				this.$http.get('/api/games', {
					params: {
						category: this.categoryName
					}
				}).then((response) => {
					response = response.body;
					this.games = response;
				}).catch((response) => {
					console.log(response);
				});
            },
			moreGame(){ // 每次加载`pageSize`条数据
				if (this.hasMore && !this.isLoading) {
					this.isLoading = true;
					this.$http.get('/api/page', {
						params: {
							category: this.categoryName,
							offset: this.offset
						}
					}).then((response) => {
						response = response.body;
						let {games, hasMore} = response;
						this.hasMore = hasMore;
						//console.log('TS: ' + hasMore);
						this.isLoading = false;
						this.games = [...this.games, ...games];
						this.offset = this.games.length;
					}).catch((response) => {
						console.log(response);
					});
				} else {
					this.isLoading = true;
				}
			}
        },
        computed: {
            categoryName() {
                return this.$route.params.category;
            },
            categoryZHName() { // 获取栏目中文名称
                let cate = this.$route.params.category;
                return setCategory(cate);
            }
        },
        components: {Header}
    }
</script>

<style scoped>
    .page-contain { margin-bottom: 0}
    /*.category-contain, .page-contain, .page-body, .page-wrap{ height: 100%}*/
    .loading-layer{
        height: 2.4rem!important;
        line-height: 2.4rem!important;
    }
    .moreBtn {
        background-color: #005cbf;
        border-radius: 4px;
        color: #fff;
        text-align: center;
        font-size: 18px;
        padding: 10px 0;
        margin: 10px;
    }
</style>