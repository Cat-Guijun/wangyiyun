import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:null,
    levelInfo:null,
    songUrl:'',
    songId:5369658319,
    songTracks:[],
    musicInfo:null,
   /* searchResult:[], */
  },
  mutations: {
    setUserInfo(state,info)
    {
      state.userInfo=info.data
    },
    removeUserInfo(state){
      state.userInfo=null
    },
    setLevelInfo(state,data1)
    {
      state.levelInfo=data1.data;
    },
/*    setSearchResult(state,songs)
    {
      state.searchResult=songs
    }, */
    removeLevelInfo(state)
    {
      state.levelInfo=null
    },
    setSongId(state,id)
    {
      state.songId=id;
      state.songUrl=`https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      state.musicInfo=state.songTracks.filter((item)=>item.id==state.songId)[0]
    },
    setSongTracks(state,data)
    {
      state.songTracks=data
    }
  },
  actions: {
    getSongs(store,id)
    {
      store.commit('setSongId',id)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
