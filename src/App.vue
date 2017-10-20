<template>
	<div id="app">
		<audio id="myaudio" ref="audio" @timeupdate="musicTimeUpdate" @canplay="musicCanPlay" @playing="musicOnPlaying" @ended="musicEnded" @waiting="musicOnWaiting" @pause="musicOnPause" @loadstart="loadStart"></audio>
		<!--header(默认显示第二个模块)-->
		<v-header :index="index"></v-header>
		<!--left-view(绑定用户信息)-->
		<left-bar :info="info"></left-bar>
		<!--music list-->
		<music-list></music-list>
		<!--player-->
		<bottom-player></bottom-player>
		<!--my music-->
		<!--<my-music></my-music>-->
		<router-view :listImg="listImg"></router-view>
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

	import Vue from 'vue'
	import axios from 'axios'
	import Vueaxios from 'vue-axios'
	import store from './store'

	Vue.use(Vueaxios, axios)

	let musicLrcIndex = 0
	export default {
		name: 'app',
		data() {
			return {
				info: {},
				listImg: [
					{url:"http://p1.music.126.net/XJS6KaA-B2oxceMMRqPhkg==/18729081069623259.jpg"},
					{url:"http://p1.music.126.net/MsxtxgkMQELVADsF-zBSQA==/18515775813821217.jpg"},
					{url:"http://p1.music.126.net/p9PB_P4C71gTbCBHCEIcrw==/18972073137658694.jpg"},
					{url:"http://p1.music.126.net/SIdg-Xoikwet0CublOpy3Q==/18531168976618358.jpg"}
				],
				index: this.$store.getters.getCurrentView
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
			//结束事件
			musicEnded() {
				store.dispatch('play_Ended')
				musicLrcIndex = 0
				store.commit({
					type: 'setLyricIndex',
					index: 0
				})
			},
			musicTimeUpdate() {
				store.dispatch({
					type: 'set_CurrentTime',
					time: Math.floor(this.$refs.audio.currentTime)
				})

				// 设置歌词内容(以索引的形式显示,主要是)
				let musicLrc = store.getters.getCurrentMusic.lyric
				let currentTime = Math.floor(this.$refs.audio.currentTime)
				if(musicLrc[musicLrcIndex] === undefined) {
					return
				}
				if(musicLrc.length === 0) {
					store.commit({
						type: 'setLyricIndex',
						index: -1
					})
					return
				}
				for(let i = 0; i < musicLrc.length; i++) {
					if(currentTime >= Number(musicLrc[musicLrcIndex].timeId)) {
						musicLrcIndex += 1
						// return
						break
					} else {
						if(musicLrcIndex <= 0) {
							musicLrcIndex = 0
						} else {
							musicLrcIndex--
						}
					}
				}
				store.commit({
					type: 'setLyricIndex',
					index: musicLrcIndex
				})
			},
			musicCanPlay() {
				store.dispatch({
					type: 'set_MusicDuration',
					duration: Math.floor(this.$refs.audio.duration)
				})
				store.commit({
					type: 'setMusicLoadStart',
					isloadstart: false
				})
			},
			// 音乐处于播放状态
			musicOnPlaying() {
				store.commit('play')
			},
			// 音乐处于watting状态
			musicOnWaiting() {
				// alert('音乐加载中')
			},
			// 音乐处于暂停状态
			musicOnPause() {
				store.commit('pause')
			},
			// 音乐加载
			loadStart() {
				store.commit({
					type: 'setMusicLoadStart',
					isloadstart: true
				})
			}
		},
		created () {
			let LocalAPI = './static/data.json'
			axios.get(LocalAPI).then(res => {
				this.info = res.data.user
				store.dispatch('set_MusicAllList', res.data.music)
				store.dispatch('set_AllInfo', res.data)
				this.$refs.audio.setAttribute('src', store.getters.getCurrentMusic.url)
				store.dispatch('set_AudioElement', this.$refs.audio)
			})
		}
	}
</script>

<style>
	@import url("/static/font-icon/style.css");
	@import url("assets/css/style.css");
	body {
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