<template>
  <div :style="backGround" class="container" ref="loginBox">
    <el-card class="box-card">
      <template #header>
        <h2>注册</h2>
      </template>
      <el-form
        label-position="right"
        label-width="auto"
        :model="registerFormObject"
        style="max-width: 460px"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="registerFormObject.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="registerFormObject.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input v-model="registerFormObject.age" />
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="registerFormObject.sex">
            <el-radio label="男" size="large">男</el-radio>
            <el-radio label="女" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain style="width: 100%" @click="submitForm(formRef)"
            >注册</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="text" size="small" @click="goLogin">去登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormRules, FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import axios from '../util/axios.js'
interface loginform {
  name: String
  password: String
  age: number
  sex: string
}
const registerFormObject: loginform = reactive({
  name: '',
  password: '',
  age: 0,
  sex: '男',
})
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
const $router = useRouter()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      axios.get('/register', { params: { ...(registerFormObject as any) } }).then((res) => {
        console.log(res)
        if (res.data.code === 1) {
          ElMessage.success(res.data.msg)
          $router.push({ name: 'login', params: { ...(registerFormObject as any) } })
        } else if (res.data.code === 0) {
          return ElMessage.warning(res.data.msg)
        }
      })
    } else {
      ElMessage.warning('请输入账号或者密码!')
      return false
    }
  })
}
const goLogin = () => {
  $router.push({ path: 'login' })
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