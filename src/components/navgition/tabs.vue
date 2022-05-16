<template>
  <el-tabs
    v-model="editableTabsIndex"
    type="card"
    class="demo-tabs"
    closable
    @tab-remove="removeTab"
    @tab-click="hendleClick"
  >
    <el-tab-pane
      v-for="item in editableTabsValue"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { TabsPaneContext } from 'element-plus'
const { state, commit } = useStore()
const editableTabsIndex = ref('navigatorOne')
const $router = useRouter()
const editableTabsValue = computed(() => state.editableTabsValue)
const removeTab = (targetName: string) => {
  const tabs = editableTabsValue as any
  let activeName = editableTabsIndex.value
  console.log(activeName, targetName)
  console.log(tabs.value)

  if (activeName === targetName) {
    tabs.value.forEach((tab: any, index: number) => {
      if (tab.name === targetName) {
        const nextTab = tabs.value[index + 1] || tabs.value[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  editableTabsIndex.value = activeName
  $router.push({ path: editableTabsIndex.value })
  let newValue = tabs.value.filter((tab: any) => tab.name !== targetName)
  commit('removeTabsValue', newValue)
}
watch(
  () => $router.currentRoute.value,
  (newvalue: any, oldvalue: any) => {
    if (newvalue.name == 'login') return
    editableTabsIndex.value = newvalue.name
  }
)
onMounted(() => {
  editableTabsIndex.value = $router.currentRoute.value.name as unknown as string
})
const hendleClick = (pane: TabsPaneContext, ev: Event) => {
  console.log(pane.props.name, ev)
  $router.push({ path: `/${pane.props.name}` })
}
</script>