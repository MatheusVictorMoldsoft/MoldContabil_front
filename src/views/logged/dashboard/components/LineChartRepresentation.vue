<template>
  <apexchart type="line" :options="chartOptions" :series="series" height="300" />
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "LineChartRepresentation",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: "Série 1",
          data: [30, 40, 35, 50, 49, 60, 70, 91]
        }
      ],
      chartOptions: {
        chart: {
          id: "line-chart"
        },
        xaxis: {
          categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago"]
        },
        title: {
          text: "Representação Gráfica"
        },
        colors: ["#E91E63"]
      }
    };
  }
};
</script>
