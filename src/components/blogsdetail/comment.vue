<template>
  <div class="subbox">
    <div>
      <el-image class="imagebox" :src="item.user.imageUrl"></el-image>
    </div>
    <div class="replybox">
      <div class="nandt">
        <span>{{ item.user.name }}</span>
        <span> &nbsp;&nbsp;{{ item.time ? item.time : '未知' }}</span>
      </div>
      <div class="content">
        {{ item.comment }}
        <el-button @click="hendleClick(item.user.id, item.user.name)" size="small" text
          >回复</el-button
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  item: Object
}>()
const emit = defineEmits<{
  (e: 'callback', id: number, name: string): void
}>()
const hendleClick = (id: number, name: string) => {
  console.log(typeof id)
  emit('callback', id, name)
}
</script>
<style lang="scss" scoped>
.subbox {
  display: flex;
  padding-left: 10px;
  .imagebox {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-top: 10px;
  }
  .replybox {
    margin-left: 10px;
    margin-top: 10px;
    padding: 10px 0;
    width: 100%;
    border-bottom: 1px solid #c8c8cb;
    border-top: 1px solid #c8c8cb;
    .nandt {
      color: #777888;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .content {
      font-size: 14px;
      color: #222226;
      line-height: 22px;
      word-break: break-word;
    }
  }
}
</style>