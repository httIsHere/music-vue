<template>
	<div class="myMusic">
		<type-list name="我的音乐" iconinfo="icon-music" count="28" :playing="true"></type-list>
		<p class="border-1px"></p>
		<type-list name="最近播放" iconinfo="icon-zuijinplay" count="18"></type-list>
		<p class="border-1px"></p>
		<type-list name="我的电台" iconinfo="icon-diantai" count="1"></type-list>
		<p class="border-1px"></p>
		<type-list name="我的收藏" iconinfo="icon-collect" count="3"></type-list>
		<p class="border-1px"></p>
		<type-list name="下载管理" iconinfo="icon-add" count="专辑/歌手/视频/专栏"></type-list>
		<p class="border-1px"></p>
		<music-sheet v-for="(item, index) in items" :item="item" :index="index" :key="item.id"></music-sheet>
	</div>
</template>

<script>
	import store from '../store'
	import TypeList from './TypeList'
	import MusicSheet from './MusicSheet'
	export default {
		name: 'myMusic',
		data () {
			return {}
		},
		computed: {
				items () {		
					return this.$store.getters.getMusicAllList.sheets
				}
		},
		components: {
			TypeList,
			MusicSheet
		}
	}
</script>

<style>
</style>