<template>
	<div class="songLists">
		<div class="songList" v-if="getSongSheet.info" v-for="(item, index) in getSongSheet.info" @click="playIndex(index)">
			<div class="wrapper">
				<div class="listIndex">
					<span>{{index + 1}}</span>
					<i class="iconIndex icon-volume-medium"></i>
				</div>
				<div class="songInfo">
					<div class="detail">
						<p class="name"></p>
						<p class="singer"></p>
					</div>
					<div class="border-1px"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../store'
	export default {
		methods: {
			playIndex (index) {
				if (index === this.$store.getters.getCurrentIndex && this.$store.getters.getMusicSheetList.type === this.$store.getters.getMusiSheetType) {
					return
				}
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
			showmenu (name) {
				store.dispatch({
					type: 'showMenuList',
					amount: {
						title: name,
						content: [
							{
								name: '删除',
								iconinfo: 'icon-delete',
								count: 'none',
								bgcolor: '#fff'
							}
						]
					}
				})
			}
		},
		computed: {
			getSongSheet () {
				return this.$store.getters.getMusicSheetList ? this.$store.getters.getMusicSheetList : ''
			},
			showVolume () {
				let sheetType = this.$store.getters.getMusiSheetType
				let thisSheetType = this.$store.getters.getMusicSheetList.type
				if (sheetType === thisSheetType) {
					return true
				} else {
					return false
				}
			},
			getCurrentIndex () {
				return this.$store.getters.getCurrentIndex
			}
		}
	}
</script>