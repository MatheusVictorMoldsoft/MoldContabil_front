<template>
    <v-card elevation="5" class="bg-primary overflow-hidden bubble-shape bubble-primary-shape">
      <v-card-text>
        <div class="d-flex align-start mb-3">
          <v-btn icon rounded="sm" color="darkprimary" variant="flat">
            <ShoppingCartIcon stroke-width="1.5" width="20" />
          </v-btn>
          <div class="ml-auto z-1">
            <v-tabs v-model="tab" class="theme-tab" density="compact" end>
              <v-tab value="1" hide-slider color="transparent">Hoje</v-tab>
              <v-tab value="2" hide-slider color="transparent">Hoje</v-tab>
            </v-tabs>
          </div>
        </div>
        <v-window v-model="tab" class="z-1">
          <v-window-item value="1">
            <v-row>
              <v-col cols="4">
                <h2 class="text-h1 font-weight-medium">
                  100
                </h2>
                <span class="text-subtitle-1 text-medium-emphasis text-white">Responder</span>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item value="2">
            <v-row>
              <v-col cols="4">
                <h2 class="text-h1 font-weight-medium">
                  120
                </h2>
                <span class="text-subtitle-1 text-medium-emphasis text-white">Em andamento</span>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { defineComponent, ref } from "vue";
  import {  ShoppingCartIcon} from "vue-tabler-icons";
  
  export default defineComponent({
    components: {
      ShoppingCartIcon,
    },
    data() {
      return {
        tab: ref("1"),
        lineChart1: {
          series: [{ name: "series1", data: [45, 66, 41, 89, 25, 44, 9, 54] }]
        },
        lineChart2: {
          series: [{ name: "series1", data: [35, 44, 9, 54, 45, 66, 41, 69] }]
        }
      };
    },
    methods: {
      getChartOptions() {
        return {
          chart: {
            type: "bar",
            height: 90,
            fontFamily: "inherit",
            foreColor: "#a1aab2",
            sparkline: { enabled: true }
          },
          dataLabels: { enabled: false },
          colors: ["#fff"],
          fill: { type: "solid", opacity: 1 },
          stroke: { curve: "smooth", width: 3 },
          yaxis: { min: 0, max: 100 },
          tooltip: {
            theme: "dark",
            fixed: { enabled: false },
            x: { show: false },
            y: { title: { formatter: () => "Total Order" } },
            marker: { show: false }
          }
        };
      }
    }
  });
  </script>
  