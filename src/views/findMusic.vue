<template>
  <div>
    <header-swiper v-if='banners.length!=0'>
      <div class="swiper-slide" v-for="(item,index) in banners" :key='index' @click="goSong(item.song.id)" style="border-bottom: 1px solid grey;width: 80%;">
        <div style="height: 280px;width: 700px;background-size: cover;margin: auto;" :style="{backgroundImage:'url('+item.pic+'?param=700y280'+')'}"></div>
        </div>
    </header-swiper>
    <hr style="color: gray;">
    <h3>推荐歌单</h3>
    <ul id='tyep3' style="width: 100%;overflow: hidden;" >
        <li v-for="item in remmend" :key="item.Id" style="width: 140px;height: 145px; padding-left: 40px;padding-bottom: 45px;float: left;"  @click="goDetail(item)">
          <img :src="item.picUrl+'?param=140y140'" alt="">
           <p class="deco" style="font-size: 14px; width:140px;margin-top: 3px;">{{item.name}}</p>
        </li>
    </ul>
  </div>
</template>

<script>
   import axios from 'axios'
   import headerSwiper from '../components/headerSwiper.vue'
   export default {
     data(){
       return {
         banners:[],
         remmend:[],
         }
     },
     methods:{
       goSong(id){
         this.$router.push('/song/'+'id')
       },
       goDetail(item)
       {
         /* console.log(item) */
         this.$router.push(`/playlist/${item.id}`)
       }
     },
     components:{
       headerSwiper
     },
     mounted() {
       axios.get('http://localhost:3000/homepage/block/page',{
         withCredentials: true
       }).then((res)=>{
         this.banners=res.data.data.blocks[0].extInfo.banners
       })
       axios.get('http://localhost:3000/recommend/resource',{
         withCredentials: true
       }).then((res)=>{
         this.remmend=res.data.recommend;
       })
     }
   }
</script>

<style scoped='true'>
  *{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
  }
  .deco{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
  }
  .deco:hover{
    color: blue;
  }
</style>
