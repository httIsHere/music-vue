<template>
	<div class="musicView">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="str in listImg" :style="{ backgroundImage: 'url(' + str.url + ')' }"></div>
			</div>
			<div class="swiper-pagination swiper-pagination-white"></div>
		</div>
		<div class="musicView-menu">
			<router-link class="menu-list" tag="div" to="/findMusic/findRecommend">
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
		<p class="border-1px"></p>
		<find-recommend-title></find-recommend-title>
		<div class="recommend-list">
			<find-recommend-list v-if="reconmmend" v-for="(sheet, sheetindex) in reconmmend.findmusic.reconmmend.recommendMinSheets" :sheet="sheet" :key="sheet.id" :imagesrc="sheet.info[0].img_url" :showtoprighttips="sheet.showtoptips" :listpadding="sheet.padding" :toprighticonclass="sheet.toptipsclass" :toprighttitle="sheet.listencount" :showbottomtips="sheet.showbottomtips" :bottomtips="sheet.bottomtips" :showbottomtitle="sheet.showbottomtitle" :bottomtitle="sheet.bottomtitle" :listwidth="sheet.listwidth" @click.stop="showSongSheet()"></find-recommend-list>
		</div>
		<find-recommend-view></find-recommend-view>
	</div>
</template>

<script>
	import store from '../store'
	import Swiper from 'swiper'
	import 'swiper/dist/css/swiper.min.css';
	import FindRecommendTitle from './FindRecommendTitle'
	import FindRecommendList from './FindRecommendList'
	import FindRecommendView from './FindRecommendView'
	export default {
		name: 'musicView',
		props: ['listImg'],
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
		},
		components: {
			FindRecommendTitle,
			FindRecommendList,
			FindRecommendView
		},
		computed: {
			reconmmend () {
				return store.getters.getAllInfo
			}
		},
	    methods: {
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