<template>
	<div class="musicSheet">
		<div class="myMusicSheet" @click="showSheets=!showSheets">
			<div>
				<i class="upDown" :class="showSheets?'icon-down':'icon-right'"></i>
				<span>{{data_item.name}}</span>
				<!--<span>{{data_item.count}}</span>-->
			</div>
			<i class="icon-setting" @click.stop="showSheetMenu(data_item.name)"></i>
		</div>
		<div class="songSheet" v-show="showSheets" v-for="(list, listindex) in data_item.detail" @click.stop="showSongSheet(list)">
			<div class="content">
				<img :src="list.info[0].img_url" class="sheetImg" />
				<div class="detail">
					<div class="name">{{list.name}}</div>
					<div class="count">{{list.count}}首</div>
				</div>
				<i class="setting icon-list-circle" @click.stop="showMenu(list.name)"></i>
			</div>
			<p class="border-1px"></p>
		</div>
	</div>
</template>

<script>
	import store from '../store'
	export default {
		props: {
			item: {
				type: Object
			},
			index: {
				type: Number
			}
		},
		data () {
			return {
				showSheets: true,
				data_item: {},
				data_index: {}
			}
		},
		computed: {
			getSheets () {
				return this.$store.getters.getMusicAllList.sheets
			}
		},
		mounted () {
			this.data_item = this.item
			this.data_index = this.index
		},
		methods: {
			showMenu (name) {
				store.dispatch({
					type: 'showMenuList',
					amount: {
						title: `歌单:${name}`,
						content: [
							{
								name: '分享',
								iconinfo: 'icon-share',
								count: 'none',
								bgcolor: '#fff'
							},
							{
								name: '编辑',
								iconinfo: 'icon-edit',
								count: 'none',
								bgcolor: '#fff'
							},
							{
								name: '删除',
								iconinfo: 'icon-delete',
								count: 'none',
								bgcolor: '#fff'
							}
						]
					}
				})
			},
			showSheetMenu (name) {
				store.dispatch({
					type: 'showMenuList',
					amount: {
						title: name,
						content: [{
							name: '删除',
							iconinfo: 'icon-delete',
							count: 'none',
							bgcolor: '#fff'
						}]
					}
				})
			},
			showSongSheet (data) {
				store.dispatch({
					type: 'set_MusicSheetList',
					data: data
				})
				store.commit({
					type: 'setIsShowSongSheet',
					isShow: true
				})
			}
		}
	}
</script>