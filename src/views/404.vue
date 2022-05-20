<template>
  <div class="boximage">
    <el-image :src="image" fit="fill"></el-image>
    <h1>Not font!</h1>
  </div>
</template>
<script setup>
import image from '../assets/404notfont.jpeg'
</script>
<style lang="scss" scoped>
.boximage {
  text-align: center;
  h1 {
    font-size: 50px;
  }
}
</style>