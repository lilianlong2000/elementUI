import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
var vueLocal = new VuexPersistence({
  storage: window.localStorage,
})
interface typetabsvalue {
  name: string
  title: string
  path: string
}
;[]
export default createStore({
  state: {
    isCollapse: false,
    editableTabsValue: [
      {
        name: 'navigatorOne',
        title: 'navigatorOne',
        path: '/navigatorOne',
      },
    ],
    editableTabsIndex: '',
    wheathInfo: [],
  },
  mutations: {
    changeCollapse(state, data) {
      state.isCollapse = data
    },
    pushTabs(state, data) {
      let num = 0
      for (let index = 0; index < state.editableTabsValue.length; index++) {
        if (state.editableTabsValue[index]['name'] == data.name) {
          state.editableTabsValue.splice(index, 1)
          state.editableTabsValue.push(data as never)
          num += 1
        }
      }
      if (!num) {
        state.editableTabsValue.push(data as never)
      }
    },
    reloadStore(state, data) {
      state.isCollapse = false
      state.editableTabsValue = [
        {
          name: 'navigatorOne',
          title: 'navigatorOne',
          path: '/navigatorOne',
        },
      ]
    },
    removeTabsValue(state, data) {
      state.editableTabsValue = data
    },
    changeWheathInfo(state, data) {
      state.wheathInfo = data
    },
  },
  getters: {
    getWheathTemDay(state) {
      return state.wheathInfo.map((item: any) => item?.tem_day)
    },
    getWheathTemNight(state) {
      return state.wheathInfo.map((item: any) => item?.tem_night)
    },
    gettimes(state) {
      return state.wheathInfo.map((item: any) => item?.date.slice(5))
    },
  },
  actions: {},
  modules: {},
  plugins: [vueLocal.plugin],
})
