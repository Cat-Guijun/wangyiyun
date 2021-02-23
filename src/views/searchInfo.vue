<template>
  <div>
    <!-- search的结果 -->
    <song-list :songInfo='$store.state.songTracks' style="width: 100%;"></song-list>
  </div>
</template>

<script>
  import songList from './detail/songList.vue'
  export default {
    mounted(){
      this.$store.state.status=false
    },
    destroyed() {
       this.$store.state.status=true
    },
    components:{
      songList
    }
  }
</script>

<style>
</style>
