import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueJsonp } from 'vue-jsonp'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//自定义指令
app.directive('focus', {
  beforeUpdate(el, binding, vnode, onode) {
    if (binding.value) {
      nextTick(() => {
        el.children[0].children[0].focus()
      })
    }
  },
})

app.use(store).use(router).use(ElementPlus).mount('#app')
