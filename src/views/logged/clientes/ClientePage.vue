<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="page-header px-6 py-4 rounded-lg">
          <h1 class="text-h4 font-weight-medium">
            Clientes
            <span class="text-body-1 text-medium-emphasis ml-2"></span>
          </h1>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            elevation="1"
            prepend-icon="mdi-plus"
            @click="goToCreate"
            class="text-none px-4"
            rounded
          >
            Adicionar cliente
          </v-btn>
        </div>

        <v-card
          class="mx-4 mt-2 mb-6 rounded-lg"
          elevation="3"
        >
          <v-alert
            v-if="errorMessage"
            type="error"
            variant="tonal"
            icon="mdi-alert-circle"
            border="start"
            closable
            class="mb-0 rounded-0"
            @click:close="errorMessage = null"
          >
            {{ errorMessage }}
          </v-alert>
          
          <v-alert
            v-if="successMessage"
            type="success"
            variant="tonal"
            icon="mdi-check-circle"
            border="start"
            closable
            class="mb-0 rounded-0"
            @click:close="successMessage = null"
          >
            {{ successMessage }}
          </v-alert>

          <v-card-text class="pa-4">
            <v-row class="mb-2">
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="Pesquisar cliente"
                  hide-details
                  density="comfortable"
                  variant="outlined"
                  bg-color="surface"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8" class="d-flex justify-end gap-2">
                <v-btn
                  variant="text"
                  icon="mdi-refresh"
                  @click="fetchClientes"
                  :loading="isLoading"
                  class="ml-2"
                ></v-btn>
                <v-btn
                  variant="text"
                  icon="mdi-filter-variant"
                  class="ml-2"
                ></v-btn>
              </v-col>
            </v-row>

            <v-data-table
              :headers="headers"
              :items="clientes"
              :search="search"
              :loading="isLoading"
              loading-text="Carregando clientes..."
              no-data-text="Nenhum cliente encontrado"
              hover
              class="elevation-1 rounded-lg"
            >
              <!-- Status do cliente -->
              <template v-slot:[`item.ativo`]="{ item }">
                <v-chip
                  :color="item.ativo ? 'success' : 'error'"
                  size="small"
                  class="text-caption"
                  variant="tonal"
                >
                  {{ item.ativo ? 'Ativo' : 'Inativo' }}
                </v-chip>
              </template>

              <!-- Ações -->
              <template v-slot:[`item.acao`]="{ item }">
                <div class="d-flex gap-2">
                  <v-btn
                    variant="text"
                    density="comfortable"
                    icon="mdi-pencil"
                    color="primary"
                    @click="editarCliente(item)"
                    size="small"
                  ></v-btn>
                  <!-- <v-btn
                    variant="text"
                    density="comfortable"
                    icon="mdi-eye"
                    color="info"
                    size="small"
                  ></v-btn> -->
                  <!-- <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="text"
                        density="comfortable"
                        icon="mdi-dots-vertical"
                        v-bind="props"
                        size="small"
                      ></v-btn>
                    </template>
                    <v-list density="compact">
                      <v-list-item @click="toggleClienteStatus(item)">
                        <template v-slot:prepend>
                          <v-icon :icon="item.ativo ? 'mdi-close-circle' : 'mdi-check-circle'"></v-icon>
                        </template>
                        <v-list-item-title>{{ item.ativo ? 'Desativar' : 'Ativar' }}</v-list-item-title>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon color="error">mdi-delete</v-icon>
                        </template>
                        <v-list-item-title class="text-error">Excluir</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu> -->
                </div>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "@/services/apiService";

export default {
  name: "ClientesPage",
  data() {
    return {
      clientes: [],
      search: "",
      isLoading: false,
      errorMessage: null,
      successMessage: null,
      headers: [
        { 
          title: "Nome", 
          align: "start", 
          key: "nome",
          sortable: true,
        },
        { 
          title: "CNPJ", 
          align: "start", 
          key: "cpf_ou_cnpj", 
          sortable: true,
        },
        { 
          title: "Email", 
          align: "start", 
          key: "email",
          sortable: true,
        },
        { 
          title: "Status", 
          align: "center", 
          key: "ativo",
          sortable: true,
        },
        { 
          title: "Ações", 
          align: "center", 
          key: "acao", 
          sortable: false,
        },
      ],
    };
  },
  methods: {
    async fetchClientes() {
      this.isLoading = true;
      try {
        const response = await API.get("/clientes");
        this.clientes = response.data;
        this.isLoading = false;
      } catch (error) {
        this.errorMessage = "Erro ao carregar clientes. Tente novamente.";
        this.isLoading = false;
      }
    },
    editarCliente(cliente) {
      this.$router.push(`/clientes/edit/${cliente.id}`);
    },
    goToCreate() {
      this.$router.push("/clientes/create");
    },
    toggleClienteStatus(cliente) {
      // Implementação para ativar/desativar cliente
      console.log(`Alterando status do cliente ${cliente.nome} para ${!cliente.ativo}`);
      // Aqui você faria uma chamada para API para atualizar o status
    }
  },
  mounted() {
    this.fetchClientes();
  },
};
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--v-primary-lighten-5, #e3f2fd) 0%, var(--v-surface-base, #0a2559) 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

:deep(.v-data-table) {
  box-shadow: none !important;
  border-radius: 8px;
  overflow: hidden;
}

:deep(.v-data-table__tr:hover) {
  background-color: rgba(var(--v-theme-primary), 0.04) !important;
}

:deep(.v-data-table-header) {
  background-color: rgba(var(--v-theme-surface-variant), 0.5);
}

:deep(.v-data-table-header th) {
  font-weight: 600 !important;
  color: rgba(var(--v-theme-on-surface), 0.87) !important;
  text-transform: none;
  letter-spacing: 0;
}

/* Deixa os botões de ação mais discretos até o hover */
:deep(.v-btn.v-btn--density-comfortable) {
  opacity: 0.7;
  transition: opacity 0.2s;
}

:deep(.v-btn.v-btn--density-comfortable:hover) {
  opacity: 1;
}
</style>