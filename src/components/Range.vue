<template>
	<div class="range" @mousemove.stop()="mouseMove($event)"  @mouseup.stop()="mouseUp" @mouseleave.stop()="mouseUp">
		<span class="span-left" v-show="type==='progress'">{{timerFomart(musicCurrentTime)}}</span>
		<i class="rangeicon icon-volume-medium" v-show="type === 'volume'"></i>
		<div class="duration" ref="duration" @click.stop="setCurrentProgress($event)">
			<span class="currentProgress" :style="progressWidth" ref="currentProgress" ></span>
			<span class="ball" ref="ball" @mousedown.stop()="mouseDown" @touchstart.stop()="mouseDown" @touchmove.stop()="touchMove($event)" @touchend.stop()="touchEnd($event)" ></span>
		</div>
		<span class="span-right" v-show="type === 'progress'">{{timerFomart(musicDuration)}}</span>
	</div>
</template>

<script>
	let canDrag = false
	let persentWidth = 0
	export default {
		data () {
			return {
				type: '',
				currenttime: 0,
				volume: 0.2
			}
		},
		props: {
			rangeType: {
				type: String,
				default: 'progress'
			}
		},
	computed: {
		musicCurrentTime () {
			if (this.type === 'progress') {
				return this.$store.getters.getCurrentTime ? this.$store.getters.getCurrentTime : '00:00'
			}
			if (this.type === 'volume') {
				return false
			}
		},
		musicDuration () {
			if (this.type === 'progress') {
				return this.$store.getters.getMusicDuration ? this.$store.getters.getMusicDuration : '00:00'
			}
			if (this.type === 'volume') {
				return false
			}
		},
		progressWidth () {
			if (this.type === 'progress') {
				if (this.$store.getters.getIsLoadStart) {
					return {
						'width': '0'
					}
				} else {
					return {
						'width': `calc(${(this.$store.getters.getCurrentTime / this.$store.getters.getMusicDuration * 100).toFixed(2)}%`
					}
				}
			}
			if (this.type === 'volume' && this.$store.getters.getAudioElement) {
				this.$store.getters.getAudioElement.volume = this.volume
				return {
					'width': `${this.volume * 100}%`
				}
			}
		}
	},
	methods: {
		mouseDown () {
			canDrag = true
		},
		mouseMove (event) {
			if (canDrag) {
				let e = event || window.event
				let mouseX = e.pageX
				let offsetLeft = this.$refs.duration.offsetLeft
				persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
				persentWidth = persentWidth > 100 ? 100 : persentWidth
				persentWidth = persentWidth < 0 ? 0 : persentWidth
				if (this.type === 'progress') {
					// this.$store.getters.getAudioElement.currentTime = this.duration * persentWidth / 100
					this.$refs.currentProgress.style.width = `calc(${persentWidth}%`
				}
				if (this.type === 'volume') {
					this.$store.getters.getAudioElement.volume = persentWidth / 100
					this.$refs.currentProgress.style.width = `calc(${persentWidth}%`
				}
			} else {
				return
			}
		},
		mouseUp () {
			if (canDrag !== false) {
				canDrag = false
				if (this.type === 'progress') {
					if (isNaN(this.$store.getters.getAudioElement.duration)) return
					this.$store.getters.getAudioElement.currentTime = this.$store.getters.getAudioElement.duration * persentWidth / 100
				}
				if (this.type === 'volume') {
					this.$store.getters.getAudioElement.volume = persentWidth / 100
				}
			}
		},
		touchMove (event) {
			if (canDrag) {
				if (this.type === 'progress') {
					let mouseX = event.touches[0].pageX
					let offsetLeft = this.$refs.duration.offsetLeft
					persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
					persentWidth = persentWidth > 100 ? 100 : persentWidth
					persentWidth = persentWidth < 0 ? 0 : persentWidth
					// this.$store.getters.getAudioElement.currentTime = this.duration * persentWidth / 100
					this.$refs.currentProgress.style.width = `calc(${persentWidth}%`
				}
				if (this.type === 'volume') {
					let mouseX = event.touches[0].pageX
					let offsetLeft = this.$refs.duration.offsetLeft
					persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
					// alert(Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100))
					this.$store.getters.getAudioElement.volume = persentWidth / 100
					this.$refs.currentProgress.style.width = `calc(${persentWidth}%`
				}
			} else {
				return
			}
		},
		touchEnd (event) {
			if (canDrag !== false) {
				canDrag = false
				if (this.type === 'progress') {
					if (isNaN(this.$store.getters.getAudioElement.duration)) return
					this.$store.getters.getAudioElement.currentTime = this.$store.getters.getAudioElement.duration * persentWidth / 100
				}
				if (this.type === 'volume') {
					this.$store.getters.getAudioElement.volume = persentWidth / 100
				}
			}
		},
		setCurrentProgress (event) {
			if (this.type === 'progress') {
				let e = event || window.event
				let mouseX = e.pageX
				let offsetLeft = this.$refs.duration.offsetLeft
				persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
				persentWidth = persentWidth > 100 ? 100 : persentWidth
				persentWidth = persentWidth < 0 ? 0 : persentWidth
				if (isNaN(this.$store.getters.getAudioElement.duration)) return
				this.$store.getters.getAudioElement.currentTime = Math.floor(this.$store.getters.getAudioElement.duration * persentWidth) / 100
				this.$refs.currentProgress.style.width = `calc(${persentWidth}%`
			}
			if (this.type === 'volume') {
				let e = event || window.event
				let mouseX = e.pageX
				let offsetLeft = this.$refs.duration.offsetLeft
				persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
				this.$store.getters.getAudioElement.volume = persentWidth / 100
				this.$refs.currentProgress.style.width = `calc(${persentWidth}%`
			}
		},
		timerFomart (time) {
			if (isNaN(time)) return '00:00'
			let min = time / 60 > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60)
			let miao = time % 60 > 9 ? Math.floor(time % 60) : '0' + Math.floor(time % 60)
			return min + ':' + miao
		}
	},
	mounted () {
		this.type = this.rangeType
	}
	}
</script>