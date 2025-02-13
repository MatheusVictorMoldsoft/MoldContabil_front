<template>
    <v-row>
      <!-- Total Earning -->
      <v-col cols="12" md="4">
        <TotalEarning />
      </v-col>
  
      <!-- Total Order -->
      <v-col cols="12" md="4">
        <TotalOrder />
      </v-col>
  
      <!-- Total Growth -->
      <v-col cols="12" lg="8">
        <TotalGrowth />
      </v-col>
  
      <!-- Popular Stocks -->
      <v-col cols="12" lg="4">
        <PopularStocks />
      </v-col>
    </v-row>
  </template>
  
  <script>
  import TotalEarning from "./components/CardPendente.vue";
  import TotalOrder from "./components/CardStatus.vue";
  import TotalGrowth from "./components/GraphDash.vue";
  import PopularStocks from "./components/PorUsuario.vue";
  
  export default {
    components: {
      TotalEarning,
      TotalOrder,
      TotalGrowth,
      PopularStocks
    }
  };
  </script>
  