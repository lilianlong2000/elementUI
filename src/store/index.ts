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
        title: '博客列表',
        path: '/navigatorOne',
      },
    ],
    editableTabsIndex: '',
    wheathInfo: [],
    wheathTodayInfo: {},
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
    changeWheathTodayInfo(state, data) {
      state.wheathTodayInfo = data
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
      let list = state.wheathInfo.map((item: any) => item?.date.slice(5))
      list[0] = '今天'
      return list
    },
    getwindspeed(state) {
      return state.wheathInfo.map((item: any) => item?.win_speed.slice(1, 2))
    },
    getWeathInfo(state: any) {
      let obj: any = {
        实况温度: 'tem',
        天气情况: 'wea',
        风向: 'win',
        风力: 'win_speed',
        风速: 'win_meter',
        空气质量: 'air',
        气压: 'pressure',
        湿度: 'humidity',
      }
      return (data: string) => {
        return state.wheathTodayInfo[obj[data]]
      }
    },
  },
  actions: {},
  modules: {},
  plugins: [vueLocal.plugin],
})
