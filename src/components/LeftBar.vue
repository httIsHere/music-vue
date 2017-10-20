<template>
	<div class="leftBar">
		<transition name="fade" @touchmove.stop.prevent>
			<div class="menu-mask" v-show="isRealShow" @click="hideMenu"></div>
		</transition>

		<transition name="side">
			<div class="menu-content" v-show="isRealShow">
				<div class="menu-detail" ref="menuDetail">
					<div class="menu-userInfo">
						<img :src="info.avatar" class="avatar" /><br />
						<div class="user-detail">
							<span class="name">{{info.name}}</span>
							<img src="../assets/images/vip.png" class="isVip" />
							<span class="progress">Lv.{{info.grade}}</span>
						</div>
						<span class="sign" @click="signClick">
							<i class="icon-coin" v-show="showIcon"></i>{{sign}}
						</span>
					</div>
				</div>
				<div class="content">
					<sidelist iconclass="icon-message" sidetitle="我的消息" disc=""></sidelist>
					<sidelist iconclass="icon-vip" sidetitle="我的会员" disc="2018.05.10到期"></sidelist>
					<sidelist iconclass="icon-market" sidetitle="商城"></sidelist>
					<sidelist iconclass="icon-market" sidetitle="在线听歌免流量"></sidelist>
					<split background="#f0f0f0" height=".2" border="#eee"></split>
					<sidelist iconclass="icon-friend" sidetitle="我的好友"></sidelist>
					<sidelist iconclass="icon-place" sidetitle="附近的人"></sidelist>
					<split background="#f0f0f0" height=".2" border="#eee"></split>
					<sidelist iconclass="icon-theme" sidetitle="个性换肤" disc="官方白"></sidelist>
					<sidelist iconclass="icon-set-time" sidetitle="听歌识曲"></sidelist>
					<sidelist iconclass="icon-set-time" sidetitle="定时播放"></sidelist>
					<sidelist iconclass="icon-set-time" sidetitle="扫一扫"></sidelist>
					<sidelist iconclass="icon-lock" sidetitle="音乐闹钟"></sidelist>
					<sidelist iconclass="icon-car" sidetitle="驾驶模式"></sidelist>
					<sidelist iconclass="icon-cloud" sidetitle="音乐云盘"></sidelist>
				</div>
				<div class="footer">
					<p class="border-1px"></p>
					<div>
						<div class="nightmode">
							<i class="icon-night"></i>
							<span>夜间模式</span>
						</div>
						<div class="setting">
							<i class="icon-setting"></i>
							<span>设置</span>
						</div>
						<div class="exit">
							<i class="icon-exit"></i>
							<span>退出</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import store from '../store'
	import sidelist from './SideList'
	import split from './Split'
	export default {
		name: 'leftBar',
		props: {
			info: {
				type: Object
			}
		},
		data() {
			return {
				sign: '签到',
				showIcon: true,
				userInfo: ''
			}
		},
		methods: {
			hideMenu() {
				store.dispatch({
					type: 'hideLeftBar'
				})
			},
			signClick() {
				this.sign = '已签到'
				this.showIcon = false
			}
		},
		computed: {
			isRealShow() {
				return store.state.leftBar.isShow;
			}
		},
		components: {
			sidelist,
			split
		},
		mounted () {
			console.log(this.info.bg)
			this.$refs.menuDetail.style.backgroundImage = "url("+this.info.bg+")"
		}
	}
</script>