<template>
  <div>
    <el-row>
      <el-col :span="10" :offset="1">
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearch"
          clearable
          placeholder="请输入博客标题关键字进行搜索"
          @select="handleSelect"
          placement="bottom"
          :debounce="400"
          :trigger-on-focus="false"
        >
          <template #prepend>
            <el-select v-model="selectValue" clearable placeholder="发布日期" style="width: 120px">
              <el-option label="今天发布" value="1" />
              <el-option label="一周内发布" value="2" />
              <el-option label="一月内发布" value="3" />
              <el-option label="一年内发布" value="3" />
              <el-option label="两年内发布" value="4" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" @click="" />
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" :offset="1">
        <el-scrollbar max-height="600px">
          <el-card shadow="hover" :body-style="{ paddingLeft: '40px' }">
            <template #header>
              <span class="spanbox">发布日期</span>
              <el-button-group>
                <el-button size="small" @click="upDay"
                  ><el-icon class="el-icon--left"><ArrowUpBold /></el-icon>升序</el-button
                >
                <el-button size="small" @click="downDay">
                  降序<el-icon class="el-icon--right"><ArrowDownBold /></el-icon>
                </el-button>
              </el-button-group>
            </template>
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item v-for="(item, index) in publishDay" :name="item.name">
                <template #title>
                  <h3>{{ computedtitle(item.title) }}</h3>
                </template>
                <div
                  @click="addblogslist(t)"
                  v-if="item.data?.length"
                  v-for="t in item.data"
                  class="datebox"
                >
                  <span>{{ t.title }}</span>
                  <span class="time">{{ moditime(t.time, item.title) }}</span>
                </div>
                <div v-else>
                  <span>暂无数据</span>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-scrollbar>
      </el-col>
      <el-col :span="16" :offset="1">
        <el-scrollbar ref="scrollbarRef" max-height="600px">
          <NavigatorOne
            v-for="(item, index) in blogslist"
            :item="item"
            :index="index"
            :key="item.id"
          ></NavigatorOne>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue'
import NavigatorOne from '../../components/navigatorOne/index.vue'
import { Search } from '@element-plus/icons-vue'
import axios from '../../util/axios'
import type { ElScrollbar } from 'element-plus'
import modititle from '../../util/blogsTimeChange'
import changetitle from '@/util/navigatorNamechange'
import dayjs from 'dayjs'
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const publishDay = reactive([{ title: '1', name: '1' }])
const activeNames = reactive(['1', '2', '3'])
const blogslist = reactive([
  {
    title: '还没有推荐的内容~请稍后刷新试试',
    content: '',
    // likes: '1234',
    // collect: '123',
    // view: '123',
    // time: '2021-5-19',
  },
])
const upDay = () => {
  if (publishDay[0].title) {
    if (publishDay[0].title === '1') return
    publishDay.reverse()
  }
}
const downDay = () => {
  if (publishDay[0].title) {
    if (publishDay[0].title !== '1') return
    publishDay.reverse()
  }
}
const selectValue = ref('')
const state = ref('')
const computedtitle = computed(() => (i: string) => modititle(i))

const querySearch = (queryString: string, cb: any) => {
  console.log(queryString)
  if (!queryString) {
    cb([])
    return
  }
  axios
    .get('/searchBlogs', { params: { title: queryString, time: selectValue.value } })
    .then((res) => {
      if (res.data.code === 1) {
        let arr = res.data.msg.map((item: any) => {
          item.value = item.title
          return item
        })
        cb(arr)
      } else if (res.data.code === 0) {
        console.log(res.data)
      }
    })
}

const addblogslist = (item: any) => {
  console.log(item)
  blogslist.unshift(item)
  scrollbarRef.value!.setScrollTop(0)
}

const handleSelect = (item: any) => {
  blogslist.unshift(item)
  scrollbarRef.value!.setScrollTop(0)
}

const moditime = (time: string, type: string) => {
  if (type === '1') {
    let now = dayjs(dayjs().format('YYYY-MM-DD')).diff(time.slice(0, 10), 'hour')
    return now + '时'
  } else if (type === '2' || type === '3') {
    let now = dayjs(dayjs().format('YYYY-MM-DD')).diff(time.slice(0, 10), 'day')
    return now + '天'
  } else if (type === '4' || type === '5') {
    let now = dayjs(dayjs().format('YYYY-MM-DD')).diff(time.slice(0, 10), 'day')
    let year = parseInt((now / 365) as any)
    let day = now % 365
    return (year ? year + '年' : '') + day + '天'
  }
}
onMounted(() => {
  axios.get('/blogstop10').then((res) => {
    if (res.data.code === 1) {
      blogslist.pop()
      blogslist.push({} as any, ...res.data.msg)
    } else {
      console.log(res)
    }
  })
  axios.get('/searchblogsallday').then((res) => {
    console.log(res.data)
    if (res.data.code === 1) {
      publishDay.pop()
      publishDay.push(...res.data.msg)
    }
  })
})
</script>
<style lang="scss" scoped>
.spanbox {
  font-size: 1.4em;
  font-weight: bold;
  margin-right: 10px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col-10 ::v-deep .el-autocomplete {
  width: 400px;
}
.datebox {
  display: flex;
  cursor: pointer;
  margin-bottom: 5px;
  .time {
    width: 52px;
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  span:first-child {
    flex: 1;
    font-size: 15px;
    text-indent: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.datebox:hover span {
  color: #2e50ff;
}
.el-scrollbar {
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
}
</style>