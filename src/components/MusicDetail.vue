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
						<div class="musicDo">
							<i class="icon icon-like"></i>
							<i class="icon icon-download"></i>
							<i class="icon icon-msg"></i>
							<i class="icon icon-list-circle-small"></i>
						</div>
					</div>
				</transition>
				<transition name="fade">
					<div class="lrc-wrapper" ref="lrcwrapper" v-show="!showCD" @click.stop="isShowCD(true)">
						<div class="volume-range">
							<range range-type="volume"></range>
						</div>
						<div class="lrc" ref="lrc" :scroll-top.prop="scrollTop">
							<div class="div-lrc" ref="divlrc">
								<p v-if="getCurrentMusic.lyric==''">暂无歌词</p>
								<p v-if="getCurrentMusic" v-for="(lrc, index) in getCurrentMusic.lyric" :data-index="index" :class="lrcIndex === index ? 'active musiclrc' : 'musiclrc'" :data-timeid="lrc.timeId">{{lrc === '' ? '暂无歌词' : lrc.text}}</p>
							</div>
						</div>
					</div>
				</transition>
				<div class="content-footer">
					<div class="div-range">
						<range></range>
					</div>
					<div class="musicDetailCtrl">
						<i class="playType" :class="musicPlayType" @click.stop="setPlayType"></i>
						<i class="prev icon-prevdetail" @click.stop="playPrev"></i>
						<i class="playPause" :class="isPlaying ? 'icon-pause-detail' : 'icon-playdetail' " @click.stop="playPause"></i>
						<i class="next icon-nextdetail" @click.stop="playNext"></i>
						<i class="menu icon-list-music" @click.stop="showMusicList"></i>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import store from '../store'
	import Range from './Range'
	export default {
		data () {
			return {
				isPlay: true,
				showCD: false,
				scrollTop: 0,
				currentLrcIndex: 0
			}
		},
		methods: {
			hideMusicDetail () {
				store.dispatch({
					type: 'set_MusicDetail',
					isShow: false
				})
				this.showCD = true
			},
			playPause () {
				// 控制音乐播放暂停
				store.commit('togglePlay')
			},
			playNext () {
				store.dispatch('play_Next')
			},
			playPrev () {
				store.dispatch('play_Prev')
			},
			// 显示音乐列表
			showMusicList () {
				let scrollTop = (this.$store.getters.getCurrentIndex + 1 - 3) * 42
				store.dispatch({
					type: 'set_ScrollTop',
					scrollTop: scrollTop
				})
				store.dispatch('showMusicList')
			},
			// 设置播放类型
			setPlayType () {
				store.dispatch('set_PlayType')
			},
			isShowCD (bool) {
				this.showCD = bool
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
		mounted () {
			let _this = this
			setInterval(function () {
				if (_this.currentLrcIndex >= 0 && document.getElementsByClassName('musiclrc')[_this.currentLrcIndex]) {
					let height = _this.$refs.lrc.offsetHeight
					let top = document.getElementsByClassName('musiclrc')[_this.currentLrcIndex].offsetTop
					_this.scrollTop = top - height / 2
				}
			}, 2000)
		},
		components: {
			Range
		},
		watch: {
			isPlay: function (newisPlay, oldisPlay) {
				if (newisPlay !== true) {
					let imageTrans = getComputedStyle(this.$refs.cd).transform
					let contentTrans = getComputedStyle(this.$refs.cdcontent).transform
					this.$refs.cdcontent.style.transform = contentTrans === 'none' ? imageTrans : imageTrans.concat('', contentTrans)
				}
			},
			showCD: function (newisPlay, oldisPlay) {
				if (newisPlay !== true) {
					if (this.currentLrcIndex >= 0 && document.getElementsByClassName('musiclrc')[this.currentLrcIndex]) {
						let height = this.$refs.lrc.offsetHeight
						let top = document.getElementsByClassName('musiclrc')[this.currentLrcIndex].offsetTop
						this.scrollTop = top - height / 2
					}
				}
			},
			lrcIndex: function (newisPlay, oldisPlay) {
				this.currentLrcIndex = newisPlay
				if (document.getElementsByClassName('musiclrc')[newisPlay]) {
					let height = this.$refs.lrc.offsetHeight
					let top = document.getElementsByClassName('musiclrc')[newisPlay].offsetTop
					this.scrollTop = top - height / 2
				}
			}
		}
	}
</script>