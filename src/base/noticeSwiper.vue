<template>
    <div class="notice-cont">
        <swiper :options="swiperOption" class="notice-swiper">
            <swiper-slide v-for="(notice, index) in noticeSlides" :key="index" v-text="notice"></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    export default {
        name: 'noticeCarousel',
		props: ['noticeSlides'],
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
                }
            }
        }
    }
</script>
<style scoped lang="less">
	@height: 2rem;
    .notice-cont {
        height: @height;
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
        height: @height;
        position: relative
    }
    .notice-swiper .swiper-slide {
        width: 100%;
        height: @height;
        line-height: @height;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: .7rem;
        color: #333
    }
    .swiper-pagination{ display: none}
</style>