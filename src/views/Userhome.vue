<template>
  <el-row>
    <el-col :span="20" :offset="1">
      <el-card>
        <div class="headercard">
          <div class="headerimagebox">
            <el-image :src="authorinfo.photo">
              <template #error>
                <el-image class="headerimage" :src="require('../assets/defaulttouxiang.jpg')">
                </el-image>
              </template>
            </el-image>
          </div>
          <div class="headername">
            <div class="box">
              <div>
                <div class="name">{{ authorinfo.name }}</div>
                &nbsp;
                <el-image
                  :src="
                    authorinfo.sex == '男'
                      ? require('../assets/men.png')
                      : require('../assets/women.png')
                  "
                ></el-image>
              </div>
              <el-button size="small" type="primary" plain round> 关注作者 </el-button>
            </div>
            <div class="blogsnumbox">
              <div>
                发布博客 &nbsp;
                <span class="blogsnum">{{ authorblogs?.length }}</span>
              </div>
              <div>
                博客浏览数 &nbsp;
                <span class="blogsnum">{{ views }}</span>
              </div>
              <div>
                博客点赞数 &nbsp;
                <span class="blogsnum">{{ likes }}</span>
              </div>
              <div>
                博客收藏数 &nbsp;
                <span class="blogsnum">{{ collects }}</span>
              </div>
            </div>
            <div class="introductionbox">
              <div>个人简介：{{ authorinfo.selfintroduction || '这个人还没有个人简介~' }}</div>
              <div v-if="showintroduction">
                加入博客的时间：{{ authorinfo.register_time || '未知' }}
              </div>
              <div v-if="showintroduction">
                博客简介：{{ authorinfo.blogsintroduction || '这个人还没有博客简介~' }}
              </div>
              <div
                class="showintroduction"
                style="cursor: pointer"
                @click="showintroduction = !showintroduction"
              >
                {{ showintroduction ? '收起' : '展开' }}详细资料
                <el-icon v-if="showintroduction"><ArrowUp /></el-icon>
                <el-icon v-else><ArrowDown /></el-icon>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import axios from '@/util/axios'
import { ElMessage } from 'element-plus'
const $route = useRoute()
const { state } = useStore()
const authorinfo = ref({})
const authorblogs = ref([])
const id = computed(() => state.userinfoid)
const views = ref(0)
const likes = ref(0)
const collects = ref(0)
const showintroduction = ref(false)
const getUserInfoAndUserBlogs = () => {
  axios
    .get('/getauthorblogsbyid', { params: { id: id.value } })
    .then((res) => {
      authorinfo.value = res.data.msg.user
      authorblogs.value = res.data.msg.blogs
      authorblogs.value.forEach((element: any) => {
        views.value += element.view
        likes.value += element.likes
        collects.value += element.collect
      })
      console.log(authorinfo.value, authorblogs.value)
    })
    .catch((err) => console.log(err))
}
onMounted(() => {
  getUserInfoAndUserBlogs()
})
</script>
<style lang="scss" scoped>
.headerimagebox {
  border-radius: 50%;
  margin-top: -15px;
  margin-right: 10px;
  width: 102px;
  height: 102px;
  box-sizing: border-box;
  overflow: hidden;
  border: 4px solid #f0f0f2;
  .el-image {
    width: 94px;
    height: 94px;
  }
}
.headercard {
  display: flex;
  width: 100%;
}
.headername {
  flex: 1;
  .box {
    display: flex;
    padding-right: 30px;
    justify-content: space-between;
    div {
      display: flex;
    }
    .name {
      color: #222226;
      font-size: 22px;
      font-weight: 500;
      line-height: 24px;
    }
    .el-image {
      width: 22px;
      height: 22px;
    }
    .el-button {
      align-self: flex-end;
    }
  }
}
.blogsnumbox {
  line-height: 32px;
  font-size: 14px;
  margin: 10px 0;
  cursor: pointer;
  display: flex;
  .blogsnum {
    font-size: 20px;
  }
  div {
    margin-right: 10px;
  }
  div:hover {
    color: #fc5531;
  }
}
.introductionbox {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-top: 10px;
  div {
    margin-bottom: 10px;
  }
}
.showintroduction {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>