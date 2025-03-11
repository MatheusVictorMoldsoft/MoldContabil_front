<template>
  <v-container fluid>
    <v-row dense>
      <!-- Exemplo: linha com gráficos e tabela -->
      <v-col cols="12" md="6">
        <!-- Componente de gráfico de barras, por exemplo -->
        <BarChartAbertoFechado />
      </v-col>
      <v-col cols="12" md="6">
        <!-- Componente de gráfico de linha -->
        <LineChartRepresentation />
      </v-col>
      <v-col cols="12">
        <!-- Tabela de usuários -->
        <UsuariosTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BarChartAbertoFechado from "./components/BarChartAbertoFechado.vue";
import LineChartRepresentation from "./components/LineChartRepresentation.vue";
import UsuariosTable from "./components/UsuariosTable.vue";

export default {
  name: "HomePage",
  components: {
    BarChartAbertoFechado,
    LineChartRepresentation,
    UsuariosTable,
  },
};
</script>
