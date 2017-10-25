<template>
	<transition name="fade">
		<div class="findRecommendView" ref="songsheet" @scroll="scrollEvent" v-show="showSongSheet">
			<div class="titleImage">
				<div class="wenan">
					<div class="songHeader">
						<i class="back icon-back" @click.stop="hideSongSheet"></i>
						<span class="title">歌单</span>
					</div>
					<div class="sheetInfo">
						<div class="sheetImage">
							<img v-if="getSongSheet.info" :src="getSongSheet.info[0].img_url" class="image" />
						</div>
						<div class="info">
							<p v-if="getSongSheet" class="songSheetName">{{getSongSheet.name}}</p>
							<div class="user">
								<img  v-if="getSongSheet.user" class="avatar" :src="getSongSheet.user.avatar" alt="">
								<p v-if="getSongSheet.user" class="songsheetuser">{{getSongSheet.user.name}}</p>
								<i class="icon-right"></i>
							</div>
						</div>
					</div>
				</div>
				<div class="frDo">
					<div class="list nocollect">
						<i class="icon-collect"></i>
						<span class="disc">收藏</span>
					</div>
					<div class="list">
						<i class="icon-music"></i>
						<span class="disc">评论</span>
					</div>
					<div class="list">
						<i class="icon-share"></i>
						<span class="disc">分享</span>
					</div>
					<div class="list">
						<i class="icon-download"></i>
						<span class="disc">下载</span>
					</div>
				</div>
			</div>
			<div class="playBar">
				<span @click="playAll(0)"><i class="icon-playdetail"></i>播放全部</span>
				<span>
				<i class="icon-list-music"></i>
				多选
			</span>
			</div>
			<p class="border-1px"></p>
			<song-list></song-list>
		</div>
	</transition>
</template>

<script>
	import SongList from './SongList'
	import store from '../store'
	export default {
		data () {
			return {
				sheetData: {}
			}
		},
		components: {
			SongList
		},
		methods: {
			hideSongSheet () {
				store.commit({
					type: 'setIsShowSongSheet',
					isShow: false
				})
			},
			scrollEvent () {
				// alert(this.$refs.songsheet.scrollTop)
				let opacity = this.$refs.songsheet.scrollTop / (this.$refs.top.offsetHeight - this.$refs.songheader.offsetHeight)
				if (this.$refs.songsheet.scrollTop < this.$refs.top.offsetHeight - this.$refs.songheader.offsetHeight) {
					this.$refs.songheader.style.opacity = opacity
					this.$refs.songheader.style.filter = `alpha(opacity:${opacity * 100})`
				} else {
					this.$refs.songheader.style.opacity = 1
					this.$refs.songheader.style.filter = `alpha(opacity:${100})`
				}
			},
			playAll (index) {
				// index 是从第几个开始播放
				store.commit({
					type: 'setMusiSheetType',
					sheettype: this.$store.getters.getMusicSheetList.type
				})
				store.commit({
					type: 'setMusicList',
					list: this.$store.getters.getMusicSheetList.info
				})
				store.commit({
					type: 'playIndex',
					index: index
				})
			},
			showDownloadImg () {
				this.showDownloadImage = true
				this.$refs.songsheet.style.overflow = 'hidden'
			},
			hideDownloadImg () {
				this.showDownloadImage = false
				this.$refs.songsheet.style.overflow = 'auto'
			}
		},
		computed: {
			showSongSheet () {
				this.isShow = this.$store.getters.getIsShowSongSheet ? this.$store.getters.getIsShowSongSheet : false
				return this.isShow
			},
			getSongSheet () {
				this.sheetData = this.$store.getters.getMusicSheetList
				return this.$store.getters.getMusicSheetList ? this.$store.getters.getMusicSheetList : ''
			},
			getImageColor () {
				return this.$store.getters.getSongSheetImageColor ? this.$store.getters.getSongSheetImageColor : '#333'
			}
		}
	}
</script>