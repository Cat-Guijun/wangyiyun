<template>
  <div v-if="userInfo">
    <header style="display: flex;justify-content: space-between;border-bottom: 1px solid gainsboro;">
      <div class="photo" :style='{backgroundImage:"url("+userInfo.profile.avatarUrl+")"}'>
      </div>
      <div class="info">
        <p style="font-size: 23px;color: #000000;">{{userInfo.profile.nickname}}</p>
        <section id="section1">
          <span style="background-color: #efefef;color: grey;border-radius:6px;">LV{{userInfo.level}}</span>
           <span style="background-color: #b8f6ff;color: #08adf3;border-radius:5px; font-size: 12px;">{{userInfo.profile.gender | judge}}</span>
           <el-button  icon="el-icon-edit" :round='true' size='mini'>编辑个人信息</el-button>
        </section>
        <ul id='showBox' style="margin-top:18px ;">
          <li>{{userInfo.profile.djStatus}}
          <p>动态</p></li>
          <li>{{userInfo.profile.follows}}
          <p>关注</p></li>
          <li>
            {{userInfo.profile.followeds}}
            <p>粉丝</p>
          </li>
        </ul>
        <div class="under" style="font-size: 12px;margin-top: 15px;">
          <p>所在地区:<span style="color: gray;">未知</span></p>
          <p>社交网络:<span style="color: gray;">新浪微博</span></p>
          <p>个人介绍:<span style="color: gray;">{{userInfo.profile.signature==''?"暂无介绍":userInfo.profile.signature}}</span></p>
        </div>
      </div>

    </header>
    <h3>我创建的歌单</h3>
    <ul id='tyep1' style="width: 100%;overflow: hidden;" >
        <li v-for="item in songSheet.slice(0,createNum)" :key="item.Id" style="width: 140px;height: 145px; padding-left: 40px;padding-bottom: 45px;float: left;"  @click="goDetail(item)">
          <img :src="item.coverImgUrl+'?param=140y140'" alt="">
           <p class="deco" style="font-size: 14px; width:140px;margin-top: 3px;">{{item.name}}</p>
        </li>
    </ul>
    <h3>我收藏的歌单</h3>
    <ul id='tyep2' style="width: 100%;overflow: hidden;" >
        <li v-for="item in songSheet.slice(createNum)" :key="item.Id" style="width: 140px;height: 145px; padding-left: 40px;padding-bottom: 45px;float: left;"  @click="goDetail(item)">
          <img :src="item.coverImgUrl+'?param=140y140'" alt="">
           <p class="deco" style="font-size: 14px; width:140px;margin-top: 3px;">{{item.name}}</p>
        </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data(){
      return {
        userInfo:null,
        songSheet:[],
        createNum:0
      }
    },
    methods:{
      goDetail(item)
      {
        /* console.log(item) */
        this.$router.push(`/playlist/${item.id}`)
      }
    },

    mounted(){
      axios.get(`http://localhost:3000/user/detail?uid=${this.$store.state.userInfo.account.id}`,{
        withCredentials: true
      }).then((res)=>{
        this.userInfo=res.data
      })
      axios.get(`http://localhost:3000/user/playlist?uid=${this.$store.state.userInfo.account.id}`,{
        withCredentials: true
      }).then((res)=>{
        console.log(res.data.playlist)
        this.songSheet=res.data.playlist;
      })
      axios.get(`http://localhost:3000/user/subcount`,{
        withCredentials: true
      }).then((res)=>{
        console.log(this.createNum)
        this.createNum=res.data.createdPlaylistCount
      })
    },
    filters:{
      judge(gender){
        if(gender==1)
        {
          return '男'
        }
        return '女'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .photo{
      width: 160px;
      height: 160px;
      border-radius: 80px;
      overflow: hidden;
      margin-left: 60px;
      margin-top: 10px;
      background-size: contain;
  }
  *{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
  }
  .info{
    width: 560px;
    height: 180px;
    margin-top: 8px;
  }
  #section1{
    position: relative;
    height: 22px;
    line-height: 22px;
    span{
      display: inline-block;
      font-size: 14px;
      margin-right: 10px;
    }
  }
  .el-button{
    position: absolute;
    right: 20px;
  }
  .deco{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
  }
  .deco:hover{
    color: blue;
  }
  #showBox{
    overflow: hidden;
    height: 37px;
    margin-top: 4px;
    li{
      width: 60px;
      float: left;
      height: 100%;
      font-size:14px;
      p{
        font-size: 12px;
      }
    }
  }
</style>
