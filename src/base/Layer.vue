<template>
    <div class="layer" v-show="show">{{msg}}</div>
</template>

<style scoped>
    .layer{
        background-color: rgba(0, 0, 0, .8);
        border-radius: .4rem;
        color: #fff;
        padding: .5rem;
        font-size: .8rem;
        position: fixed;
        left: 50%;
        bottom: 30%;
        transform: translate(-50%, -50%);
        z-index: 9;
    }
</style>