<template>
  <div class="blogsdetailicon">
    <div @click="giveGoodStar(1)">
      <div>
        <el-image :src="require('/src/assets/iconfont/like_filled.png')" v-if="isLikes"></el-image>
        <el-image :src="require('/src/assets/iconfont/like.png')" v-else></el-image>
      </div>
      <span>{{ blogsDetail1?.likes }}</span>
    </div>
    <div @click="giveGoodStar(2)">
      <div>
        <el-image
          :src="require('/src/assets/iconfont/star_filled.png')"
          v-if="isCollect"
        ></el-image>
        <el-image :src="require('/src/assets/iconfont/star.png')" v-else></el-image>
      </div>
      <span>{{ blogsDetail1?.collect }} </span>
    </div>
    <div>
      <el-image :src="require('/src/assets/iconfont/view.png')"></el-image>
      <span>{{ blogsDetail1?.view }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import axios from '@/util/axios'
import { computed, inject, ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus/lib/components'
const { commit, state } = useStore()
const refreshfun1: any = inject('refreshfun1')
const isLikes = computed(() => state.isLikes)
const isCollect = computed(() => state.isCollect)
const blogsDetail1 = ref()
interface Props {
  id: string
}
const props = withDefaults(defineProps<Props>(), {})
axios.get('/getdetailbyid?id=' + props.id).then((res) => {
  blogsDetail1.value = res.data.msg[0]
})
const giveGoodStar = (type: number) => {
  if (type === 1) {
    commit('changeBlogsDetailIcon', { type: '1' })
  } else if (type === 2) {
    commit('changeBlogsDetailIcon', { type: '2' })
  }
  axios
    .get('/commitlikescollect', {
      params: {
        id: props.id,
        isLikes: isLikes.value,
        isCollect: isCollect.value,
        type,
      },
    })
    .then((res) => {
      if (res.data.code == '1') {
        ElMessage.success(res.data.msg)
      } else {
        ElMessage.warning(res.data.msg)
      }
      refreshfun1()
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
<style lang="scss" scoped>
.blogsdetailicon {
  display: flex;
  align-items: center;
  width: 95%;
  justify-content: flex-end;
  cursor: pointer;
  span:hover {
    color: #2e50ff;
  }
  div {
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      position: relative;
      width: 25px;
      height: 25px;
      .el-image {
        position: absolute;
      }
    }
  }
}
.el-image {
  width: 25px;
  height: 25px;
}
</style>