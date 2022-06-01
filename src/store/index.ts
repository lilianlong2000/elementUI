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
    trans: '',
    isLikes: false,
    isCollect: false,
    animateType: 'fadeInLeftBig',
    fontFamily: '微软雅黑 Microsoft YaHei',
    navStyle: false,
    color: '#2e50ff',
    userinfoid: 0,
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
          title: '博客列表',
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
    changetrans(state, data) {
      state.trans = data
    },
    changeBlogsDetailIcon(state, data) {
      if (data.type == '1') {
        state.isLikes = !state.isLikes
      } else if (data.type == '2') {
        state.isCollect = !state.isCollect
      }
    },
    changeAnimateType(state, data) {
      state.animateType = data
    },
    changeFontFamily(state, data) {
      state.fontFamily = data
    },
    changeNavStyle(state, data) {
      state.navStyle = data
    },
    changeColor(state, data) {
      state.color = data
    },
    changeUserInfoId(state, data) {
      state.userinfoid = data
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
