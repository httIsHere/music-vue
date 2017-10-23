<template>
	<transition name="sliderUpHideRight">
		<div class="MusicDetail" v-show="isShowMusicDetail">
			<!--<div class="filterBg" :style="{background : 'url(' + this.getCurrentMusic.img_url + ')'}"></div>-->
			<div class="filterBg"></div>
			<div class="detailContent">
				<div class="contentHeader">
					<i class="back icon-back" @click="hideMusicDetail"></i>
					<div class="musicTopDetail">
						<p class="name">{{getCurrentMusic.name}}</p>
						<p class="singer">{{getCurrentMusic.singer}}</p>
					</div>
					<i class="icon-share"></i>
				</div>
				<transition name="fade">
					<div class="content-wrapper" v-show="showCD" @click.stop="isShowCD(false)">
						<div class="cd">
							<div class="swith-line">
								<div class="triger" :class="isPlaying ? '' : 'pause'"></div>
							</div>
							<div class="cd-content" ref="cdcontent">
								<div class="wrapper" ref="cd" :class="isPlaying ? 'animate ' : ''">
									<div class="cd-bg"></div>
									<img class="img" :src="getCurrentMusic.img_url" alt="">
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</transition>
</template>

<script>
	import store from '../store'
	export default {
		data () {
			return {
				isPlay: false,
				showCD: true,
				scrollTop: 0,
				currentLrcIndex: 0
			}
		},
		methods: {
			hideMusicDetail () {
				
			}
		},
		computed: {
			isShowMusicDetail () {
				return this.$store.getters.getMusicDetail
			},
			isPlaying () {
				this.isPlay = this.$store.getters.getIsPlaying
				return this.$store.getters.getIsPlaying ? this.$store.getters.getIsPlaying : ''
			},
			getCurrentMusic () {
				return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic : ''
			},
			musicPlayType () {
				let playType = this.$store.getters.getMusicPlayType ? this.$store.getters.getMusicPlayType : -1
				let className = ''
				switch (playType) {
					case 1:
						className = 'icon-music-shunxu'
						break
					case 2:
						className = 'icon-music-danqu1'
						break
					case 3:
						className = 'icon-music-random'
						break
					default:
						className = ''
				}
				return className
			},
			musicCurrentLrc () {
				let currentMusic = this.$store.getters.getCurrentMusic
				let lrcIndex = this.$store.getters.getLyricIndex ? this.$store.getters.getLyricIndex : 0
				if (currentMusic.lyric.length) {
					return lrcIndex === -1 ? '加载中...' : currentMusic.lyric[lrcIndex].text
				} else {
					return '暂无歌词'
				}
			},
			lrcIndex () {
				return this.$store.getters.getLyricIndex ? this.$store.getters.getLyricIndex : 0
			}
		},
	}
</script>