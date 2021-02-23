<template>
  <div id="box" style="display: flex; line-height: 67px;height: 67px;color: white;">
     <div class="button" style="flex-grow: 1;">
         <i class="iconfont icon-fanhuiyuan" :class="actived?'active':null" @click="goNext"></i>
         <i class="iconfont icon-next" :class="!actived?'active':null" @click="goNext"></i>
     </div>
     <div class="bar" style="flex-grow: 2;">
        <span class="iconfont icon-sousuo" style="font-size: 20px;" @click="searchInfo"></span>
            <input type="text" v-model="value" style="margin-left: 6px; height:16;border: 1px solid gray; border-radius: 7px;
            margin-bottom: -6px;  outline: none ;" placeholder="开始搜索歌曲吧" @keydown.enter="searchInfo">
     </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data(){
      return {
        value:'',
        actived:true
      }
    },
    methods:{
      goNext(){
        this.actived=!this.actived
        if(this.$route.fullPath=='/') return;
        this.$router.back()
      },
      searchInfo(){
        console.log(this.value)
        axios.get(`http://localhost:3000/cloudsearch?keywords=${this.value}`,
        {
          withCredentials: true
        }
        ).then((res)=>{
          console.log(res.data)
         this.$store.commit('setSongTracks',res.data.result.songs)
         this.$router.push('/search')
        })
        this.value=''
      }
    }
  }
</script>

<style lang="scss" scoped>
    .button{
        i{
          font-size: 27px;
          margin-left: 12px;
        }
    }
    .active{
      color: grey;
    }
</style>
