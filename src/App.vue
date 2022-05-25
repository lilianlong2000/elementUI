<template>
  <router-view v-slot="{ Component }" v-if="isRouterAlive">
    <keep-alive>
      <Transition :name="trans" mode="out-in">
        <component :is="Component" />
      </Transition>
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup>
import { watch, ref, nextTick, provide, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onBeforeRouteUpdate } from 'vue-router'
const { state, commit } = useStore()
const trans = computed(() => state.trans)
const isRouterAlive = ref(true)
const $router = useRouter()
const reload = async () => {
  isRouterAlive.value = false
  await nextTick()
  isRouterAlive.value = true
}
provide('reload', reload)
watch(
  () => $router.currentRoute.value,
  (newvalue: any, oldvalue: any) => {
    console.log(newvalue, oldvalue)
    if (newvalue.meta.index > oldvalue.meta.index) {
      commit('changetrans', 'trans-left')
      console.log(111)
    } else {
      console.log(222)
      commit('changetrans', 'trans-right')
    }
  }
)
/* 
onBeforeRouteUpdate((to: any, form: any) => {
  console.log(to.meta.index, form.meta.index)
  if (to.meta.index > form.meta.index) {
    trans.value = 'trans-left'
  } else {
    trans.value = 'trans-right'
  }
}) 
*/
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.trans-left-enter-active,
.trans-left-leave-active,
.trans-right-enter-active,
.trans-right-leave-active {
  opacity: 1;
  width: 100%;
  transition: all 0.3s ease-in-out;
}

.trans-right-leave-to {
  opacity: 0;
  // transform: translate(20px, 0);
}
.trans-left-enter-from {
  opacity: 1;
  // transform: translate(20px, 0);
}
.trans-left-leave-to {
  opacity: 0;
  // transform: translate(-20px, 0);
}
.trans-right-enter-from {
  opacity: 1;
  // transform: translate(-20px, 0);
}
</style>
