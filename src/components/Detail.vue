<template>
    <div class="detail-cont pd-top" v-title="game.name">
        <Header>{{ game.name }}</Header>
        <div class="page-contain">
            <div class="page-body">
                <div class="page-inner game-detail">
                    <div class="game-bg" :style="{ backgroundImage: 'url('+ game.face +')'}"></div>
                    <div class="game-basic">
                        <div class="game-unit">
                            <img :src="game.face" :alt="game.name" class="lazy" width="4rem" height="4rem">
                            <span class="game-down">下载</span>
                        </div>
                        <div class="game-about">
                            <h3>{{ game.name }}</h3>
                            <p>{{ game.capacity }}</p>
                            <div class="game-introduction">{{ game.introduction }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--/ game basic -->
        <div class="page-contain bt-bd">
            <div class="page-body">
                <div class="page-inner">
                    <div class="game-money">
                        <span class="money-item" v-for="(money, index) in moneyArr" @click.stop="changeMoney($event, index, game.discount)">
                            ¥ <i>{{ money }}</i>
                        </span>
                        <span class="money-item" @click.stop="showHideIpt($event)">
                            <b v-show="!shown">其它金额</b>
                            <input type="number" min="0" max="9" v-show="shown" v-model="moneyIpt" v-focus @keyup.stop="changeMoney($event, index, game.discount, 'money')">
                        </span>
                    </div>
                    <div class="game-pay">
                        <div class="game-price">
                            实付款：
                            <div class="pay-num">
                                <small>¥</small>
                                <span id="curr_money">{{ moneyTotal(game.discount) }}</span>
                                <s id="old_money">原价： ¥{{ moneyArr[4] | toFixed(2)}}</s>
                            </div>
                        </div>
                        <button class="game-pay-btn" v-if="isLogin > 0">充值</button>
                        <router-link class="login-btn" to="/login" v-else>登录</router-link>
                    </div>
                </div>
            </div>
        </div>
        <!--/ game form -->
        <RechargeTx>充值说明</RechargeTx>
        <TicketsTx>玩票说明</TicketsTx>
    </div>
</template>

<script>
    import Header from '../base/Header.vue';
    import RechargeTx from '../base/RechargeTx.vue';
    import TicketsTx from '../base/TicketsTx.vue';
    import { fnGetGame } from '../api';

    export default {
        data() {
            return {
                user: {name: '', pwd: ''},
                game: {},
                moneyArr: [6, 30, 98, 198, 648],
                shown: false,
                moneyIpt: 0,
                isLogin: parseInt(localStorage.getItem('isLogin')) || 0
            }
        },
        filters: { // 过滤属性自定义过滤方法
            toFixed(input, param){
                return input.toFixed(param);
            }
        },
        created() {
            this.getGame();
        },
        methods: {
            changeMoney(e, i, discount, t){
                let currMoney = document.getElementById('curr_money');
                let oldMoney = document.getElementById('old_money');
                let _money = this.moneyIpt;
                let moneyItem = Number(this.moneyArr[i]).toFixed(2);
                let m = !t ? moneyItem : (_money <= 0 || _money === '') ? 0 : Number(_money).toFixed(2);
                if (typeof discount !== 'undefined') {
                    if (discount > 0) {
                        currMoney.innerText = Number(m * discount).toFixed(2);
                    } else {
                        currMoney.innerText = Number(m).toFixed(2);
                    }
                    oldMoney.innerText = '原价： ¥' + m;

                    if (!t) {
                        let _dom = document.querySelector('.money-item.selected');
                        if (_dom) _dom.classList.toggle('selected');
                        //e.target.classList.toggle('selected');
                        e.currentTarget.classList.toggle('selected');

                        this.shown = false;
                        this.moneyIpt = 0;
                    }
                }
            },
            async getGame(){ // 得到某个游戏
                this.game = await fnGetGame(this.category, this.gameId);
            },
            moneyTotal(discount){ // 按折扣计算价格
                let myArr = this.moneyArr;
                if(typeof discount !== 'undefined') {
                    if(discount > 0){
                        return (discount * myArr[myArr.length - 1]).toFixed(2);
                    }else{
                        return myArr[myArr.length - 1];
                    }
                }
            },
            showHideIpt(e){
                this.shown = true;
                let _dom = document.querySelector('.money-item.selected');
                if (_dom) _dom.classList.toggle('selected');
                e.currentTarget.classList.toggle('selected');
            }
        },
        computed: {
            category(){ // 取得游戏类别
                return this.$route.params.category;
            },
            gameId(){ // 取得游戏id
                return this.$route.params.id;
            }
        },
        components: { Header, RechargeTx, TicketsTx }
    }
</script>

<style scoped lang="less">
    @Georgia: Georgia;
    .game-detail{ position: relative}
    .game-bg{
        background: no-repeat -1rem center;
        background-size: 500% 500%;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        filter: blur(1.25rem);
        z-index: 1;
    }
    .game-basic{
        display: -webkit-flex;
        display: flex;
        color: #fff;
        position: relative;
        z-index: 3;
    }
    .game-unit{ width: 4.5rem}
    .game-about{
        width: 12.5rem;
        &>h3{ font-size: .7rem; margin: 0}
        &>p{ color: #ffc107; font-family: @Georgia; margin: .1rem 0}
        &>.game-introduction{
            overflow: hidden;
            text-shadow: 0 1px 0 #333;
        }
    }
    img.lazy{
        border-radius: .4rem;
        display: block;
        width: 4rem;
        height: 4rem;
        margin-bottom: .25rem
    }
    .game-down{
        background-color: #28a745;
        border-radius: .2rem;
        color: #fff;
        cursor: pointer;
        display: block;
        width: 4rem;
        height: 1.24rem;
        line-height: 1.24rem;
        text-align: center;
    }
    .game-money{
        display: -webkit-flex;
        display: flex;
        flex-wrap: wrap;
        .money-item{
            flex: 0 1 auto;
            width: 5.4rem;
            height: 2.65rem;
            line-height: 2.65rem;
            background: #F5F7F9;
            border: 1px solid #BFBFBF;
            text-align: center;
            vertical-align: top;
            cursor: pointer;
            border-radius: .5rem;
            margin: 0 0 .4rem .25rem;
            i{
                font-style: normal;
                font-size: .8rem;
                font-family: @Georgia;
            }
            input{
                border: 1px #ffc107 solid;
                background-color: #FBFBEF;
                width: 4.4rem;
                height: 1.4rem;
                display: inline-block;
                text-align: center;
                font-size: .7rem;
                font-family: @Georgia;
            }
        }
        span:nth-of-type(3n+1){ margin-left: 0}
        span:nth-of-type(n+4){ margin-bottom: 0}
    }
    .money-item.selected{
        background: #FFF0D6;
        border-color: #F89F0A;
        color: #FFA60C
    }
    .game-pay{
        background: #FCFCFC;
        border-top: 1px solid #BFBFBF;
        box-shadow: 0 -2px .8rem rgba(0,0,0,.3);
        box-sizing: border-box;
        position: fixed;
        width: 18rem;
        height: 2.75rem;
        left: 50%;
        right: 0;
        bottom: 0;
        margin-left: -9rem;
        padding: .5rem 6.5rem 0 .5rem;
        z-index: 9;
        .game-pay-btn, .login-btn{
            background: #FFB22D;
            color: #fff;
            display: block;
            line-height: 2.75rem;
            text-align: center;
            position: absolute;
            top: 0;
            right: 0;
            width: 6.25rem;
            height: 100%;
            font-size: .9rem;
            z-index: 10;
        }
        .game-pay-btn{border: none}
        .login-btn{background: #f30}
        .pay-num span{ font-family: @Georgia; color: #f30; margin-right: .2rem}
    }
</style>