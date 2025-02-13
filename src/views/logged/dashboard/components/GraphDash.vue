<template>
    <v-card elevation="5">
      <v-card >
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="9">
              <span class="text-subtitle-2 text-disabled font-weight-bold"></span>
              <h3 class="text-h3 mt-1">Aberto x Fechado </h3>
            </v-col>
            <v-col cols="12" sm="3">
              <!-- <v-select
                color="primary"
                variant="outlined"
                hide-details
                v-model="select"
                :items="items"
                item-title="state"
                item-value="abbr"
                label="Select"
                persistent-hint
                return-object
                single-line
              >
              </v-select> -->
            </v-col>
          </v-row>
          <div class="mt-4">
            <apexchart type="bar" height="480" :options="chartOptions1" :series="[...lineChart1.series, ...lineChart2.series]"> </apexchart>
          </div>
        </v-card-text>
      </v-card>
    </v-card>
  </template>
  
  <script>
  import {  computed } from 'vue';
  
  export default {
    setup() {
    //   const select = ref({ state: 'Today', abbr: 'FL' });
      const items = [
        { state: 'Today', abbr: 'FL' },
        { state: 'This Month', abbr: 'GA' },
        { state: 'This Year', abbr: 'NE' },
      ];
  
      // Chart 1 options
      const chartOptions1 = computed(() => {
        return {
          chart: {
            type: 'bar',
            height: 480,
            fontFamily: `inherit`,
            foreColor: '#a1aab2',
            stacked: true,
          },
          colors: ['#eef2f6', '#1e88e5', '#5e35b1', '#ede7f6'],
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0,
                },
              },
            },
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '50%',
            },
          },
          xaxis: {
            type: 'category',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
          legend: {
            show: true,
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 20,
            labels: {
              useSeriesColors: false,
            },
            markers: {
              width: 16,
              height: 16,
              radius: 5,
            },
            itemMargin: {
              horizontal: 15,
              vertical: 8,
            },
          },
          fill: {
            type: 'solid',
          },
          dataLabels: {
            enabled: false,
          },
          grid: {
            show: true,
          },
          tooltip: {
            theme: 'dark',
          },
        };
      });
  
      // Chart 1 data
      const lineChart1 = {
        series: [
          {
            name: 'Aberto',
            data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75],
          },
          {
            name: 'Fechado',
            data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75],
          },
        ],
      };
      const lineChart2 = {
        series: [
          {
            name: 'Aberto',
            data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75],
          },
          {
            name: 'Fechado',
            data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75],
          },
        ],
      };
      return {
        items,
        chartOptions1,
        lineChart1,
        lineChart2,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados, se necessário */
  </style>