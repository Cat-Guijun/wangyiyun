<template>
  <div>
    <el-menu active-text-color='#fefefe' @select=handleSelect  text-color='#ffffff' background-color='#50c378' @open="handleOpen"
    @close='handleClose'>
        <el-submenu index='1'>
          <template #title>{{title}}<i :class="iconType" style="color: red;"></i></template>
          <el-menu-item index="1-1">等级:LV{{levelInfo | getLevel}}</el-menu-item>
          <el-menu-item index="1-2">退出登陆</el-menu-item>
        </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapState} from 'vuex'
  export default {
    mounted(){
      axios.get('http://localhost:3000/user/level',{
        withCredentials: true
      }).then((res)=>{
        this.$store.commit('setLevelInfo',res.data)
      })
    },
    props:{
      title:{
        type:String,
        default:''
      },
    },
    computed:{
      ...mapState(['levelInfo']),
    },
    data(){
      return {
        iconType:'el-icon-arrow-down',
      }
    },
    filters:{
      getLevel(levelInfo){
        if(levelInfo!=null)
        return levelInfo.level
        return ''
      }
    },
    methods:{
      handleSelect(index){
        if(index=='1-2')
        {
          axios.get('http://localhost:3000/logout',{
            withCredentials: true
          }).then(()=>{
            this.$store.commit('removeUserInfo')
            this.$store.commit('removeLevelInfo')
          })
        }
      },
      handleOpen()
      {
        this.iconType='el-icon-arrow-up'
      },
      handleClose()
      {
        this.iconType='el-icon-arrow-down'
      }
    }
  }
</script>

<style>
</style>
