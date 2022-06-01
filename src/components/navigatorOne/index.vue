<template>
  <el-card
    @click="goBlogsdetail"
    v-if="item.title"
    shadow="hover"
    style="margin-bottom: 20px; cursor: pointer"
  >
    <template #header>
      <div class="blogsheader">
        <h2>{{ title }}</h2>
        <div>
          <el-image :src="require('../../assets/iconfont/like_filled.png')"></el-image>
          <span>{{ likes || 0 }}</span>
          <el-image :src="require('../../assets/iconfont/star_filled.png')"></el-image>
          <span>{{ collect || 0 }} </span>
          <el-image :src="require('../../assets/iconfont/view.png')"></el-image>
          <span>{{ view || 0 }}</span>
        </div>
      </div>
    </template>
    <p class="content" v-html="content"></p>
    <div class="blogstime">{{ author }}&nbsp;&nbsp;&nbsp;{{ times }}</div>
  </el-card>
  <div v-if="!item.title && index != 0" class="recommend">以下是推荐博客文章</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const times = ref('')
const props = defineProps({
  item: Object,
  index: Number,
})
const { title, content, likes, collect, time, view, author, id } = props.item as any
const $router = useRouter()
const goBlogsdetail = () => {
  $router.push({
    name: 'blogsdetail',
    params: {
      id,
    },
  })
}
onMounted(() => {
  if (time) {
    let t = time
    let arr = t.split('')
    arr.splice(-5)
    arr.splice(10, 1, ' ')
    times.value = arr.join('')
  }
})
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
    align-items: center;
    height: 30px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
    span {
      margin-right: 10px;
    }
    .el-image {
      width: 25px;
      height: 25px;
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
  max-height: 200px;
  overflow: hidden;
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