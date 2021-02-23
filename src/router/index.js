import Vue from 'vue'
import VueRouter from 'vue-router'
import findMusic from '../views/findMusic.vue'
import myself from  '../views/myself.vue'
import friend from '../views/friend.vue'
import detailSheet from '../views/detailSheet.vue'
import song from '../views/song.vue'
import searchInfo from '../views/searchInfo.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:findMusic
  },
  {
    path:'/search',
    component:searchInfo
  },
  {
    path:'/song/:songId',
    component:song,
  },
  {
    path:'/playlist/:sheetId',
    component:detailSheet
  },
  {
    path:'/myself',
    component:myself
  },
  {
    path:'/friend',
    component:friend
  },
  {
    path:'*',
    redirect:'/'
  }
]

const router = new VueRouter({
  routes
})

export default router
