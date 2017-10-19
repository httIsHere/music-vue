<template>
	<div class="bottomPlayer" @click="showMusicDetail">
		<div class="musicInfo">
			<img :src="musicImage" class="musicPic" />
			<div class="musicDetail">
				<p class="musicName"></p>
				<p class="musicSinger"></p>
			</div>
			<div class="playPause">
				<i :class="iconPlayPause?'icon-pause':'icon-play'"></i>
			</div>
			<i class="musicList icon-list-music" @click.stop="showMusicList"></i>
		</div>
	</div>
</template>

<script>
	import store from '../../store'
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
		}
	}
</script>