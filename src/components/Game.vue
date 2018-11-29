<template>
    <div class="category-contain pd-top" v-title="categoryZHName">
        <Header>{{categoryZHName}}</Header>
        <div class="page-contain">
            <div class="page-body">
                <scroller class="page-wrap" :on-infinite="infinite" ref="scroll">
                    <div style="height:1px"></div>
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
                </scroller>
            </div>
            <div class="moreBtn" @click="more" v-show="!isLoading">加载更多</div>
        </div>
    </div>
</template>

<script>
    import Header from '../base/Header.vue';
    import {fnLoadMore} from '../api';
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
            //this.getCategoryGames();
            this.loadMore();
        },
        mounted(){
            this.bottom = 20;
        },
        methods: {
            /*async getCategoryGames(){
                let games = await fnGetCategoryGames(this.categoryName);
                console.log(games);
                this.games = games;
            },*/
            more() {
                this.loadMore(); // 点击加载更多
            },
            async loadMore() { // 加载更多
                if (this.hasMore && !this.isLoading) {
                    this.isLoading = true;
                    let {games, hasMore} = await fnLoadMore(this.categoryName, this.offset);
                    this.hasMore = hasMore;
                    this.isLoading = false;
                    this.games = [...this.games, ...games];
                    this.offset = this.games.length;
                } else {
                    this.isLoading = true;
                }
            },
            infinite(done){
                if (this.bottom >= 30) {
                    setTimeout(() => {
                        done(true);
                    }, 1500);
                    return;
                }
                setTimeout(() => {
                    this.bottom = this.bottom + 10;
                    setTimeout(() => {
                        this.loadMore();
                        done();
                    });
                }, 1500);
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
    .page-contain {
        margin-bottom: 0
    }
    .category-contain, .page-contain, .page-body, .page-wrap{ height: 100%}
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
        margin: 0 10px 10px;
    }
</style>