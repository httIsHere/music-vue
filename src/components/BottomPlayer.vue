<template>
	<div class="bottomPlayer" @click="showMusicDetail">
		<div class="musicInfo">
			<img :src="musicImage" class="musicPic" />
			<div class="musicDetail">
				<p class="musicName" v-if="musicName">{{musicName}}</p>
				<p class="musicSinger" v-if="musicSinger">{{musicSinger}}</p>
			</div>
			<div class="playPause" @click.stop="playPause">
				<i :class="iconPlayPause?'icon-pause':'icon-play'"></i>
			</div>
			<i class="musicList icon-list-music" @click.stop="showMusicList"></i>
		</div>
	</div>
</template>

<script>
	import store from '../store'
	export default {
		name: "bottomPlayer",
		data () {
			return {
				audioInfo: {},
				myAudio: {},
				state: {
					isPlaying: false,
					loading: false,
					currentIndex:0
				}
			}
		},
		methods: {
			showMusicDetail () {
				store.dispatch({
					type: 'set_MusicDetail',
					isShow: true
				})
			},
			playPause () {
				store.commit('togglePlay')
			},
			showMusicList () {
				let scrollTop = (this.$store.getters.getCurrentIndex + 1 - 3) * 42
				store.dispatch({
					type: 'set_ScrollTop',
					scrollTop: scrollTop
				})
				store.dispatch('showMusicList')
			},
			playNext () {
				store.dispatch('play_Next')
			}
		},
		computed: {
			iconPlayPause () {
				return this.audioInfo.playing
			},
			musicName () {
				return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.name : ''
			},
			musicSinger () {
				return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.singer : ''
			},
			musicImage () {
				return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.img_url : ''
			},
			musicUrl () {
				return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.url : ''
			}
		},
		mounted () {
			this.audioInfo = this.$store.state.audioInfo
			this.state.isplaying = this.audioInfo.playing
		}
	}
</script>