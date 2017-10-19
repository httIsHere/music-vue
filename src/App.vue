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
import Header from './components/Header'
import LeftBar from './components/LeftBar'
import MusicList from './components/MusicList'
import BottomPlayer from './components/BottomPlayer'
import MyMusic from './components/MyMusic'
import MusicDetail from './components/MusicDetail'
import AlbumDetail from './components/AlbumDetail'

export default {
  name: 'app',
  data () {
  	return {
  		info: {
  			name: '翘课迟到少恭桑',
  			grade: 7
  		}
  	}
  },
  components: {
  	"v-header": Header,
  	LeftBar,
  	MusicDetail,
  	MusicList,
  	MyMusic,
  	BottomPlayer,
  	AlbumDetail
  },
  methods: {
  	
  }
}
</script>

<style>
@import url("/static/font-icon/style.css");
@import url("assets/css/style.css");
body{
	margin: 0;
	padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
</style>
