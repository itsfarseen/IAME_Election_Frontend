import Vue from 'vue'
import { Doughnut, mixins } from 'vue-chartjs'
const {reactiveProp} = mixins

Vue.component('result-chart', {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
})
