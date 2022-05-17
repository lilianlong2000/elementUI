<template>
  <div class="echartsbox" ref="chartDom" id="main"></div>
  <el-button @click="getWheath">获取天气</el-button>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, getCurrentInstance, computed, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
import { useStore } from 'vuex'
const timmer = ref()
const temdaylist = ref()
const temnightlist = ref()
const timeslist = ref()
const myCharts = ref()
type EChartsOption = echarts.EChartsOption
const { state, commit, getters } = useStore()

function getWheath() {
  let result = null
  axios
    .get('https://v0.yiketianqi.com/free/week', {
      params: {
        appid: '99236725',
        appsecret: 'sJ2kYLVq',
        city: '新吴',
      },
    })
    .then((res) => {
      result = res.data
      console.log(res.data.data)
      commit('changeWheathInfo', result.data)
      temdaylist.value = computed(() => getters.getWheathTemDay)
      temnightlist.value = computed(() => getters.getWheathTemNight)
      timeslist.value = computed(() => getters.gettimes)
      myCharts.value.setOption({
        series: [
          {
            type: 'bar',
            data: temdaylist.value.value,
          },
          {
            type: 'bar',
            data: temnightlist.value.value,
          },
        ],
        xAxis: [
          {
            data: timeslist.value.value,
          },
        ],
      })
    })

  return result
}

onMounted(() => {
  var chartDom = document.getElementById('main')!
  var myChart = echarts.init(chartDom as any)
  myCharts.value = myChart
  if (timmer.value) clearInterval(timmer as any)
  timmer.value = setInterval(() => {
    getWheath()
  }, 120000)
  getWheath()
  var option: EChartsOption

  option = {
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
      data: ['白天温度', '夜晚温度', 'Temperature'],
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
        name: '降雨量',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} ml',
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
        type: 'bar',
        yAxisIndex: 1,
        label: { show: true },
        tooltip: {
          valueFormatter: function (value) {
            return value + ' °C'
          },
        },
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      },
      {
        name: '夜晚温度',
        type: 'bar',
        yAxisIndex: 1,
        label: { show: true },
        tooltip: {
          valueFormatter: function (value) {
            return value + ' °C'
          },
        },
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      },
      {
        name: 'Temperature',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' °C'
          },
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
      },
    ],
  }

  option && myChart.setOption(option)
})
</script>
<style lang="scss" scoped>
.echartsbox {
  width: 100%;
  height: 550px;
  position: relative;
}
</style>
