<template>
  <keep-alive>
    <router-view v-if="isRouterAlive"> </router-view>
  </keep-alive>
</template>

<script lang="ts" setup>
import { watch, ref, nextTick, provide, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onBeforeRouteUpdate } from 'vue-router'
import changetitle from '@/util/navigatorNamechange'
const { state, commit } = useStore()
const trans = computed(() => state.trans)
const fontFamily = computed(() => state.fontFamily)
const fontSize = computed(() => state.fontSize)
const isRouterAlive = ref(true)
const $router = useRouter()
document.documentElement.style.fontFamily = fontFamily.value.split(' ')[1]
document.documentElement.style.fontSize = fontSize.value
const reload = async () => {
  isRouterAlive.value = false
  await nextTick()
  isRouterAlive.value = true
}
provide('reload', reload)
watch(
  () => $router.currentRoute.value,
  (newvalue: any, oldvalue: any) => {
    // console.log(newvalue.name, oldvalue?.name)
    // changetitle(newvalue?.name)
    window.document.title = changetitle(newvalue?.name)
  },
  { immediate: true }
)
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
