<template>
  <el-menu
    :default-active="currentRouteName"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @select="handleOpen"
    @close="handleClose"
    router
    unique-opened
  >
    <el-sub-menu index="navigatorOne">
      <template #title>
        <el-icon><House /></el-icon>
        <span>博客首页</span>
      </template>
      <el-sub-menu index="1-1">
        <template #title><span>分组一</span></template>
        <el-menu-item index="navigatorOne">博客列表</el-menu-item>
        <el-menu-item index="blogsdetail">博客详情</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="1-2">
        <template #title><span>分组二</span></template>
        <el-menu-item index="1-2-1">子类一</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="1-3">
        <template #title><span>分组三</span></template>
        <el-menu-item index="1-3-1">子类一</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="navigatorTwo">
      <el-icon><MostlyCloudy /></el-icon>
      <template #title>天气预报</template>
    </el-menu-item>
    <el-menu-item index="navigatorThree">
      <el-icon><document /></el-icon>
      <template #title>导航三</template>
    </el-menu-item>
    <el-menu-item index="navigatorFour">
      <el-icon><setting /></el-icon>
      <template #title>个人设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import changetitle from '../../util/navigatorNamechange.js'

const { state, commit } = useStore()
const isCollapse = computed(() => state.isCollapse)
const $router = useRouter()
const currentRouteName = ref('navigatorOne')
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  if (keyPath.length > 1) {
    commit('pushTabs', { name: keyPath[2], title: changetitle(keyPath[2]), path: `/${keyPath[2]}` })
    return
  }
  commit('pushTabs', { name: keyPath[0], title: changetitle(keyPath[0]), path: `/${keyPath[0]}` })
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
watch(
  () => $router.currentRoute.value,
  (newvalue: any, oldvalue: any) => {
    if (newvalue.name == 'login') return
    currentRouteName.value = newvalue.name
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