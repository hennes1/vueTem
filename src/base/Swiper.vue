<template>
    <swiper :options="swiperOption">
        <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
            <img v-lazy="slide.face" :alt="slide.title" class="slide-face">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
    export default {
        name: 'carousel',
        props: ['swiperSlides'],
        data() {
            return {
                swiperOption: {
                    autoplay: {
                        delay: 3000,
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
<style scoped>
    .swiper-pagination-bullet-active {
        opacity: 1;
        background: #ffb22d
    }
    .swiper-container {
        width: 100%;
        height: auto;
        margin-left: auto;
        margin-right: auto
    }
    .swiper-main {
        width: 18rem;
        height: 7.5rem;
        position: relative
    }
    .swiper-slide {
        width: 18rem;
        height: 7.5rem
    }
    .swiper-slide img {
        width: 100%;
        height: 100%
    }
</style>