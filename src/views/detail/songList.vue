<template>
  <div>
      <table style="margin: auto;">
          <thead>
            <tr style="height: 34px;font-size: 13px;color: gray;border-bottom: 1px solid #F7F7F7;">
              <th style="width: 74px;">
              </th>
              <th style="width: 238px;">歌曲标题</th>
              <th style="width: 110px;">时长</th>
              <th style="width: 88px;">歌手</th>
              <th style="width: 127px;">专辑</th>
            </tr>
          </thead>
          <tbody>
             <tr v-for="(item,index) in songInfo" :key='item.id' @click="playMusic(item.id)">
               <td style="width: 74px;">{{index+1}} <i class="el-icon-video-play" style="color: red;font-size: 18px;"></i></td>
               <td style="width: 238px;">{{item.name}}</td>
               <td style="width: 110px;">{{item.dt |solveTime}}</td>
               <td style="width: 88px;overflow: hidden; text-overflow: ellipsis;white-space: nowrap;">{{item.ar|solveName}}</td>
               <td style="width: 127px;">{{item.al.name}}</td>
             </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
  export default {
    props:['songInfo'],
    methods:{
      playMusic(musicId){
        this.$store.dispatch('getSongs',musicId)
        this.$router.replace(`/song/${musicId}`)
      }
    },
    filters:{
      solveName(ar)
      {
        let str=''
        ar.forEach((item,index)=>{
          str+=item.name+'/'
        })
        return str.substring(0,str.length-1)
      },
      solveTime(ms)
      {
        ms=ms/1000;
        ms=Math.floor(ms);
        let min=Math.floor(ms/60);
        let sec=ms%60;
        if(min<10)
        {
          min='0'+min
        }
        if(sec<10)
        {
          sec='0'+sec
        }
        return min+':'+sec
      }
    },
  }
</script>

<style scoped>
  td{
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333333;
    font-size: 12px;
  }
  td:hover{
    text-decoration: underline;
  }
  table{
    border-collapse: collapse;
    border: 1px solid gray;
    opacity: 0.7;
  }
  table tr:nth-child(odd)
  {background:#FEF0F0}
  table tr:nth-child(even)
  {color:gray}
</style>
