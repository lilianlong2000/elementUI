<template>
  <div class="header">
    <el-button @click="changeCollapse" class="btn">
      <el-tooltip placement="right" :content="isCollapse ? '显示菜单' : '隐藏菜单'">
        <el-icon><Grid /></el-icon>
      </el-tooltip>
    </el-button>
    <slot name="title" class="slot"></slot>
    <el-dropdown class="positionimage">
      <div>
        <el-image class="headerimage" :src="imgSrc" fit="fill"></el-image>
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
      :before-upload="handleBeforeUpload"
    >
      <el-upload action="#" list-type="picture-card" :auto-upload="false">
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
import { onMounted, ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { UploadFile, UploadFiles, UploadRequestOptions, ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { Delete, Upload, Plus, ZoomIn } from '@element-plus/icons-vue'
import axios from '@/util/axios'

const { state, commit } = useStore()
const $router = useRouter()
const changeCollapse = () => {
  commit('changeCollapse', !state.isCollapse)
}
const isCollapse = computed(() => state.isCollapse)
let dialogFormVisible = ref(false)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const imgSrc: { value: string | undefined } = ref('')

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') as string)
  if (user.imageUrl) {
    imgSrc.value = user.imageUrl
    console.log(user.imageUrl)
  } else {
    imgSrc.value =
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Frichtext%2Flarge%2Fpublic%2Fp206989230.jpg&refer=http%3A%2F%2Fimg3.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654657833&t=5b33c95cbb12492cd96fa93377cbab0d'
  }
})

const uploadBuddha = () => {
  dialogFormVisible.value = !dialogFormVisible.value
}

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleBeforeUpload = (file: any) => {
  const isImage = file.type.includes('image')
  if (!isImage) {
    ElMessage.error('上传文件类型必须是图片!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!')
  }
  return isImage && isLt2M
}

const handleUpload = (file: UploadFile) => {
  const user = localStorage.getItem('user')
  axios
    .get('/upload', {
      params: {
        imageUrl: file.url,
        user: user,
      },
    })
    .then((res) => {
      const user = JSON.parse(localStorage.getItem('user') as any)
      user.imageUrl = file.url
      localStorage.setItem('user', JSON.stringify(user))
      ElMessage.success(res.data.msg)
      imgSrc.value = file.url
    })
    .catch((res) => {
      console.log(res)
      ElMessage.error('上传失败!')
    })
}

const logOut = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  //重置永久存储vuex中的editableTabsValue
  commit('reloadStore', null)
  $router.push({ path: 'login' })
}

const goModiSelfinfo = () => {
  $router.push({ path: 'modiselfinfo' })
}
</script>
<style lang="scss" scoped>
.header {
  height: 100%;
  background-color: #2e50ff;
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
  position: fixed;
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
</style>