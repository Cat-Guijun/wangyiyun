<template>
  <div>
    <el-container>
      <el-header style='z-index: 99;'>
        <div style="width: 100%;height: 100%; display: flex;justify-content: space-between;">
          <div class="logo" >
              <svg class="icon" aria-hidden="true" style="margin-right: 6px;font-size: 30px;">
                <use xlink:href="#icon-wangyiyun"></use>
              </svg>
              <span>网易云音乐</span>
              <el-button type="info" round @click='goFirst()'>去到首页</el-button>
          </div>
         <search class="search"></search>
         <div style="width: 180px;font-size: 13px;line-height: 67px;color: gray;">
            <span style="border: 1px solid green;" @click="dialogShow=true" v-if="judgeStatus()">登陆</span>
            <el-container v-else style="width: 180px;">
              <router-link to="/myself">
                <img class="personalInfo" :src="imgUrl">
               </router-link>
                <nav-menu :title="$store.state.userInfo.profile.nickname" v-if="$store.state.userInfo">
                </nav-menu>
            </el-container>
            <el-dialog title="登陆页面" :visible.sync="dialogShow" :center='true'>
                <el-form :model="form">
                  <el-form-item label="手机号" label-width="120px">
                    <el-input v-model="form.phoneNum" autocomplete="off"></el-input>
                    <span style="color: red;">{{firsterr}}</span>
                  </el-form-item>
                  <el-form-item label="密码" label-width="120px">
                      <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                      <span style="color: red;">{{secerr}}</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="buttons">
                  <el-button @click="dialogShow = false" :round='true' size="medium">取 消</el-button>
                  <el-button type="primary" @click="submit" :round='true' size="medium" :loading='logging'>登录</el-button>
                </div>
            </el-dialog>
         </div>
          </div>
      </el-header>
      <el-container>

          <el-main :style="{height:asideHeight}" style="overflow: auto;"><router-view/></el-main>
      </el-container>
      <el-footer height='80px'>
        <!-- <audio :src="$store.state.songUrl" controls="controls" autoplay="true"></audio> -->
        <audio-play :songTracks='this.$store.state.songTracks' :key='Math.random()'></audio-play>
      </el-footer>
    </el-container>

  </div>
</template>
<script>
  import Vue from 'vue'
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  import search from './components/searchBar.vue'
  import axios from 'axios'
  import navMenu from './views/app/navMenu.vue'
  import audioPlay from './components/audioPlay.vue'
  Vue.use(ElementUI);
  export default {
    data(){
      return {
        dialogShow:false,
        firsterr:'',
        secerr:'',
        form: {
          phoneNum: null,
          password:null,

        },
        logging:false,
        imgUrl:'',
        asideHeight:''
      }
    },
    mounted()
    {
      if(document.cookie.includes('__csrf')&&document.cookie.includes('NMTID'))
      {
        axios.get('http://localhost:3000/login/status',{
          withCredentials: true
        }).then((res)=>{
          if(res.data.data.code==200)
          {
            console.log("已经登陆的状态")
            this.$store.commit('setUserInfo',res.data);
           this.imgUrl=this.$store.state.userInfo.profile.avatarUrl+'?param=32y32';
          }
        })
      }
      this.asideHeight=document.documentElement.clientHeight-67-40-40-26+'px';
      console.log(this.asideHeight);
    },
    methods:{
      judgeStatus(){
        if(document.cookie.includes('__csrf')&&document.cookie.includes('NMTID'))
        {
           return false
        }
        else{
          return true
        }
      },
      goFirst(){
        this.$router.replace('/')
      },
      submit(){
        if(this.form.phoneNum==0||!this.form.password){
          alert("不错为空")
            return;
        }
         this.logging=true
/*        setTimeout(()=>{this.logging=false;this.dialogShow=false;
          console.log('ok!',this.logging)
        },3000) */
        axios.post('http://localhost:3000/login/cellphone',{
            phone:this.form.phoneNum,
            password:this.form.password,
        },{
          withCredentials: true
        }).then((res)=>{
          console.log(res.data)
          this.logging=false;
          if(res.data.code=='200')
          {
            this.dialogShow=false;
            axios.get('http://localhost:3000/login/status',{
              withCredentials: true
            }).then((res)=>{
              console.log("已经登陆的状态")
              this.$store.commit('setUserInfo',res.data)
              this.imgUrl=this.$store.state.userInfo.profile.avatarUrl+'?param=32y32';
            })
          }
          else if(res.data.code=='400')
          {
            this.firsterr="电话号码错误"
            this.form.password=null;
            this.form.phoneNum=null;
          }
          else if(res.data.code=='502')
          {
            this.form.password=null;
            this.secerr='密码错误'
          }
        })
      }
    },
    components:{
      search,
      navMenu,
      audioPlay
    },
    computed:{
    }
  }
</script>
<style lang="scss" scoped>
  body{
    width: 100%;
    overflow: hidden;
  }
  *{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
  }
  .personalInfo{
    display: inline-block;
    border-radius: 16px;
  }
  .buttons .el-button{

  }
    .el-header{
      width: 100%;
      height: 67px;
      background-color: #50c378;
      .logo{
        width: 175px;
        height: 100%;
        margin-left: 18px;
        line-height: 66px;
        text-align: center;
        font-size: 22px;
        color: white;
      }
    }
    .search{
      display: inline-block;
      width: 300px;
    }
</style>
