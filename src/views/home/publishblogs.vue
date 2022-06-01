<template>
  <el-scrollbar>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-card>
          <template #header>
            <h2>发布文章</h2>
          </template>
          <el-card shadow="never">
            <div>
              <div>
                <Toolbar
                  :editor="editorRef"
                  :defaultConfig="toolbarConfig"
                  :mode="mode"
                  style="border-bottom: 1px solid #ccc"
                />
                <div class="titlebox">
                  <div>
                    <el-input
                      v-model="title"
                      maxlength="120"
                      :minlength="5"
                      type="text"
                      show-word-limit
                      placeholder="请输入文章标题"
                      @keyup.enter="hendleEnter"
                    >
                    </el-input>
                    <span v-if="limittitlenum > 0"
                      >还需要输入<i style="color: red">{{ limittitlenum }}</i
                      >个字</span
                    >
                  </div>
                  <el-button @click="publishblogs" type="primary"> 发布文章 </el-button>
                </div>
                <Editor
                  :defaultConfig="editorConfig"
                  :mode="mode"
                  v-model="valueHtml"
                  style="height: 400px; overflow-y: hidden"
                  @onCreated="handleCreated"
                  @onChange="handleChange"
                  @onDestroyed="handleDestroyed"
                  @onFocus="handleFocus"
                  @onBlur="handleBlur"
                  @customAlert="customAlert"
                  @customPaste="customPaste"
                />
              </div>
            </div>
          </el-card>
        </el-card>
      </el-col>
    </el-row>
  </el-scrollbar>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import axios from '@/util/axios'
import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ElMessage } from 'element-plus'
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref(``)
const title = ref('')
const limittitlenum = ref(5)
const { id, name } = JSON.parse(localStorage.getItem('user') as string)
watch(title, (newvalue, oldvalue) => {
  if (newvalue.split('').length > 5) {
    limittitlenum.value = 0
    return
  }
  limittitlenum.value = 5 - title.value.split('').length
})

// 模拟 ajax 异步获取内容
onMounted(() => {})

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return

  editor.destroy()
})

// 编辑器回调函数
const handleCreated = (editor: any) => {
  console.log('created', editor)
  editorRef.value = editor // 记录 editor 实例，重要！
}
const handleChange = (editor: any) => {
  console.log('change:', editor.getHtml())
}
const handleDestroyed = (editor: any) => {
  console.log('destroyed', editor)
}
const handleFocus = (editor: any) => {
  console.log('focus', editor)
}
const handleBlur = (editor: any) => {
  console.log('blur', editor)
}
const customAlert = (info: any, type: any) => {
  alert(`【自定义提示】${type} - ${info}`)
}
const customPaste = (editor: any, event: any, callback: any) => {
  console.log('ClipboardEvent 粘贴事件对象', event)

  // 自定义插入内容
  // editor.insertText('xxx')

  // 返回值（注意，vue 事件的返回值，不能用 return）
  // callback(false) // 返回 false ，阻止默认粘贴行为
  // callback(true) // 返回 true ，继续默认的粘贴行为
}

const insertText = () => {
  const editor = editorRef.value
  if (editor == null) return

  editor.insertText('hello world')
}

const printHtml = () => {
  const editor = editorRef.value
  if (editor == null) return
  console.log(editor.getHtml())
}

const disable = () => {
  const editor = editorRef.value
  if (editor == null) return
  editor.disable()
}
const hendleEnter = () => {
  if (limittitlenum.value <= 5 && limittitlenum.value > 0) return
  editorRef.value.focus()
}
const publishblogs = () => {
  console.log(valueHtml.value)
  axios
    .post('/publishblogs', { id, name, content: valueHtml.value, title: title.value })
    .then((res) => {
      if (res.data.code == 1) {
        return ElMessage.success(res.data.msg)
      } else if (res.data.code == 0) {
        return ElMessage.error(res.data.msg)
      }
      ElMessage.error('未知错误!')
    })
}
</script>
<style lang="scss" scoped>
.full-screen-container {
  z-index: 999;
}
.titlebox {
  display: flex;
  align-items: center;
  div {
    width: 80%;
    position: relative;
  }
  .el-input {
    // margin: 10px;
    padding: 10px;
    width: 100%;
    font-size: 18.7px;
  }
  span {
    position: absolute;
    right: 100px;
    top: 14px;
    z-index: 999;
  }
  .el-button {
    // float: right;
    // width: 30%;
    flex: 1;
  }
}
.w-e-full-screen-container {
  background-color: white;
  z-index: 9999;
}
</style>