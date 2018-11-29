<template>
    <div id="notice-cont">
        <swiper :options="swiperOption" class="notice-swiper">
            <swiper-slide v-for="(notice, index) in noticeSlides" :key="index" v-text="notice"></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    export default {
        name: 'noticeCarousel',
        data() {
            return {
                swiperOption: {
                    direction: 'vertical',
                    autoplay: {
                        delay: 2000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: '.swiper-pagination'
                    }
                },
                noticeSlides: [
                    '平台游戏下架通知',
                    '双十一来临，你的钱包准备好了吗？',
                    'VUE的确是一个不错的框架，很强大！',
                    '用Swiper做文字滚动看行不行？'
                ]
            }
        }
    }
</script>
<style scoped>
    #notice-cont {
        height: 2rem;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        overflow: hidden;
        z-index: 1
    }
    .swiper-container {
        width: 100%;
        height: auto;
        margin-left: auto;
        margin-right: auto
    }
    .notice-swiper {
        width: 100%;
        height: 2rem;
        position: relative
    }
    .notice-swiper .swiper-slide {
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: .7rem;
        color: #333
    }
    .swiper-pagination{ display: none}
</style>