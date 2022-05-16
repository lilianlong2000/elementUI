<template>
  <el-menu
    :default-active="currentRouteName"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    router
    unique-opened
  >
    <el-sub-menu index="navigatorOne">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-sub-menu index="1-1">
        <template #title><span>Group One</span></template>
        <el-menu-item index="navigatorOne">item one</el-menu-item>
        <el-menu-item index="1-2-2">item two</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="1-2">
        <template #title><span>Group Two</span></template>
        <el-menu-item index="1-2-1">item three</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="1-3">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-3-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="navigatorTwo">
      <el-icon><icon-menu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="navigatorThree">
      <el-icon><document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="navigatorFour">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
const { state, commit } = useStore()
const isCollapse = computed(() => state.isCollapse)
const $router = useRouter()
const currentRouteName = ref('navigatorOne')
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  commit('pushTabs', { name: keyPath[0], title: keyPath[0], path: `/${keyPath[0]}` })
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
watch(
  () => $router.currentRoute.value,
  (newvalue: any, oldvalue: any) => {
    if (newvalue.name == 'login') return
    currentRouteName.value = newvalue
  }
)
onMounted(() => {
  currentRouteName.value = $router.currentRoute.value.name as string
})
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>