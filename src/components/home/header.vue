<template>
  <div class="header" :style="{ backgroundColor: color }">
    <el-tooltip placement="right" :content="isCollapse ? '显示菜单' : '隐藏菜单'">
      <el-button @click="changeCollapse" class="btn">
        <el-icon><Grid /></el-icon>
      </el-button>
    </el-tooltip>
    <slot name="title" class="slot"></slot>
    <el-tooltip placement="bottom" content="更改主题色">
      <div class="el-color-picker">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          @active-change="handelcolor"
          @change="handelcolor1"
        ></el-color-picker>
      </div>
    </el-tooltip>

    <el-dropdown class="positionimage">
      <div>
        <el-image class="headerimage" fit="fill" :src="imgSrc">
          <template #error>
            <el-image class="headerimage" :src="require('../../assets/defaulttouxiang.jpg')">
            </el-image>
          </template>
        </el-image>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="goModiSelfinfo">修改个人信息</el-dropdown-item>
          <el-dropdown-item @click="uploadBuddha">修改头像</el-dropdown-item>
          <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dialog
      v-model="dialogFormVisible"
      title="上传头像"
      draggable
      width="30%"
      :append-to-body="true"
    >
      <el-upload
        action="#"
        list-type="picture-card"
        method="get"
        :file-list="fileList"
        :auto-upload="false"
        :ref="upload"
        :on-change="onChangeUpload"
        :before-upload="handleBeforeUpload"
      >
        <el-icon><Plus /></el-icon>

        <template #file="{ file }">
          <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <el-icon><zoom-in /></el-icon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleUpload(file)"
              >
                <el-icon><Upload /></el-icon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <el-icon><Delete /></el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang='ts' setup>
import { useStore } from 'vuex'
import $bus from '@/util/bus'
import {
  onMounted,
  ref,
  reactive,
  computed,
  getCurrentInstance,
  onUnmounted,
  inject,
  Ref,
} from 'vue'
import { useRouter } from 'vue-router'
import {
  UploadFile,
  UploadFiles,
  UploadRequestOptions,
  ElMessage,
  MessageParamsTyped,
  UploadUserFile,
} from 'element-plus'
import type { UploadProps } from 'element-plus'
import { Delete, Upload, Plus, ZoomIn } from '@element-plus/icons-vue'
import axios from '../../util/axios.js'
const { state, commit } = useStore()
const $router = useRouter()
const color = computed(() => state.color)
const predefineColors = ref([
  '#2e50ff',
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const upload = ref()
const changeCollapse = () => {
  commit('changeCollapse', !state.isCollapse)
}
const isCollapse = computed(() => state.isCollapse)
let dialogFormVisible = ref(false)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const imgSrc = ref('')
const reload: any = inject('reload')
const beforeUpdateImg: Ref<{ uid: number; photo: string }[]> = ref([])
const fileList = ref<UploadUserFile[]>([])
onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') as string)
  if (user) {
    imgSrc.value = user.photo
  }
})

const uploadBuddha = () => {
  dialogFormVisible.value = !dialogFormVisible.value
}

$bus.on('uploadB', (options: any) => {
  dialogFormVisible.value = !dialogFormVisible.value
})

const handleRemove: UploadProps['onChange'] = (uploadFile) => {
  let index
  fileList.value.forEach((item, i) => {
    if (item.name == uploadFile.name) {
      index = i
    }
  })
  if (index != undefined) {
    fileList.value.splice(index, 1)
  }
  // fileList.value = fileList.value.map((item, index) => {
  //   console.log(item, index)
  //   if (item.name == uploadFile.name) fileList.value.splice(index, 1)
  // }) as any
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
const handleUpload = (file: UploadFile) => {
  const { uid, photo } = beforeUpdateImg.value[0]
  const user = JSON.parse(localStorage.getItem('user') as any)
  const user1 = { id: user.id, name: user.name }
  axios
    .post('/upload', {
      params: {
        user: user1,
        photo,
        uid,
      },
    })
    .then((res: { data: { msg: MessageParamsTyped | undefined } }) => {
      const user = JSON.parse(localStorage.getItem('user') as any)
      user.photo = photo
      localStorage.setItem('user', JSON.stringify(user))
      ElMessage.success(res.data.msg)
      reload()
    })
    .catch((res: any) => {
      ElMessage.error('上传失败!')
    })
}

const onChangeUpload = (file: UploadFile) => {
  const isImage = file.raw?.type.includes('image')
  if (!isImage) {
    ElMessage.error('上传文件类型必须是图片!')
    fileList.value.pop()
    return
  }
  const isLt08M = (file.size as number) / 1024 / 1024 < 0.8
  if (!isLt08M) {
    ElMessage.error('上传图片大小不能超过 0.8MB!')
    fileList.value.pop()
    return
  }
  const reader = new FileReader()
  reader.onload = function (e) {
    beforeUpdateImg.value.push({
      uid: file.uid,
      photo: reader.result as any,
    })
  }
  reader.readAsDataURL(file.raw as any)
}

const logOut = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  //重置永久存储vuex中的editableTabsValue
  commit('reloadStore', null)
  $router.push({ name: 'login' })
}

const goModiSelfinfo = () => {
  $router.push({ name: 'modiselfinfo' })
  commit('pushTabs', { name: 'modiselfinfo', title: '修改个人信息', path: '/modiselfinfo' })
}

const handelcolor = (c: string) => {}
const handelcolor1 = (c: string) => {
  commit('changeColor', c)
}
onUnmounted(() => {
  $bus.off('uploadBuddha')
})
</script>
<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.headerimage {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid rgb(118, 20, 113);
}
.positionimage {
  position: absolute;
  right: 40px;
  top: 5px;
}
.btn {
  position: absolute;
  left: 40px;
}
.demo-tabs {
  position: absolute;
  left: 10px;
  top: 60px;
  height: 38px;
}
.el-color-picker {
  position: absolute;
  right: 110px;
  top: 16px;
}
</style>