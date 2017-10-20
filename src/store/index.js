import Vue from 'vue'
import Vuex from 'vuex'
import LeftBar from './modules/leftBar'
import AudioInfo from './modules/player'
import MusicList from './modules/musicList'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        allInfo: [],
        currentView: 0
    },
    getters: {
        getAllInfo: state => state.allInfo,
        getFindMusic: state => state.musicAllList.findMusic,
        getCurrentView: state => state.currentView
    },
    mutations: {
        setAllInfo (state, obj) {
            state.allInfo = obj
        },
        setCurrentView: (state, index) => {
            state.currentView = index
        }
    },
    actions: {
        set_AllInfo ({commit}, obj) {
            commit('setAllInfo', obj)
        },
        set_CurrentView: ({commit}, index) => {
            commit('setCurrentView', index)
        }
    },
    modules: {
        leftBar: LeftBar,
        audioInfo: AudioInfo,
        musicList: MusicList
    }
})

export default store