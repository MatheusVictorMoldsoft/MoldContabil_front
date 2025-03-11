<template>
  <apexchart type="bar" :options="chartOptions" :series="series" height="300" />
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "BarChartAbertoFechado",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: "Total",
          data: [120, 80] // Exemplo: [Total Aberto, Total Fechado]
        }
      ],
      chartOptions: {
        chart: {
          id: "aberto-fechado-chart"
        },
        xaxis: {
          categories: ["Aberto", "Fechado"]
        },
        title: {
          text: "Solicitações: Aberto vs Fechado"
        },
        colors: ["#1976D2"]
      }
    };
  }
};
</script>
