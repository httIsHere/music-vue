// 左侧菜单滑动效果
const SHOW_LEFTBAR = true
const HIDE_LEFTBAR = false

const leftBar = {
    state: {
        isShow: false
    },
    mutations: {
        showBar (state) {
            state.isShow = SHOW_LEFTBAR
        },
        hideBar (state) {
            state.isShow = HIDE_LEFTBAR
        }
    },
    actions: {
        showLeftBar ({commit}) {
            commit('showBar')
        },
        hideLeftBar ({commit}) {
            commit('hideBar')
        }
    },
    getters: {
        isShowMethod (state) {
            return state.isShow
        }
    }
}
export default leftBar