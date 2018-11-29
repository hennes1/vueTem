<template>
    <div class="head-wrap">
        <header class="header">
            <span class="hd-left" v-if="isBack" @click="goBack">
                <em id="head_back">
                    <i class="i-48 i-left hd-img"></i>
                </em>
            </span>
            <span class="hd-name"><slot></slot></span>
            <span class="hd-right" @click="openLay">
                <em id="user_center">
                    <i class="i-48 i-user hd-img"></i>
                </em>
            </span>
        </header>
        <!--{ user-center-lay-wrap -->
        <div class="user-center-lay-wrap" v-show="isOpen">
            <div class="user-center-lay">
                <span class="i-48 i-user float-img" @click="hideShow"></span>
                <div class="user-center-ul">
                    <router-link class="user-center-item wp" to="/home" tag="a">
                        <i class="i-36 i-wp user-center-ico"></i>
                        <span>玩票：</span>
                        <span class="wp-price">0</span>
                    </router-link>
                    <router-link class="user-center-item" to="/home" tag="a">
                        <i class="i-36 i-order user-center-ico"></i>
                        <span>我的订单</span>
                        <label class="unpay" style="display: none;">（待付款 <span class="unpay-num">0</span>）</label>
                    </router-link>
                    <router-link class="user-center-item" to="/home" tag="a">
                        <i class="i-36 i-set user-center-ico"></i>
                        <span>修改登录密码</span>
                    </router-link>
                    <router-link class="user-center-item" to="/home" tag="a">
                        <i class="i-36 i-help user-center-ico"></i>
                        <span>帮助中心</span>
                    </router-link>
                    <p class="user-center-item" id="user_logout">
                        <i class="i-36 i-exit user-center-ico"></i>
                        <span class="exit-tx">退出</span>
                        <span class="user_tel" @click="exit">{{currName}}</span>
                    </p>
                </div>
            </div>
            <div class="user-center-lay-bg" @click="hideShow"></div>
        </div>
        <!--/ user-center-lay-wrap }-->
    </div>
</template>

<script>
    export default {
        data(){
            return {
                isOpen: false,
                isLogin: parseInt(localStorage.getItem('isLogin')) || 0
            };
        },
        props: {
            isBack: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1);
            },
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
            }
        },
        computed: {
            currName(){
                let str = localStorage.getItem('currUser') || '';
                let userName = str.substr(0,parseInt(str.split('').length/3))+'****'+str.substr(parseInt(str.split('').length/2+3),str.split('').length);
                return userName;
            }
        }
    };
</script>
<style scoped>
    .header {
        background-color: #F5F7F9;
        position: fixed;
        width: 18rem;
        height: 2.4rem;
        font-size: .9rem;
        top: 0;
        right: 0;
        left: 50%;
        margin-left: -9rem;
        text-align: center;
        z-index: 999;
    }
    .header span {
        overflow: hidden;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 1000
    }
    .hd-left, .hd-right {
        width: 2.2rem;
        cursor: pointer;
    }
    .hd-left span, .hd-right span {
        left: 0;
        right: 0
    }
    .hd-left {
        left: 0
    }
    .hd-right {
        right: 0
    }
    .hd-name {
        left: 2.2rem;
        right: 2.2rem;
        line-height: 2.4rem
    }
    .hd-img {
        display: block;
        margin: .6rem auto !important
    }
    .hd-pos .i-user.hd-img, .i-user.hd-img {
        background-position: 0 0
    }
    /* user-center-lay-wrap */
    .user-center-lay-wrap {
        width: 18rem;
        text-align: left;
    }
    .user-center-lay-bg {
        background-color: #333;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        opacity: .8;
        filter: alpha(opacity=80);
        z-index: 1001
    }
    .user-center-lay {
        background-color: #fff;
        padding: .5rem .5rem 0;
        position: fixed;
        width: 17rem;
        top: 2.4rem;
        left: 50%;
        margin-left: -9rem;
        z-index: 1002
    }
    .user-center-lay:after {
        content: '';
        width: 0;
        height: 0;
        border-left: .6rem solid transparent;
        border-right: .6rem solid transparent;
        border-bottom: .6rem solid #fff;
        position: absolute;
        top: -.5rem;
        left: 16.2rem;
        z-index: 1002
    }
    .user-center-item {
        color: #666;
        display: block;
        font-size: 0;
        font-weight: 500;
        text-decoration: none;
        padding: .8rem .575rem;
        position: relative;
    }
    .user-center-item:after{
        background-color: #bfbfbf;
        content: '';
        height: 1px;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
    }
    .user-center-item:nth-child(1)::after, .user-center-item:nth-child(5)::after{ background-color: transparent}
    .user-center-item span { font-size: .8rem}
    .user-center-ico {
        width: .9rem;
        height: .9rem;
        margin-right: .5rem
    }
    .user-center-ico, .user-center-item span {
        display: inline-block;
        vertical-align: middle
    }
    .user-center-item.wp {
        background-color: #f0f2f4;
        border-bottom: none;
        border-radius: .3rem;
        padding: .625rem .5rem
    }
    .exit-tx{ color: #f30; margin-right: .5rem}
    .float-img {
        position: absolute;
        right: .5rem;
        top: -1.8rem;
        width: 1.2rem;
        height: 1.2rem;
    }
</style>