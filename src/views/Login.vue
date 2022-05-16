<template>
  <div :style="backGround" class="container" ref="loginBox">
    <el-card class="box-card">
      <template #header>
        <h2>登录</h2>
      </template>
      <el-form
        label-position="right"
        label-width="auto"
        :model="loginFormObject"
        style="max-width: 460px"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="loginFormObject.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="loginFormObject.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input v-model="loginFormObject.age" />
        </el-form-item>
        <el-form-item label="性别：">
          <el-switch
            v-model="loginFormObject.sex"
            class="ml-2"
            active-text="女"
            active-color="#F56C6C"
            inactive-text="男"
            inactive-color="#409EFF"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            style="width: 100%"
            @click="submitForm(formRef)"
            :disabled="flag"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="text" size="small" @click="goRegister">没账号？去注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { FormRules, FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import axios from '../util/axios.js'
interface loginform {
  name: String
  password: String
  age: number
  sex: Boolean
}
let loginFormObject: loginform = reactive({
  name: '',
  password: '',
  age: 0,
  sex: false,
})
const $router = useRouter()
const $route = useRoute()
const { commit } = useStore()
let flag = ref(false)
const formRef = ref<FormInstance>()
const backGround = {
  backgroundImage: 'url(' + require('../assets/login-bg.jpeg') + ')',
}
//表单验证
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入姓名!', trigger: 'blur' },
    { min: 2, max: 10, message: '姓名的长度为2-10个汉字!', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change',
    },
    { min: 6, max: 16, message: '密码的长度为6-16个任意字符!', trigger: 'blur' },
  ],
})

onMounted(() => {
  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')
  if (user && token) {
    console.log(111)

    $router.push({ name: 'home' })
  }
  if ($route.params.name) {
    loginFormObject.name = $route.params.name as any
    loginFormObject.password = $route.params.password as any
  }
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      flag.value = true
      axios.get('/login', { params: { ...(loginFormObject as any) } }).then((res) => {
        if (res.data.code === 1) {
          localStorage.setItem('token', res.data.token)
          delete res.data.user.password
          localStorage.setItem('user', JSON.stringify(res.data.user))
          flag.value = false
          ElMessage.success(res.data.msg)

          $router.push({ path: '/' })
        } else if (res.data.code === 0) {
          flag.value = false
          ElMessage.error(res.data.msg)
        }
        flag.value = false
      })
    } else {
      ElMessage.warning('请完成表单验证!')
      return false
    }
  })
}

const goRegister = () => {
  $router.push({ path: 'register' })
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100vh;
  .box-card {
    position: absolute;
    width: 500px;
    top: 200px;
    right: 300px;
  }
}
</style>