<template>
  <div>
    <aplayer autoplay
      :music="{
        title: musicInfo.name,
        artist: solveName(musicInfo.ar),
        src: $store.state.songUrl,
        pic: musicInfo.al.picUrl
      }"
      :list='playList'
    />
  </div>
</template>

<script>
  import aplayer from 'vue-aplayer'
  import {mapState} from 'vuex'
  export default {
    components:{
      aplayer
    },
    props:['songTracks'],
    data(){
      return {
        playList:[],
      }
    },
    computed:{
      ...mapState(['musicInfo'])
    },
    mounted(){
      console.log("Mounted")
      this.songTracks.forEach((item)=>{
        this.playList.push(
        {
          title: item.name,
          artist: this.solveName(item.ar),
          src: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
          pic: item.al.picUrl
        })
      })
      console.log('playList=',this.playList)
    },
    methods:{
      solveName(ar)
      {
        let str=''
        ar.forEach((item,index)=>{
          str+=item.name+'/'
        })
        return str.substring(0,str.length-1)
      },
    }

  }
</script>

<style>
</style>
