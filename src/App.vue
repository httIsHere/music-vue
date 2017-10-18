<template>
  <div id="app">
    <audio src=""></audio>
    <!--header(默认显示第二个模块)-->
    <v-header :index="2"></v-header>
    <!--left-view(绑定用户信息)-->
    <left-bar :info="info"></left-bar>
    <!--music list-->
    <music-list></music-list>
    <!--player-->
    <bottom-player></bottom-player>
    <!--my music-->
    <my-music></my-music>
    <!--music detail-->
    <music-detail></music-detail>
    <!--album detail-->
    <album-detail></album-detail>
  </div>
</template>

<script>
import header from './components/header'
import leftbar from './components/leftBar'
import musiclist from './components/musicList'
import bottomplayer from './components/bottomPlayer'
import mymusic from './components/myMusic'
import musicdetail from './components/musicDetail'
import albumdetail from './components/albumDetail'

export default {
  name: 'app',
  data () {
  	return {
  		info: {}
  	}
  },
  methods: {
  	
  }
}
</script>

<style>
@import "/static/font-icon/style.css"
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
