<template>
  <div class="swiper-container">
      <div class="swiper-wrapper">
          <slot></slot>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev bt"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
      <div class="swiper-button-next bt"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
  </div>
</template>

<script>
  import Swiper from 'swiper/bundle'
  import 'swiper/swiper-bundle.min.css'
  export default {
    data()
    {
      return {
        swiper:null,
      }
    },
    mounted(){
      console.log('new swiper')
      this.swiper=new Swiper('.swiper-container',{
        pagination: {
            el: '.swiper-pagination',
            clickable:true,
          },
          autoplay:true,
          loop:true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
      })
    },
  }
</script>

<style scoped>
  .swiper-container{
    --swiper-theme-color: #ff6600;/* 设置Swiper风格 */
    --swiper-navigation-color: green;/* 单独设置按钮颜色 */
    --swiper-navigation-size: 30px;/* 设置按钮大小 */
    --swiper-navigation-border:1px solid red
  }
  .bt:hover{
    background-color: bisque;
  }
</style>
