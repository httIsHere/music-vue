<template>
	<div class="split" ref="split"></div>
</template>

<script>
	export default {
		name: "split",
		props: {
			height: {
				type: String,
				default: '.5'
			},
			background: {
				type: String,
				default: '#f3f5f7'
			},
			border: {
				type: String,
				default: 'transparent'
			}
		},
		mounted () {
			this.$refs.split.style.background = this.background
			this.$refs.split.style.height = `${this.height}rem`
			this.$refs.split.style.borderColor = this.border
		}
	}
</script>

<style>
</style>