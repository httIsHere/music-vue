<template>
	<div class="musicList">
		<transition name="fade" @touchmove.stop.prevent>
			<div class="menu-mask" v-show="isShowMusicList" @click.stop="hideMusicList" @touchmove.prevent></div>
		</transition>
		<transition name="sideUp">
			<div class="musicListContent" v-show="isShowMusicList">
				<div class="musicOperate">
					<div class="play-type" @click.stop="setPlayType">
						<i :class="musicPlayType"></i>
						<span>{{typeName}}</span>
						<span>({{musiclist.length}})</span>
					</div>
					<div class="rightOpt">
						<div class="collect">
							<i class="icon-add-project"></i>
							<span>收藏</span>
						</div>
						<div class="delete">
							<i class="icon-delete"></i>
							<span>清空</span>
						</div>
					</div>
				</div>
				<ul class="musicContainer" ref="musiclistContent">
					<li class="list" v-for="(item, index) in musiclist":data-index="index" :class="index === getCurrentIndex ? 'active' : ''" @click.stop="playIndex(index)">
						<div class="border-1px"></div>
						<div class="songInfo">
							<div>
								<i v-show="index === getCurrentIndex" class="playingicon icon-volume-medium"></i>
								<span class="songName">{{item.name}}</span>
								<span class="songSinger"> - {{item.singer}}</span>
							</div>
							<i class="icon-close"></i>
						</div>
					</li>
				</ul>
			</div>
		</transition>
	</div>
</template>

<script>
	import store from '../store'
	export default {
		name: "musicList",
		data () {
			return {
				typeName: ''
			}
		},
		methods: {
			hideMusicList () {
				store.dispatch({
					type: 'hideMusicList'
				})
			},
			playIndex (index) {
				store.dispatch({
					type: 'play_Index',
					index: index
				})
				store.dispatch({
					type: 'hideMusicList'
				})
			},
			setPlayType () {
				store.dispatch('set_PlayType')
			}
		},
		computed: {
			isShowMusicList () {
				return this.$store.getters.getIsShowMusicList
			},
			musiclist () {
				return this.$store.getters.getMusicList
			},
			getCurrentIndex () {
				return this.$store.getters.getCurrentIndex
			},
			getScrollTop () {
				return this.$store.getters.getScrollTop
			},
			musicPlayType () {
				let playType = this.$store.getters.getMusicPlayType ? this.$store.getters.getMusicPlayType : -1
				let className = ''
				switch (playType) {
					case 1:
						className = 'icon-music-shunxu'
						this.typeName = '列表循环'
						break
					case 2:
						className = 'icon-music-danqu1'
						this.typeName = '单曲循环'
						break
					case 3:
						className = 'icon-music-random'
						this.typeName = '随机播放'
						break
					default:
						className = ''
				}
				return className
			}
		},
		mounted () {
			store.dispatch({
				type: 'set_RefScrollMusicList',
				refs: this.$refs.musiclistContent
			})
		}
	}
</script>