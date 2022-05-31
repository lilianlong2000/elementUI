<template>
  <div :class="'animated ' + animateType">
    <el-scrollbar max-height="650px">
      <el-row>
        <el-col :span="17" :offset="3">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>个人信息</span>
              </div>
            </template>
            <el-form
              ref="formRef"
              :label-position="'top'"
              label-width="100px"
              :model="formLabelAlign"
              style="max-width: 700px"
              :rules="rules"
            >
              <el-form-item label="Head Portraits">
                <div class="imagebox" @click="uploadBuddha">
                  <el-image class="headerimage" fit="fill" :src="imgSrc">
                    <template #error>
                      <el-image class="headerimage" :src="require('../assets/defaulttouxiang.jpg')">
                      </el-image>
                    </template>
                  </el-image>
                  <div class="imagebg">点击修改</div>
                </div>
              </el-form-item>
              <el-form-item label="Name">
                <el-input v-model="formLabelAlign.name" :disabled="nameflag" />
              </el-form-item>
              <el-form-item>
                <div class="tip custom-block">
                  <p>
                    *修改信息需要填写密码，要修改密码需要两次输入新密码，不修改密码不需要填写新密码
                  </p>
                </div>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input
                  v-model="formLabelAlign.password"
                  type="password"
                  :disabled="index != 1"
                  v-focus="index === 1"
                  clearable
                  show-password
                  placeholder="请输入密码"
                />
                <el-button @click="changeindex(1)" class="btn" type="danger" size="small">{{
                  !(index === 1) ? '填入' : '关闭填入'
                }}</el-button>
              </el-form-item>
              <el-form-item label="NewPassword" prop="newpsw">
                <el-input
                  v-model="formLabelAlign.newpsw"
                  type="password"
                  :disabled="index != 1.1"
                  v-focus="index === 1.1"
                  clearable
                  show-password
                  placeholder="请输入新密码"
                />
                <el-button @click="changeindex(1.1)" class="btn" type="danger" size="small">{{
                  !(index === 1.1) ? '填入' : '关闭填入'
                }}</el-button>
              </el-form-item>
              <el-form-item label="AgainNewPassword" prop="againnewpsw">
                <el-input
                  v-model="formLabelAlign.againnewpsw"
                  type="password"
                  :disabled="index != 1.2"
                  v-focus="index === 1.2"
                  clearable
                  show-password
                  placeholder="请输入再次输入新密码"
                />
                <el-button @click="changeindex(1.2)" class="btn" type="danger" size="small">{{
                  !(index === 1.2) ? '填入' : '关闭填入'
                }}</el-button>
              </el-form-item>
              <el-form-item label="Age" prop="age">
                <el-input
                  v-model="formLabelAlign.age"
                  :disabled="index != 2"
                  v-focus="index === 2"
                  clearable
                  placeholder="请输入年龄"
                />
                <el-button @click="changeindex(2)" class="btn" type="danger" size="small">{{
                  !(index === 2) ? '修改' : '禁止修改'
                }}</el-button>
              </el-form-item>
              <el-form-item label="Sex" prop="sex">
                <el-select
                  v-model="formLabelAlign.sex"
                  clearable
                  placeholder="请选择性别"
                  :disabled="index != 3"
                >
                  <el-option :key="false" value="男" label="男"> </el-option>
                  <el-option :key="true" value="女" label="女"> </el-option>
                </el-select>
                <el-button @click="changeindex(3)" class="btn" type="danger" size="small">{{
                  !(index === 3) ? '修改' : '禁止修改'
                }}</el-button>
              </el-form-item>
              <br />
              <el-form-item>
                <el-button type="primary" plain @click="submitForm(formRef)" class="commitbtn"
                  >修改个人信息</el-button
                >
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import Header from '@/components/home/header.vue'
import Aside from '@/components/home/aside.vue'
import app from '@/main'
import $bus from '@/util/bus'
import { ref, createApp, reactive, onMounted, inject, computed, getCurrentInstance } from 'vue'
import axios from '@/util/axios'
import { useStore } from 'vuex'
import { ElMessageBox, FormInstance, ElMessage } from 'element-plus'
interface formLabel {
  name: string
  password: string
  age: string
  sex: string
  newpsw: string
  againnewpsw: string
}
let formLabelAlign: formLabel = reactive({
  name: '',
  password: '',
  newpsw: '',
  againnewpsw: '',
  age: '',
  sex: '',
})
const nameflag = ref(true)
const index = ref(0)
const reload: Function | undefined = inject('reload')
const formRef = ref<FormInstance>()
const { state, commit } = useStore()
const animateType = computed(() => state.animateType)
const imgSrc = ref('')
const rules = {
  password: [
    {
      required: true,
      message: '请输入密码！',
      trigger: 'change',
    },
    { min: 6, max: 16, message: '密码的长度为6-16个任意字符！', trigger: 'change' },
  ],
  age: [
    { required: true, message: '必须填写年龄！' },
    { type: 'string', message: '年龄必须是数字！' },
    { min: 1, max: 3, message: '年龄必须是0~999！' },
  ],
  sex: [
    {
      required: true,
      message: '请选择性别！',
    },
  ],
  newpsw: [
    {
      // required: true,
      message: '请输入新密码！',
      trigger: 'change',
    },
    { min: 6, max: 16, message: '密码的长度为6-16个任意字符!', trigger: 'change' },
  ],
  againnewpsw: [
    {
      // required: true,
      message: '请再次输入新密码！',
      trigger: 'change',
    },
    { min: 6, max: 16, message: '密码的长度为6-16个任意字符!', trigger: 'change' },
  ],
}

onMounted(() => {
  getuserinfo()
})
const uploadBuddha = () => {
  $bus.emit('uploadB')
}
var getuserinfo = () => {
  const user = JSON.parse(localStorage.getItem('user') as string)
  if (user) {
    imgSrc.value = user.imageUrl
  }
  axios.get('/getuserinfo', { params: { id: user.id } } as any).then((res) => {
    if (res.data.code === 1) {
      console.log(res.data)
      const { name, age, sex } = res.data.msg
      localStorage.setItem('user', JSON.stringify(res.data.msg))
      formLabelAlign.name = name
      formLabelAlign.age = age
      formLabelAlign.sex = sex
    } else if (res.data.code === 0) {
      ElMessage.error(res.data.msg)
    }
  })
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((bool) => {
    if (bool) {
      const data = JSON.parse(JSON.stringify(formLabelAlign))
      console.log(data)
      if (data.newpsw !== data.againnewpsw) {
        return ElMessage.error('两次输入的新密码不一样!')
      }
      if (data.newpsw == '' && data.againnewpsw == '') {
        data.newpsw = data.password
        data.modinopsw = true
      }
      delete data.againnewpsw
      data.oldpsw = data.password
      delete data.password
      axios.post('/changeuserinfo', data).then((res) => {
        if (res.data.code === 1) {
          // localStorage.setItem('user', JSON.stringify(formLabelAlign))
          if (reload) {
            reload()
          }
          ElMessage.success(res.data.msg)
        } else if (res.data.code === 0) {
          ElMessage.warning(res.data.msg)
        }
      })
    } else {
      ElMessage.error('请完成表单提示')
    }
  })
}
const changeindex = (num: number) => {
  index.value === num ? (index.value = 0) : (index.value = num)
}
</script>
<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  color: white;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  height: 100%;
  line-height: 60px;
}
.btn {
  position: absolute;
  right: -72px;
}
.el-form-item {
  margin-right: 72px;
  position: relative;
}
.el-select {
  width: 100%;
}
.commitbtn {
  width: 100%;
}
.custom-block.tip {
  width: 100%;
  padding: 0px 16px;
  background-color: rgba(64, 128, 255, 0.1);
  border-radius: 4px;
  border-left: 5px solid var(--el-color-primary);
  margin: 20px 0;
  .custom-block-title {
    font-weight: 700;
  }
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
}
.el-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.imagebox {
  position: relative;
  cursor: pointer;
  .imagebg {
    top: 0;
    left: 0;
    color: white;
    position: absolute;
    width: 60px;
    text-align: center;
    line-height: 60px;
    display: none;
    height: 60px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  &:hover .imagebg {
    display: block;
  }
}
</style>