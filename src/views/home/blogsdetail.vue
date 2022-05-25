<template>
  <div>
    <el-row>
      <el-col :span="17" :offset="3">
        <el-card>
          <h1>{{ blogsDetail?.title }}</h1>
          <div>{{ blogsDetail.content }}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row @click="clickevent">
      <el-col :span="16" :offset="3">
        <el-card>
          <h3 style="margin-bottom: 10px">发表评论({{ comment?.length }})</h3>
          <el-popover placement="bottom" :width="400" trigger="click" :visible="visible">
            <el-scrollbar max-height="200px">
              <span class="emojiitem" @click="hendleClick(item)" v-for="item in a">{{ item }}</span>
            </el-scrollbar>
            <template #reference>
              <div @click.stop="visible = !visible" class="emojibox">
                {{ a[0] }}
                <el-icon><PictureFilled /></el-icon>
              </div>
              <!-- <div @click.stop="submessage"> -->

              <!-- </div> -->
            </template>
          </el-popover>

          <el-input
            :autosize="autosize"
            v-model="textarea"
            :rows="10"
            class="textarea"
            :input-style="{ fontSize: '22px' }"
            type="textarea"
            placeholder="对作者说点什么把~"
            ref="eltextarea"
          />
          <div class="btnsubmit">
            <el-button type="primary" @click="sendComment">{{
              !iscallback ? '发表评论' : '回复'
            }}</el-button>
          </div>
          <Comment @callback="callback" :item="item" v-for="item in comment"> </Comment>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, nextTick, inject } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/util/axios.js'
import a from 'emojis-list'
import emojiRegex from 'emoji-regex'
import { RefreshLeft } from '@element-plus/icons-vue/dist/types'
import Comment from '@/components/blogsdetail/comment.vue'
import dayjs from 'dayjs'

const $route = useRoute()
let blogsDetail = ref({})
const textarea = ref('')
const visible = ref(false)
const comment = ref()
const eltextarea = ref()
const isRouterAlive = ref(true)
const iscallback = ref(false)
const autosize = {
  minRows: 3,
  maxRows: 6,
}
const refreshfun: any = inject('refreshfun')
const ids = $route.params.id
const { id } = JSON.parse(localStorage.getItem('user') as string)
axios.get('/getdetailbyid?id=' + ids).then((res) => {
  blogsDetail.value = res.data.msg[0]
})

const hendleClick = (item: string) => {
  textarea.value += item
}
const clickevent = () => {
  visible.value = false
}
const callback = (id: number, name: string) => {
  iscallback.value = true
  console.log(eltextarea.value)
  textarea.value = '@' + name
  eltextarea.value.focus()
  console.log(id, name)
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
  axios
    .get('/usercomment', {
      params: { comment: arr.join(''), blog_id: ids, parent_id: null, user_id: id },
    })
    .then((res) => {
      textarea.value = ''
      refreshfun()
    })
    .catch((err) => {
      console.log(err)
    })
}
const hendleCommentTime = (data: any) => {
  for (let i = 0; i < data.length; i++) {
    data[i].comment = data[i].comment.replace(/\[emoji\s\d+\]/g, function (value: string) {
      return String.fromCodePoint(Number(value.slice(7, 13)))
    })
    if (data[i].time) {
      data[i].time = data[i].time.slice(1, -2)
    }
  }
  return data
}
const getusercomment = () => {
  axios
    .get('/getusercomment', { params: { id: ids } })
    .then((res) => {
      console.log(res)
      if (res.data.code == 1) {
        hendleCommentTime(res.data.msg)
        comment.value = hendleCommentTime(res.data.msg).reverse()
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

onMounted(() => {
  getusercomment()
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
</style>