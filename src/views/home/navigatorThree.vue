<template>
  <div :class="'animated ' + animateType">
    <h1>这是导航组件三</h1>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const { state } = useStore()
const animateType = computed(() => state.animateType)
</script>