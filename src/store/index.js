import Vue from 'vue'
import Vuex from 'vuex'
import LeftBar from './modules/leftBar'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        allInfo: []
    },
    getters: {
        getAllInfo: state => state.allInfo,
        getFindMusic: state => state.musicAllList.findMusic
    },
    mutations: {
        setAllInfo (state, obj) {
            state.allInfo = obj
        }
    },
    actions: {
        set_AllInfo ({commit}, obj) {
            commit('setAllInfo', obj)
        }
    },
    modules: {
        leftBar: LeftBar
    }
})

export default store