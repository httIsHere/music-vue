<template>
	<div class="sideList">
		<i class="icon" :class="side_iconclass"></i>
		<span class="title">{{side_title}}</span>
		<span class="disc" v-show="showDisc">{{side_disc}}</span>
	</div>
</template>

<script>
	export default {
		name: "sideList",
		props: {
			iconclass: {
				type: String,
				default: ''
			},
			sidetitle: {
				title: String,
				default: ''
			},
			disc: {
				title: String,
				default: ''
			}
		},
		data () {
			return {
				side_iconclass: this.iconclass,
				side_title: this.sidetitle,
				side_disc: this.disc
			}
		},
		computed: {
			showDisc () {
				return this.side_disc.length
			}
		},
	}
</script>

<style>
</style>