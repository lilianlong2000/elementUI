<template>
  <Tabs></Tabs>
  <div class="mainbox">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Tabs from '@/components/navgition/tabs.vue'
</script>
<style lang="scss" scoped>
.mainbox {
  overflow: auto;
  height: 654px;
  width: 1320px;
  // margin-left: -20px;
}
</style>