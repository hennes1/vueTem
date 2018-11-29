<template>
    <div class="page-contain play-tickets">
        <div class="page-head">
            <div class="page-title">
                <i class="v-line"></i>
                <h2 class="page-tle"><slot></slot></h2>
            </div>
        </div>
        <div class="page-body">
            <div class="page-inner">
                玩票是朋友玩的虚拟货币，对任意游戏进行充值时可抵扣现金，玩票只能通过平台活动获得。
            </div>
        </div>
    </div>
</template>

<style scoped>
    .play-tickets .page-inner{ padding-top: 0; padding-left: .6rem; min-height: 5rem;}
</style>