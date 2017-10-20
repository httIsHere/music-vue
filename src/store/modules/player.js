const audioInfo = {
    state: {
        audioElement: '',
        audio: {
            id: 0,
            name: '',
            signer: '',
            url: '',
            img_url: '',
            type: '',
            lyric: ''
        },
        showMusicDetail: false,
        // 歌单列表
        showSongSheet: false,
        currentIndex: 0,
        // 歌词信息索引
        lyricIndex: -1,
        // 所有音乐信息
        musicAllList: [],
        // 音乐播放列表
        musicList: [],
        // 歌单信息
        musicSheetList: [],
        // 正在播放的歌单
        musicSheetType: '-1',
        songSheetImageColor: '#333',
        playing: false,
        waiting: false,
        // 播放规则，1自动播放，2循环播放， 3随机播放
        playType: 1,
        // 当前播放时间
        currentTime: 0,
        // 播放时长
        musicDuration: 0,
        musicLoadstart: false
    },
    getters: {
        getAudioElement: state => state.audioElement,
        getAudioInfo: state => state.audioInfo,
        // 获取当前播放的索引
		getCurrentIndex: state => state.currentIndex,
		// 获取音乐播放列表信息
		getMusicList: state => state.musicList,
		// 获取音乐全部信息
		getMusicAllList: state => state.musicAllList,
		// 获取音乐是否播放
		getIsPlaying: state => state.playing,
		// 获取音乐是否加载
		getIsWaiting: state => state.waiting,
		// 获取音乐是否打开底部音乐列表
		getMusicDetail: state => state.showMusicDetail,
		// 当前音乐详细信息
		getCurrentMusic: state => state.musicList[state.currentIndex],
		// 获取播放类型
		getMusicPlayType: state => state.playType,
		// 获取当前的播放进度
		getCurrentTime: state => state.currentTime,
		// 获取音乐的播放时长
		getMusicDuration: state => state.musicDuration,
		// 音乐开始加载
		getIsLoadStart: state => state.musicLoadStart,
		// 获取歌单列表的显示状态
		getIsShowSongSheet: state => state.showSongSheet,
		// 获取歌单信息
		getMusicSheetList: state => state.musicSheetList,
		// 获取歌单图片颜色
		getSongSheetImageColor: state => state.songSheetImageColor,
		// 获取音乐歌单类型
		getMusiSheetType: state => state.musicSheetType,
		// 获取音乐歌词当前播放的索引
		getLyricIndex: state => state.lyricIndex
    },
    mutations: {
        play (state) {
            state.playing = true
            state.audioElement.play()
        },
        pause: state => {
            state.playing = false
            state.audioElement.pause()
        },
        togglePlay: state => {
            if (state.playing) {
				state.playing = false
				state.audioElement.pause()
			} else {
				state.playing = true
				state.audioElement.play()
			}
        },
        // 开关显示底部列表
        toggerMusicDetail: state => {
            state.showMusicDetail = !state.showMusicDetail
        },
        initAudio: state => {
            if (state.musicList){
                alert(1)
            } else {
                alert(2)
            }
        },
        // 设置播放列表
        setMusicList: (state, obj) => {
            state.musicList = obj
        },
        // 设置所有音乐信息
        setMusicAllList: (state, obj) => {
            state.musicAllList = obj
            state.musicList = obj.all
        },
        setAudioElement: (state, ele) => {
            state.audioElement = ele
        },
        // 关闭底部列表
        setMusicDetail: (state, obj) => {
            state.showMusicDetail = obj.isShow
        },
        setPlayType: state => {
            if (state.playType === 3) {
                state.playType = 1
            } else {
                state.playType ++
            }
        },
        // 播放下一首歌
        playNext: state => {
            state.currentIndex ++
            const length = state.musicList.length
            if (state.currentIndex >= length) {
                state.currentIndex = 0
            }
            state.audioElement.setAttribute('src', state.musicList[state.currentIndex].url)
			state.playing = true
			state.audioElement.load()
			state.audioElement.play()
        },
        // 选择播放
        playIndex: (state, obj) => {
            state.currentIndex = obj.index
			state.audioElement.setAttribute('src', state.musicList[state.currentIndex].url)
            state.playing = true
            state.audioElement.load()
			state.audioElement.play()
        },
        // 设置音乐结束自动播放播放类型的歌曲
        playEnded: state => {
            let type = state.playType
            if (type === 1) {
                state.currentIndex ++
                if (state.currentIndex >= length) {
					state.currentIndex = 0
                }
                state.audioElement.setAttribute('src', state.musicList[state.currentIndex].url)
                state.playing = true
                state.audioElement.load()
                state.audioElement.play()
            }
            if (type === 2) {
                state.audioElement.currentTime = 0
				state.playing = true
				state.audioElement.play()
            }
            if (type === 3) {
                const length = state.musicList.length
				state.currentIndex = Math.floor(Math.random() * length)
				state.audioElement.setAttribute('src', state.musicList[state.currentIndex].url)
				state.playing = true
				state.audioElement.load()
				state.audioElement.play()
            }
        },
        setCurrentTime: (state, obj) => {
            state.currentTime = obj.time
        },
        setMusicDuration (state, obj) {
			state.musicDuration = obj.duration
		},
		// 设置音乐是否正在加载
		setMusicLoadStart (state, obj) {
			state.musicLoadStart = obj.isloadstart
		},
		// 设置是否显示歌单信息
		setIsShowSongSheet (state, obj) {
			state.showSongSheet = obj.isShow
		},
		// 设置音乐播放器的歌单列表数据
		setMusicSheetList (state, obj) {
			state.musicSheetList = obj.data
		},
		setSongSheetImageColor (state, obj) {
			state.songSheetImageColor = obj.color
		},
		// 设置音乐歌单类型
		setMusicSheetType (state, obj) {
			state.musicSheetType = obj.sheettype
		},
		// 设置音乐歌词当前播放的索引
		setLyricIndex (state, obj) {
			state.lyricIndex = obj.index
		}
    },
	actions: {
		set_AudioElement ({commit}, ele) {
			commit('setAudioElement', ele)
		},
		set_MusicDetail ({commit}, obj) {
			commit('setMusicDetail', obj)
		},
		set_MusicAllList ({commit}, obj) {
			commit('setMusicAllList', obj)
		},
		set_MusicList ({commit}, obj) {
			commit('setMusicList', obj)
		},
		set_PlayType ({commit}) {
			commit('setPlayType')
		},
		set_CurrentTime ({commit}, obj) {
			commit('setCurrentTime', obj)
		},
		set_MusicDuration ({commit}, obj) {
			commit('setMusicDuration', obj)
		},
		set_MusicSheetList ({commit}, obj) {
			commit('setMusicSheetList', obj)
		},
		set_SongSheetImageColor ({commit}, obj) {
			commit('setSongSheetImageColor', obj)
		},
		play_Next ({commit}) {
			commit('playNext')
		},
		play_Prev ({commit}) {
			commit('playPrev')
		},
		play_Index ({commit}, obj) {
			commit('playIndex', obj)
		},
		play_Ended ({commit}) {
			commit('playEnded')
		}
	}
}
export default audioInfo