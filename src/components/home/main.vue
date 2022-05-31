<template>
  <Tabs></Tabs>
  <div class="mainbox">
    <keep-alive>
      <router-view v-if="refresh"> </router-view>
    </keep-alive>
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
</style>