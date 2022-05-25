<template>
  <Tabs></Tabs>
  <div class="mainbox">
    <router-view v-slot="{ Component }" v-if="refresh">
      <keep-alive>
        <Transition :name="trans" mode="out-in">
          <component :is="Component" />
        </Transition>
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import { computed, provide, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import type { TabsPaneContext } from 'element-plus'
import Tabs from '@/components/navgition/tabs.vue'

const { state } = useStore()
const trans = computed(() => state.trans)
const refresh = ref(true)
const refreshfun = async () => {
  refresh.value = false
  await nextTick()
  refresh.value = true
}
provide('refreshfun', refreshfun)
</script>
<style lang="scss" scoped>
.mainbox {
  overflow: auto;
  height: 654px;
  width: 1320px;
  // margin-left: -20px;
}
.trans-left-enter-active,
.trans-left-leave-active,
.trans-right-enter-active,
.trans-right-leave-active {
  opacity: 1;
  width: 100%;
  transition: all 0.5s ease-in-out;
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