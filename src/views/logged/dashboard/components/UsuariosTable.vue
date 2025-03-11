<template>
  <v-data-table
    :headers="headers"
    :items="usuarios"
    class="elevation-1"
    :items-per-page="5"
  >
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template #item.nome="{ item }">
      <v-avatar size="32" class="mr-2">
        <v-icon>tabler-user</v-icon>
      </v-avatar>
      {{ item.nome }}
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "UsuariosTable",
  data() {
    return {
      headers: [
        { text: "Usuário", value: "nome" },
        { text: "Solicitações", value: "solicitacoes" },
      ],
      usuarios: [
        { nome: "João Silva", solicitacoes: 35 },
        { nome: "Maria Oliveira", solicitacoes: 30 },
        { nome: "Pedro Souza", solicitacoes: 25 },
        { nome: "Ana Costa", solicitacoes: 20 },
        { nome: "Carlos Lima", solicitacoes: 15 },
      ],
    };
  },
};
</script>
