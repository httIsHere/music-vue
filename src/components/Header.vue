<template>
	<div class="header">
		<div class="header-wrapper">
			<i class="menu icon-menu" @click="showMyMenu"></i>
			<div class="centerMenu">
				<router-link tag="i" to="/myMusic">
					<i class="music icon-music" :class="{'active': selectIndex===0}"></i>
				</router-link>
				<router-link tag="i" to="/findMusic">
					<i class="find icon-wangyi" :class="{'active': selectIndex===2}"></i>
				</router-link>
				<router-link tag="i" to="/community">
					<i class="community icon-community" :class="{'active': selectIndex===3}"></i>
				</router-link>
			</div>
			<i class="search icon-search"></i>
			<!--<router-view></router-view>-->
		</div>
	</div>
</template>

<script>
	import store from '../store'
	import { mapState, mapMutations, mapActions } from 'vuex'
	export default {
		name: "header",
		props: {
			index: {
				type: Number,
				default: 0
			},
			showMenu: {
				type: Boolean,
				default: false
			}
		},
		data (){
			return {
				selectIndex: this.index,
				isShowMenu: this.showMenu
			}
		},
		methods: {
			showMyMenu () {
				store.dispatch({
					type: 'showLeftBar'
				})
			}
		}
	}
</script>