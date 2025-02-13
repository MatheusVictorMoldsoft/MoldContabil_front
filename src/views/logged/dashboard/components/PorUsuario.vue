<template>
    <v-card elevation="5">
      <v-card >
        <v-card-text>
          <div class="d-flex align-center">
            <h4 class="text-h4 mt-1">Validação por usuario</h4>
          </div>
          <div class="mt-4">
            <perfect-scrollbar :style="{ height: '270px' }">
              <v-list lines="two" class="py-0">
                <v-list-item v-for="(revenue, i) in revenues" :key="i" :value="revenue" color="secondary" rounded="sm">
                  <template v-slot:append>
                    <div
                      class="bg-lightsuccess rounded-sm d-flex align-center justify-center ml-3"
                      style="width: 20px; height: 20px"
                      v-if="revenue.price > 145"
                    >
                      <ChevronUpIcon stroke-width="1.5" width="20" class="text-success" />
                    </div>
                    <div class="bg-lighterror rounded-sm d-flex align-center justify-center ml-3" style="width: 20px; height: 20px" v-else>
                      <ChevronDownIcon stroke-width="1.5" width="20" class="text-error" />
                    </div>
                  </template>
                  <div class="d-inline-flex align-center justify-space-between w-100">
                    <div>
                      <h6 class="text-subtitle-1 text-medium-emphasis font-weight-bold">
                        {{ revenue.name }}
                      </h6>
                    </div>
  
                    <div class="ml-auto text-subtitle-1 text-medium-emphasis font-weight-bold">{{ revenue.Validou }}</div>
                  </div>
                </v-list-item>
              </v-list>
            </perfect-scrollbar>
  
            <!-- <div class="text-center mt-3">
              <v-btn color="primary" variant="text"
                >View All
                <template v-slot:append>
                  <ChevronRightIcon stroke-width="1.5" width="20" />
                </template>
              </v-btn>
            </div> -->
          </div>
        </v-card-text>
      </v-card>
    </v-card>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { ChevronUpIcon, ChevronDownIcon} from 'vue-tabler-icons';
  
  export default {
    components: {
      ChevronUpIcon,
      ChevronDownIcon,
      //ChevronRightIcon,
    },
    setup() {
      // Chart 1 options
      const chartOptions1 = computed(() => {
        return {
          chart: {
            type: 'area',
            height: 95,
            fontFamily: `inherit`,
            foreColor: '#a1aab2',
            sparkline: {
              enabled: true,
            },
          },
          colors: ['#5e35b1'],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
            width: 1,
          },
          tooltip: {
            theme: 'dark',
            fixed: {
              enabled: false,
            },
            x: {
              show: false,
            },
            y: {
              title: {
                formatter: () => 'Ticket ',
              },
            },
            marker: {
              show: false,
            },
          },
        };
      });
  
      // Chart 1 data
      const lineChart1 = {
        series: [
          {
            data: [0, 15, 10, 50, 30, 40, 25],
          },
        ],
      };
  
      // Revenues data
      const revenues = ref([
        {
          name: 'André Woltz',
          Validou: 145,
        },
        {
          name: 'Maria Helena',
          Validou: 6.368,
        },
        {
          name: 'Rodrigo Berd',
          Validou: 458,
        },  
        {
          name: 'Ricardo Gomes',
          Validou: 5.631,
        },
        {
          name: 'Pedro Luiz',
          Validou: 6.368,
        },
      ]);
  
      return {
        chartOptions1,
        lineChart1,
        revenues,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados, se necessário */
  </style>