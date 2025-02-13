<template>
    <v-container>
      <v-card class="mx-auto" max-width="1000">
        <v-card-title class="text-h5 font-weight-bold">
          Enviar Documentos
        </v-card-title>
        <v-card-text>
          <!-- Tabela de Documentos -->
          <v-data-table
            v-model="selectedItems"
            :headers="headers"
            :items="documentos"
            item-value="cnpjCpf"
            show-select
            class="elevation-1"
          >
            <!-- Template personalizado para a coluna "Status" -->
            <template v-slot:[`item.status`]="{ item }">
              <v-chip :color="getStatusColor(item.status)" small>
                {{ item.status }}
              </v-chip>
            </template>
          </v-data-table>
  
          <!-- Botão de Enviar -->
          <v-btn color="primary" class="mt-4" @click="enviarSelecionados">
            Enviar Selecionados
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Cabeçalhos da tabela
        headers: [
          { title: "Cliente", key: "cliente" },
          { title: "CNPJ/CPF", key: "cnpjCpf" },
          { title: "Qtd de Documentos", key: "qtdDocumentos" },
          { title: "Status", key: "status" },
        ],
  
        // Dados da tabela
        documentos: [
          {
            cliente: "Empresa A",
            cnpjCpf: "12.345.678/0001-99",
            qtdDocumentos: 5,
            status: "Pendente",
          },
          {
            cliente: "Empresa B",
            cnpjCpf: "98.765.432/0001-11",
            qtdDocumentos: 3,
            status: "Enviado",
          },
          {
            cliente: "Empresa C",
            cnpjCpf: "123.456.789-00",
            qtdDocumentos: 2,
            status: "Pendente",
          },
          {
            cliente: "Empresa D",
            cnpjCpf: "987.654.321-00",
            qtdDocumentos: 7,
            status: "Enviado",
          },
        ],
  
        // Itens selecionados na tabela
        selectedItems: [],
      };
    },
    methods: {
      // Método para obter a cor do status
      getStatusColor(status) {
        return status === "Enviado" ? "success" : "warning";
      },
  
      // Método para enviar os itens selecionados
      enviarSelecionados() {
        if (this.selectedItems.length === 0) {
          alert("Selecione pelo menos um item para enviar.");
          return;
        }
  
        // Cria um JSON com os CNPJs/CPFs selecionados
        const dadosEnvio = this.selectedItems.map((cnpjCpf) => ({ cnpjCpf }));
  
        console.log("Dados enviados:", dadosEnvio);
        alert("Dados enviados com sucesso! Verifique o console.");
  
        // Limpa a seleção após o envio
        this.selectedItems = [];
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados, se necessário */
  </style>
  