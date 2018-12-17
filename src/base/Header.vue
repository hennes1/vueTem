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
		<userCenter v-show="isOpen" @hideShow="hideShow" @exit="exit">{{currName}}</userCenter>
        <!--/ user-center-lay-wrap }-->
    </div>
</template>

<script>
	import userCenter from '../base/userCenter';
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
                localStorage.removeItem('currUser');
            }
        },
        computed: {
            currName(){
                let str = localStorage.getItem('currUser') || '';
                let userName = str.substr(0,parseInt(str.split('').length/3))+'****'+str.substr(parseInt(str.split('').length/2+3),str.split('').length);
                return userName;
            }
        },
		components: { userCenter }
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
</style>