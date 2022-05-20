<template>
  <div class="common-layout">
    <el-container>
      <Aside></Aside>
      <el-container>
        <el-header style="padding: 0">
          <Header>
            <template #title>
              <div style="color: white; font-weight: bold">{{ title }}</div>
            </template>
          </Header>
        </el-header>
        <el-main style="padding: 0">
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang='ts' setup>
import axios from '@/util/axios'
import Aside from '@/components/home/aside.vue'
import Header from '@/components/home/header.vue'
import Main from '@/components/home/main.vue'
import { watch, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import changetitle from '../util/navigatorNamechange'
const $router = useRouter()
const title = ref()
watch(
  () => $router.currentRoute.value,
  (newvalue: any, oldvalue: any) => {
    if (newvalue.name == 'login') return
    title.value = changetitle(newvalue.name)
  }
)
onMounted(() => {
  title.value = changetitle($router.currentRoute.value.name as unknown as string)
})
</script>

<style lang="scss" scoped>
// .el-main {
//   padding: 0;
//   // border: 1px solid var(--el-color-primary-light-5);
// }
.el-header {
  border-bottom: 1px solid var(--el-color-info-light-5);
}
// .containermain {
//   transition: width 3s ease;
// }
</style>