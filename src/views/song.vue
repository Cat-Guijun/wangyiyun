<template>
  <div>
    <div style="margin: auto;">
      <el-avatar :src="$store.state.musicInfo.al.picUrl" shape="circle" :size="200" style="margin: auto;display: block;"></el-avatar>
    </div>
    <div style="width: 200px;border-left: 2px dashed #aaffff;border-right: 2px dashed #aaffff; margin: auto;">
        <p style="width: 100%;font-size: 12px;text-align: center;" v-for="item in lyrics">{{item}}</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data(){
      return {
        lyrics:[]
      }
    },
    mounted() {
      axios.get(`http://localhost:3000/lyric?id=${this.$route.params.songId}`,{
        withCredentials: true
      }).then((res)=>{
        if(res.data.hasOwnProperty('nolyric'))
        {
          this.lyrics=['纯音乐']
          console.log(this.lyrics)
          return
        }
        
          this.lyrics=res.data.lrc.lyric.replace(/\[.*?\]/g,'').split('\n')

      })
    }
  }
</script>

<style>
</style>
