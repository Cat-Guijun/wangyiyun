<template>
    <div v-if="needInfo">
      <header style="width: 100%;height: 240px;display: flex;align-items: center;justify-content: space-around;">
        <img :src="needInfo.playlist.coverImgUrl+'?param=200y200'" alt="" style="margin-left: 15px;border: 1px solid gray;">
        <p>{{needInfo.playlist.name}}</p>
      </header>
      <p style="margin-left: 20px;">
        <span style="font-size: 20px;">歌曲列表</span>
        <span style='font-size: 12px;margin-left: 20px;'>{{songTracks.length}}首歌</span>
        <span style="font-size: 12px;margin-left: 40px;">播放次数:{{needInfo.playlist.playCount}}次</span>
      </p>
      <song-list :songInfo='songTracks'></song-list>
    </div>
</template>

<script>
  import axios from 'axios'
  import songList from './detail/songList.vue'
  export default {
    data(){
      return {
        needInfo:null,
        songTracks:[],
      }
    },
    mounted(){
      axios.get(`http://localhost:3000/playlist/detail?id=${this.$route.params.sheetId}`,{
        withCredentials: true
      }).then((res)=>{
        this.needInfo=res.data
        this.songTracks=res.data.playlist.tracks
        this.$store.commit('setSongTracks',this.songTracks)
      })
    },
    components:{
      songList
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }

</style>
