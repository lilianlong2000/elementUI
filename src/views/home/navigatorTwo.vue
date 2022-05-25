<template>
  <el-row>
    <el-col :span="24">
      <div class="time">
        <div class="update">距离下次更新还有:</div>
        <div>{{ '0' + minutes }}</div>
        <div class="semicolon">:</div>
        <div>{{ seconds }}</div>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <el-scrollbar max-height="600px">
        <div>
          <div class="echartsbox" id="main"></div>
          <el-button @click="getWheathTodayInfo">获取今天天气详情</el-button>
          <div class="echartsbox1" id="main1"></div>
        </div>
      </el-scrollbar>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, getCurrentInstance, computed, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
const timmer = ref()
const timmer1 = ref()
const temdaylist = ref()
const temnightlist = ref()
const timeslist = ref()
const myCharts = ref()
const myCharts1 = ref()
const windspeedlist = ref()
const minutes = ref('0')
const seconds = ref('00')
type EChartsOption = echarts.EChartsOption
const { state, commit, getters } = useStore()

function getWheathWeek() {
  axios
    .get('https://v0.yiketianqi.com/free/week', {
      params: {
        appid: '99236725',
        appsecret: 'sJ2kYLVq',
        city: '新吴',
      },
    })
    .then((res) => {
      if (res.data.errcode == 100) {
        ElMessage.warning(res.data.errmsg)
        console.log(res.data)
        return
      }
      commit('changeWheathInfo', res.data.data)
      temdaylist.value = computed(() => getters.getWheathTemDay)
      temnightlist.value = computed(() => getters.getWheathTemNight)
      timeslist.value = computed(() => getters.gettimes)
      windspeedlist.value = computed(() => getters.getwindspeed)
      myCharts.value.setOption({
        series: [
          {
            data: temdaylist.value.value,
          },
          {
            data: temnightlist.value.value,
          },
          {
            data: windspeedlist.value.value,
          },
        ],
        xAxis: [
          {
            data: timeslist.value.value,
          },
        ],
      })
    })
}

function getWheathTodayInfo() {
  axios
    .get('https://v0.yiketianqi.com/free/day', {
      params: {
        appid: '99236725',
        appsecret: 'sJ2kYLVq',
        city: '新吴',
      },
    })
    .then((res) => {
      console.log(res.data)
      commit('changeWheathTodayInfo', res.data)
    })
}

onMounted(() => {
  var chartDom = document.getElementById('main')!
  var chartDom1 = document.getElementById('main1')!
  var myChart = echarts.init(chartDom as any)
  var myChart1 = echarts.init(chartDom1 as any)
  myCharts.value = myChart
  myCharts1.value = myChart1

  if (timmer.value) clearInterval(timmer as any)
  if (timmer1.value) clearInterval(timmer1 as any)
  let num = 120
  function intnum(num: number) {
    if (num < 10) {
      return '0' + num
    }
    return num
  }
  timmer1.value = setInterval(() => {
    num--
    minutes.value = Math.floor(num / 60).toString()
    seconds.value = intnum(num % 60).toString()
    if (num == 0) {
      num = 120
    }
  }, 1000)
  timmer.value = setInterval(() => {
    getWheathWeek()
    getWheathTodayInfo()
  }, 1200000)
  getWheathWeek()
  getWheathTodayInfo()
  var option: EChartsOption
  var option1: EChartsOption

  option = {
    title: {
      text: '未来七天温度风速预测',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ['白天温度', '夜晚温度', '风速'],
    },
    xAxis: [
      {
        type: 'category',
        data: ['mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '级',
        min: 0,
        max: 10,
        interval: 1,
        axisLabel: {
          formatter: '< {value} 级',
        },
      },
      {
        type: 'value',
        name: '温度',
        min: 0,
        max: 45,
        interval: 2,
        axisLabel: {
          formatter: '{value} °C',
        },
      },
    ],
    series: [
      {
        name: '白天温度',
        type: 'line',
        yAxisIndex: 1,
        label: { show: true },
        tooltip: {
          valueFormatter: function (value) {
            return value + ' °C'
          },
        },
        data: [20, 20, 20, 20, 20, 20, 20],
      },
      {
        name: '夜晚温度',
        type: 'line',
        yAxisIndex: 1,
        label: { show: true },
        tooltip: {
          valueFormatter: function (value) {
            return value + ' °C'
          },
        },
        data: [10, 10, 10, 10, 10, 10, 10],
      },
      {
        name: '风速',
        type: 'line',
        label: { show: true },
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 级'
          },
        },
        data: [3, 3, 3, 3, 3, 3, 3],
      },
    ],
  }
  option1 = {
    title: {
      text: '今日天气详情',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function (val: any): any {
        // console.log(val) // 打印可以看到里面包含什么
        // console.log(computed(() => getters.getWeathInfo(val.data.name)))
        return computed(() => getters.getWeathInfo(val.data.name)).value
      },
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: 1, name: '实况温度' },
          { value: 1, name: '天气情况' },
          { value: 1, name: '风向' },
          { value: 1, name: '风力' },
          { value: 1, name: '风速' },
          { value: 1, name: '空气质量' },
          { value: 1, name: '气压' },
          { value: 1, name: '湿度' },
        ],
      },
    ],
  }
  option && myChart.setOption(option)
  option1 && myChart1.setOption(option1)
})
</script>
<style lang="scss" scoped>
.echartsbox {
  width: 95%;
  height: 500px;
  position: relative;
  margin-top: 40px;
}
.echartsbox1 {
  width: 95%;
  height: 500px;
}
.time {
  display: flex;
  justify-content: flex-end;
  // width: 400px;
  background-color: #fff;
  z-index: inherit;
  height: 10px;
  div {
    float: left;
    width: 40px;
    height: 40px;
    background-color: #000;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 24px;
    margin-right: 10px;
  }
  .semicolon {
    width: 10px;
    background-color: #fff;
    color: #000;
    font-weight: bold;
  }
  .update {
    width: auto;
    background-color: #fff;
    color: #000;
    font-size: 24px;
  }
}
</style>
