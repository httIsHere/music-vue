<template>
	<div class="typeList">
		<div class="typeListDetail">
			<i class="info" :class="iconInfo"></i>
			<span class="typeName">{{listName}}</span>
			<span class="typeCount">({{listCount}})</span>
		</div>
		<i v-if="isPlaying" class="isPlaying icon-volume-medium"></i>
	</div>
</template>

<script>
	export default {
		name: 'typeList',
		props: {
			name: {
				type: String,
				default: '汪叽汪汪汪~叽叽叽~'
			},
			count: {
				type: String,
				default: '1'
			},
			playing: {
				type: Boolean,
				default: false
			},
			iconinfo: {
				type: String
			},
			bgColor: {
				type: String,
				default: '#f7f7f7'
			}
		},
		data () {
			return {
				listName: '',
				listCount: '',
				isPlaying: false,
				iconInfo: '',
				listBg: ''
			}
		},
		created () {
			this.listName = this.name
			this.listCount = this.count
			this.showBorder = this.hasBorder
			this.isPlaying = this.playing
			this.iconInfo = this.iconinfo
			this.typelistbg = this.bgcolor
		}
	}
</script>

<style>
</style>