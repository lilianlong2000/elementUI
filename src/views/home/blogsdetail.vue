<template>
  <div :class="'animated ' + animateType">
    <el-scrollbar ref="scrollbarRef" :min-size="5" always @scroll="hendleScroll">
      <el-row>
        <el-col :span="17" :offset="3">
          <el-card>
            <h1 style="text-align: center">{{ blogsDetail?.title }}</h1>
            <BlogsDetailIcon :id="ids" v-if="isShowIcon"></BlogsDetailIcon>
            <el-divider />
            <div class="blogsdetailcontent" v-html="blogsDetail?.content"></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row @click="clickevent">
        <el-col :span="17" :offset="3">
          <el-card>
            <h3 style="margin-bottom: 10px">发表评论({{ comment?.length || 0 }})</h3>
            <el-popover placement="bottom" :width="400" trigger="click" :visible="visible">
              <el-scrollbar max-height="200px">
                <span class="emojiitem" @click="hendleClick(item)" v-for="item in a">{{
                  item
                }}</span>
              </el-scrollbar>
              <template #reference>
                <div class="emojibox">
                  <span @click.stop="visible = !visible">{{ a[0] }}</span>
                  <el-icon><PictureFilled /></el-icon>
                </div>
                <!-- <div @click.stop="submessage"> -->

                <!-- </div> -->
              </template>
            </el-popover>
            <div v-if="commentName">
              <span style="font-size: 14px">回复</span>&nbsp;
              <span style="color: #2e50ff; font-weight: bold">{{ commentName }} </span>&nbsp;
              <span style="font-weight: bold">:</span>
            </div>
            <el-input
              :autosize="autosize"
              v-model="textarea"
              :rows="10"
              class="textarea"
              :input-style="{ fontSize: '22px' }"
              type="textarea"
              :placeholder="!commentName ? '对作者说点什么把~' : `回复${commentName}`"
              ref="eltextarea"
            />
            <div class="btnsubmit">
              <el-button type="primary" @click="sendComment">{{
                !iscallback ? '发表评论' : '回复'
              }}</el-button>
            </div>
            <Comment
              :authorid="blogsDetail.author_id"
              @callback="callback"
              :item="item"
              v-for="item in comment"
            >
            </Comment>
          </el-card>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, nextTick, provide, inject, onBeforeUnmount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import axios from '@/util/axios.js'
import a from 'emojis-list'
import emojiRegex from 'emoji-regex'
import { RefreshLeft } from '@element-plus/icons-vue/dist/types'
import Comment from '@/components/blogsdetail/comment.vue'
import BlogsDetailIcon from '@/components/blogsdetail/blogsdetailicon.vue'
import dayjs from 'dayjs'
import type { ElScrollbar } from 'element-plus'

const $route = useRoute()
const { commit, state } = useStore()
let blogsDetail = ref({})
const textarea = ref('')
const visible = ref(false)
const comment = ref()
const eltextarea = ref()
const isRouterAlive = ref(true)
const iscallback = ref(false)
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
let scrolltop = ref(0)
const commentName = ref(null)
const parentid = ref(0)
const commentid = ref(0)
const isShowIcon = ref(true)
const autosize = {
  minRows: 3,
  maxRows: 6,
}
const refreshfun: any = inject('refreshfun')
const ids = $route.params.id
const { id } = JSON.parse(localStorage.getItem('user') as string)
const animateType = computed(() => state.animateType)
axios.get('/getdetailbyid?id=' + ids).then((res) => {
  blogsDetail.value = res.data.msg[0]
})

const hendleClick = (item: string) => {
  textarea.value += item
}
const clickevent = () => {
  visible.value = false
}
const refreshfun1 = async () => {
  isShowIcon.value = false
  await nextTick()
  isShowIcon.value = true
}
provide('refreshfun1', refreshfun1)
const callback = (id: number, name: string, commentids: number) => {
  iscallback.value = true
  commentName.value = name as any
  parentid.value = id
  commentid.value = commentids
  eltextarea.value.focus()
}
const sendComment = () => {
  if (!textarea.value) return
  const regex = emojiRegex()
  let arr = textarea.value.split('')
  let num = 0
  for (const match of textarea.value.matchAll(regex)) {
    arr.splice((match.index as any) - num, 2, `[emoji ${match[0].codePointAt(0)}]`)
    num++
  }
  if (!iscallback.value) {
    axios
      .get('/usercomment', {
        params: { comment: arr.join(''), blog_id: ids, parent_id: null, user_id: id },
      })
      .then((res) => {
        textarea.value = ''
        getusercomment()
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    axios
      .get('/usercomment', {
        params: {
          comment: arr.join(''),
          blog_id: ids,
          parent_id: parentid.value,
          user_id: id,
          comment_id: commentid.value,
        },
      })
      .then((res) => {
        textarea.value = ''
        getusercomment()
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const hendleCommentTime = (data: any) => {
  for (let i = 0; i < data.length; i++) {
    data[i].comment = data[i].comment.replace(/\[emoji\s\d+\]/g, function (value: string) {
      return String.fromCodePoint(Number(value.slice(7, 13)))
    })
    if (data[i].children.length) {
      for (let j = 0; j < data[i].children.length; j++) {
        data[i].children[j].comment = data[i].children[j].comment.replace(
          /\[emoji\s\d+\]/g,
          function (value: string) {
            return String.fromCodePoint(Number(value.slice(7, 13)))
          }
        )
      }
    }
    if (data[i].time) {
      data[i].time = data[i].time.slice(1, -2)
    }
  }
  return data
}
var getusercomment = () => {
  axios
    .get('/getusercomment', { params: { id: ids } })
    .then((res) => {
      if (res.data.code == 1) {
        hendleCommentTime(res.data.msg)
        comment.value = hendleCommentTime(res.data.msg).reverse()
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const hendleScroll = (a: any) => {
  scrolltop.value = a.scrollTop
}
const changescrollbartop = () => {
  let top = Number(sessionStorage.getItem('scrollbartop'))
  console.log('@@@@@@' + top)
  if (top) {
    scrollbarRef.value!.setScrollTop(100)
  }
}
const click = () => {
  console.log(scrollbarRef.value)
  scrollbarRef.value!.setScrollTop(100)
}

onMounted(() => {
  getusercomment()
  changescrollbartop()
})
onBeforeUnmount(() => {
  sessionStorage.setItem('scrollbartop', scrolltop.value as any)
})
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.emojibox {
  margin-left: 10px;
  font-size: 20px;
  width: 50px;
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.emojiitem {
  cursor: pointer;
  font-size: 30px;
}
.btnsubmit {
  margin-top: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
}
.textarea ::selection {
  background-color: #2e50ff;
}
.blogsdetailcontent {
  padding: 20px 0;
  letter-spacing: 0.2em;
  line-height: 1.3em;
  text-indent: 2em;
  margin-top: 10px;
}
</style>