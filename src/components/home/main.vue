<template>
  <Tabs></Tabs>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Tabs from '@/components/navgition/tabs.vue'
</script>
<style>
</style>