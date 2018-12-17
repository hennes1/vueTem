<template>
	<div class="user-center-lay-wrap">
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
				<p class="user-center-item" id="user_logout" @click="exit">
					<i class="i-36 i-exit user-center-ico"></i>
					<span class="exit-tx">退出</span>
					<span class="user_tel"><slot></slot></span>
				</p>
			</div>
		</div>
		<div class="user-center-lay-bg" @click="hideShow"></div>
	</div>
</template>

<script>
    export default {
        name: 'userCenter',
        methods: {
			hideShow(){
				this.$emit('hideShow');
			},
			exit(){
				this.$emit('exit');
			}
		}
    }
</script>

<style scoped>
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