<template>
	<div class="findRecommendView">
		<div class="titleImage">
			<div class="wenan">
				<span>根据你的喜好……</span>
			</div>
			<div class="frDo">
				<div class="list nocollect">
					<i class="icon-collect"></i>
					<span class="disc">收藏</span>
				</div>
				<div class="list">
					<i class="icon-music"></i>
					<span class="disc">评论</span>
				</div>
				<div class="list">
					<i class="icon-share"></i>
					<span class="disc">分享</span>
				</div>
				<div class="list">
					<i class="icon-download"></i>
					<span class="disc">下载</span>
				</div>
			</div>
		</div>
		<div class="playBar">
			<span @click="playAll(0)"><i class="icon-playdetail"></i>播放全部</span>
			<span>
				<i class="icon-list-music"></i>
				多选
			</span>
		</div>
		<p class="border-1px"></p>
		<songlist></songlist>
	</div>
</template>

<script>
	import SongList from './SongList'
</script>