<template>
  <div :class="'animated ' + animateType">
    <el-row>
      <el-col :span="20" :offset="1">
        <el-card>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="系统页面切换动画" name="first">
              <el-scrollbar max-height="550px">
                <div class="demoAnimatebox">
                  <h1>系统页面切换动画演示</h1>
                  <div :class="'animated ' + aniTypeItem">Animate.css</div>
                  <p>——css3动画库</p>
                </div>
                <el-radio-group v-model="aniType">
                  <el-radio-button
                    :label="item.name"
                    @click="hendleClick(index)"
                    v-for="(item, index) in animatetypes"
                  />
                </el-radio-group>
                <div style="margin-top: 20px; margin-left: 10px">
                  <el-radio-group v-model="aniTypeItem">
                    <el-radio :label="item" v-for="item in animatetypes[index].children">
                      <span>{{ item }}</span>
                      <span style="color: #f56c6c; margin-left: 5px" v-if="item === 'fadeInLeftBig'"
                        >->默认动画</span
                      >
                    </el-radio>
                  </el-radio-group>
                </div>
                <div class="warning custom-block">
                  <p class="custom-block-title">WARNING</p>
                  <p>
                    带out关键字的动画只做演示，不要设置名字带out的动画，因为动画结束会隐藏页面！可能导致空白页面。
                  </p>
                </div>
                <div class="animatebtnbox">
                  <el-button type="primary" plain class="animatebtn" @click="commitAnimateType"
                    >确定修改</el-button
                  >
                </div>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="系统字体" name="second">
              <el-scrollbar max-height="550px">
                <el-form label-width="120px">
                  <el-form-item label="字体:">
                    <el-select v-model="family" placeholder="Select">
                      <el-option v-for="item in fontFamily" :key="item" :label="item" :value="item">
                        <span :style="{ fontFamily: item.split(' ')[0] }">
                          {{ item }}
                        </span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="字号:">
                    <el-slider
                      class="elslider"
                      :min="12"
                      :max="40"
                      size="small"
                      show-input
                      v-model="size"
                    >
                    </el-slider>
                  </el-form-item>
                </el-form>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="模式设置" name="third">
              <el-form label-width="120px" label-position="top">
                <el-form-item label="导航栏模式">
                  <el-switch
                    v-model="navStyle"
                    inline-prompt
                    :active-icon="Sunny"
                    active-color="#ccc"
                    :inactive-icon="Moon"
                    inactive-color="#000"
                    size="large"
                  />
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
const { state, commit } = useStore()
const activeName = ref('first')
const aniType = ref('fade in')
const aniTypeItem = ref('fadeInLeftBig')
const index = ref(3)
const n = computed(() => state.navStyle)
const navStyle = ref(n.value)
const animateType = computed(() => state.animateType)
const animatetypes = [
  {
    name: '注意力动画',
    children: ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble'],
  },
  {
    name: 'bounce in',
    children: ['bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp'],
  },
  {
    name: 'bounce out',
    children: ['bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp'],
  },
  {
    name: 'fade in',
    children: [
      'fadeIn',
      'fadeInDown',
      'fadeInDownBig',
      'fadeInLeft',
      'fadeInLeftBig',
      'fadeInRight',
      'fadeInRightBig',
      'fadeInUp',
      'fadeInUpBig',
    ],
  },
  {
    name: 'fade out',
    children: [
      'fadeOut',
      'fadeOutDown',
      'fadeOutDownBig',
      'fadeOutLeft',
      'fadeOutLeftBig',
      'fadeOutRight',
      'fadeOutRightBig',
      'fadeOutUp',
      'fadeOutUpBig',
    ],
  },
  {
    name: 'flippers',
    children: ['flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY'],
  },
  {
    name: 'lightspeed',
    children: ['lightSpeedIn', 'lightSpeedOut'],
  },
  {
    name: 'rotate in',
    children: [
      'rotateIn',
      'rotateInDownLeft',
      'rotateInDownRight',
      'rotateInUpLeft',
      'rotateInUpRight',
    ],
  },
  {
    name: 'rotate out',
    children: [
      'rotateOut',
      'rotateOutDownLeft',
      'rotateOutDownRight',
      'rotateOutUpLeft',
      'rotateOutUpRight',
    ],
  },
  {
    name: 'sliders',
    children: [
      'slideInDown',
      'slideInLeft',
      'slideInRight',
      'slideOutLeft',
      'slideOutRight',
      'slideOutUp',
    ],
  },
  {
    name: 'specials',
    children: ['hinge', 'rollIn', 'rollOut'],
  },
]
const family = ref('微软雅黑 Microsoft YaHei --默认')
const size = ref(14)
const fontFamily = [
  '宋体 SimSun',
  '黑体 SimHei',
  '微软雅黑 Microsoft YaHei -默认',
  '微软正黑体 Microsoft JhengHei',
  '新宋体 NSimSun',
  '新细明体 PMingLiU',
  '细明体 MingLiU',
  '标楷体 DFKai-SB',
  '仿宋 FangSong',
  '楷体 KaiTi',
]
const hendleClick = (id: number) => {
  index.value = id
}
const commitAnimateType = () => {
  commit('changeAnimateType', aniTypeItem.value)
}
watch(family, (newvalue, oldvalue) => {
  console.log(newvalue, oldvalue)
  commit('changeFontFamily', newvalue)
  document.documentElement.style.fontFamily = newvalue.split(' ')[1]
})
watch(size, (newvalue, oldvalue) => {
  console.log(newvalue, oldvalue)
  document.documentElement.style.fontSize = newvalue + 'px'
})
watch(navStyle, (newvalue, oldvalue) => {
  commit('changeNavStyle', newvalue)
})
</script>
<style lang="scss" scoped>
.demoAnimatebox {
  h1 {
    margin: 10px auto;
    font: 32px 'Microsoft Yahei';
    text-align: center;
  }
  div {
    font: 96px 'Microsoft Yahei';
    font-weight: 500;
    text-align: center;
    color: #f35626;
    margin-top: 20px;
  }
  p {
    margin-bottom: 40px;
    font: 30px 'Microsoft Yahei';
    text-align: center;
    color: #999;
  }
}
.animatebtnbox {
  text-align: center;
  margin: 5px 0 10px 0;
  .animatebtn {
    width: 90%;
    margin-top: 20px;
  }
}
.custom-block.warning {
  padding: 8px 16px;
  background-color: rgba(245, 108, 108, 0.1);
  border-radius: 4px;
  border-left: 5px solid #f56c6c;
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
.elslider {
  width: 70%;
}
</style>