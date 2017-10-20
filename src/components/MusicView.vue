<template>
	<div class="musicView">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="str in listImg" :style="{ backgroundImage: 'url(' + str.url + ')' }"></div>
			</div>
			<div class="swiper-pagination swiper-pagination-white"></div>
		</div>
		<div class="musicView-menu">
			<router-link class="menu-list" tag="div" to="/findMusic/findrecommend">
				<div class="menu-list-div">
					<div class="recommand">
						<i class="icon-vip"></i>
					</div>
					每日推荐
				</div>
			</router-link>
			<router-link class="menu-list" tag="div" to="/findMusic/findsheet">
				<div class="menu-list-div">
					<div class="songSheet">
						<i class="icon-list-music"></i>
					</div>
					个性歌单
				</div>
			</router-link>
			<router-link class="menu-list" tag="div" to="/ccc">
				<div class="menu-list-div">
					<div class="selfFM">
						<i class="icon-diantai"></i>
					</div>
					私人电台
				</div>
			</router-link>
			<router-link class="menu-list" tag="div" to="/ddd">
				<div class="menu-list-div">
					<div class="rank">
						<i class="icon-music"></i>
					</div>
					热门排行
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import 'swiper/dist/css/swiper.min.css';
	export default {
		name: 'musicView',
		props: ['listImg'],
		data () {
			return {}
		},		
		mounted () {
			var swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
                paginationClickable: true,
                loop: true,
                speed: 600,
                autoplay: 2000,
                onTouchEnd: function() {
                    swiper.startAutoplay()
                }
			})
		}
	}
</script>