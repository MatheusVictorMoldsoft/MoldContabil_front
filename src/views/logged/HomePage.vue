<template>
  <div>
    <!-- Dashboard -->
    <v-container fluid>
      <v-row>
        <!-- Cards de status -->
        <v-col cols="12" md="4" v-for="(status, index) in statuses" :key="index">
          <v-card>
            <v-card-title>{{ status.title }}</v-card-title>
            <v-card-text>
              <h2>{{ status.value }}</h2>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Tabela de tickets por atendente -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Tickets por Atendente</v-card-title>
            <v-data-table
              :headers="attendeeHeaders"
              :items="attendeeTickets"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-card>
        </v-col>
      </v-row>

      <!-- Gráfico de tickets mensais -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Tickets Mensais</v-card-title>
            <v-chart :options="monthlyChartOptions" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';

// Registrar componentes do ECharts
use([TitleComponent, TooltipComponent, BarChart, CanvasRenderer]);

export default {
  components: {
    VChart,
  },
  data() {
    return {
      statuses: [
        { title: 'Responder', value: '065' },
        { title: 'Pendente', value: '040' },
        { title: 'Em andamento', value: '023' },
      ],
      attendeeHeaders: [
        { text: 'Atendente', value: 'name' },
        { text: 'Responder', value: 'responder' },
        { text: 'Pendente', value: 'pending' },
        { text: 'Em andamento', value: 'inProgress' },
      ],
      attendeeTickets: [
        { name: 'André Woliz', responder: 3, pending: 4, inProgress: 4 },
        { name: 'Pedro Luiz', responder: 11, pending: 9, inProgress: 2 },
        { name: 'Ricardo Gomes', responder: 8, pending: 1, inProgress: 4 },
        { name: 'Rodrigo Berd', responder: 10, pending: 1, inProgress: 2 },
        { name: 'Maria Helena', responder: 13, pending: 4, inProgress: 3 },
        { name: 'Jackson Rodriguez', responder: 7, pending: 11, inProgress: 1 },
        { name: 'Luiza Alves', responder: 2, pending: 1, inProgress: 2 },
      ],
      monthlyChartOptions: {
        title: {
          text: 'Tickets Mensais',
        },
        tooltip: {},
        xAxis: {
          data: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        },
        yAxis: {},
        series: [
          {
            name: 'Tickets Fechados',
            type: 'bar',
            data: [3840, 4000, 4200, 3800, 3900],
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
/* Estilos personalizados podem ser adicionados aqui */
</style>