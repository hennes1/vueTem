<template>
    <div class="page-contain bt-bd recharge">
        <div class="page-head">
            <div class="page-title">
                <i class="v-line"></i>
                <h2 class="page-tle"><slot></slot></h2>
            </div>
        </div>
        <div class="page-body">
            <div class="page-inner">
                充值成功后，充值金额将以<u>代金券</u>形式发到您的游戏账号下。<u>代金券</u>可以在游戏内付费时抵扣等值的现金。
                <strong>查看代金券：</strong>
                在游戏里 点击浮窗 — 访问个人中心 — 查看“我的代金券”
                <strong>使用代金券：</strong>
                在游戏里 选择要购买的商品—支付时选择使用代金券—完成支付
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .recharge .page-inner{
        padding-top: 0;
        padding-left: .6rem;
        u{ color: #ffc107; margin: 0 3px}
        strong{font-weight: 600; display: block; margin: .4rem 0 .15rem}
    }
</style>