<template>
  <div class="subbox">
    <div>
      <el-image class="imagebox" :src="item.user.imageUrl">
        <template #error>
          <el-image class="headerimage" :src="require('../../assets/defaulttouxiang.jpg')">
          </el-image>
        </template>
      </el-image>
    </div>
    <div class="replybox">
      <div class="nandt">
        <span>{{ item.user.name }}</span>
        <span> &nbsp;&nbsp;{{ item.time ? item.time : '未知' }}</span>
      </div>
      <div class="content">
        {{ item.comment }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-link
          @click="hendleClick(item.user.id, item.user.name, item.commentid)"
          :underline="false"
          >回复</el-link
        >
      </div>
      <div class="subbox" v-if="item.children.length" v-for="item in item.children">
        <div>
          <el-image class="imagebox" :src="item.user.imageUrl">
            <template #error>
              <el-image class="headerimage" :src="require('../../assets/defaulttouxiang.jpg')">
              </el-image>
            </template>
          </el-image>
        </div>
        <div class="replybox">
          <div class="nandt">
            <span>{{ item.user.name }}</span>
            <CaretRight style="width: 1em; height: 1em; margin: 0px 5px"></CaretRight>
            <span>{{ item.usered.name }}</span>
            <span> &nbsp;&nbsp;&nbsp;&nbsp;{{ item.time ? item.time.slice(5, -7) : '未知' }}</span>
          </div>
          <div class="content">
            {{ item.comment }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-link
              @click="hendleClick(item.user.id, item.user.name, commentid)"
              :underline="false"
              >回复</el-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  item: Object
}>()
const emit = defineEmits<{
  (e: 'callback', id: number, name: string, commentid: number): void
}>()
const hendleClick = (id: number, name: string, commentid: number) => {
  emit('callback', id, name, commentid)
}
const { commentid } = props.item as any
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
    // border-bottom: 1px solid #c8c8cb;
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