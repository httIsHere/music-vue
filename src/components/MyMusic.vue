<template>
	<div class="myMusic">
		<type-list name="我的音乐"></type-list>
	</div>
</template>

<script>
	import store from '../store'
	import TypeList from './TypeList'
	export default {
		name: 'myMusic',
		data () {
			return {
				items () {
					
				}
			}
		},
		components: {
			TypeList
		},
		methods: {
			
		}
	}
</script>

<style>
</style>