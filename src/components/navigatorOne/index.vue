<template>
  <el-card v-if="item.title" shadow="hover" style="margin-bottom: 20px; cursor: pointer">
    <template #header>
      <div class="blogsheader">
        <h2>{{ title }}</h2>
        <div>
          <el-icon><Pointer /></el-icon>
          <span>{{ likes }}</span>
          <el-icon><Star /></el-icon>
          <span>{{ collect }} </span>
          <el-icon><View /></el-icon>
          <span>{{ view }}</span>
        </div>
      </div>
    </template>
    <p class="content">{{ content }}</p>
    <div class="blogstime">{{ time }}</div>
  </el-card>
  <div v-else class="recommend">以下是推荐博客文章</div>
</template>
<script lang="ts" setup>
const props = defineProps({
  item: Object,
})
const { title, content, likes, collect, time, view } = props.item as any
</script>
<style lang="scss" scoped>
.blogsheader {
  display: flex;
  h2 {
    flex: 1;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 20px 0 0;
  }
  div {
    display: flex;
    justify-content: center;
    height: 20px;
    align-items: center;
    font-size: 16px;
    margin-top: 10px;
    color: rgba(0, 0, 0, 0.6);
    span {
      margin-right: 10px;
    }
  }
}
.blogstime {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
.content {
  word-wrap: break-word;
}
.recommend {
  width: 80%;
  margin: 10px;
  padding-top: 10px;
  font-weight: bold;
  color: #2e50ff;
  text-align: center;
  border-top: 2px solid black;
}
</style>