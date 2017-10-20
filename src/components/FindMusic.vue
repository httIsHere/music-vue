<template>
	<div class="findMusic">
		<div class="titleBar">
			<div class="musicPart" :class="{'active': currentView==='musicView'}" @click="currentView='musicView'">音乐</div>
			<div class="videoPart" :class="{'active': currentView==='videoView'}" @click="currentView='videoView'">视频</div>
			<div class="radioPart" :class="{'active': currentView==='radioView'}" @click="currentView='radioView'">电台</div>
		</div>
		<div class="activeBottom":class="{'videoBottom': currentView==='videoView','radioBottom': currentView==='radioView'}"></div>
		<transition name="side">
			<component :is="currentView" :listImg="listImg"></component>
		</transition>
	</div>
</template>

<script>
	import MusicView from './MusicView'
	import VideoView from './VideoView'
	import RadioView from './RadioView'
	import store from '../store'
	export default {
		name: "findMusic",
		props: ['listImg'],
		data () {
			return {
				currentView: 'musicView'
			}
		},
		methods: {
			
		},
		components: {
			MusicView,
			VideoView,
			RadioView
		},
		mounted () {
			store.commit({
				type: 'setCurrentView',
				index: 2
			})
		}
	}
</script>