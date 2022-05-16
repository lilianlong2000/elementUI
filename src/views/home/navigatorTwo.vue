<template>
  <div class="echartsbox" ref="chartDom"></div>
  <el-button @click="getWheath">获取</el-button>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, getCurrentInstance } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
const chartDom = ref<HTMLElement>()
type EChartsOption = echarts.EChartsOption
function getWheath() {
  axios.get('/api/cityjson/?ie=utf-8').then((res) => {
    const ip = res.data.slice(28, 40)
    axios
      .get('/apiposition', {
        params: {
          token: '4596b6a95d39d821ee3c386a015aca68{oid=58661,mid=117732}',
          ip,
        },
      })
      .then((res) => {
        console.log(res)
      })
  })
}
// var chartDom = document.getElementById('main') as HTMLElement
// const getPosition = () => {
//   axios.get('http://pv.sohu.com/cityjson').then((res) => {
//     console.log(res)
//   })
// }

onMounted(() => {
  // getPosition()

  console.log(chartDom.value)
  var myChart = echarts.init(chartDom.value as unknown as HTMLElement)
  var option: EChartsOption

  option = {
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        splitNumber: 12,
        itemStyle: {
          color: '#FFAB91',
        },
        progress: {
          show: true,
          width: 30,
        },

        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 30,
          },
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: '#999',
          },
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: '#999',
          },
        },
        axisLabel: {
          distance: -20,
          color: '#999',
          fontSize: 20,
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, '-15%'],
          fontSize: 30,
          fontWeight: 'bolder',
          formatter: '{value} °C',
          color: 'auto',
        },
        data: [
          {
            value: 20,
          },
        ],
      },

      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        itemStyle: {
          color: '#FD7347',
        },
        progress: {
          show: true,
          width: 8,
        },

        pointer: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: 20,
          },
        ],
      },
    ],
  }

  setInterval(function () {
    const random = +(Math.random() * 60).toFixed(2)
    myChart.setOption<echarts.EChartsOption>({
      series: [
        {
          data: [
            {
              value: random,
            },
          ],
        },
        {
          data: [
            {
              value: random,
            },
          ],
        },
      ],
    })
  }, 2000)
  option && myChart.setOption(option)
})
</script>
<style lang="scss" scoped>
.echartsbox {
  height: 270px;
  width: 350px;
}
</style>