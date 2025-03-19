<template>
  <v-container fluid class="login-container">
    <v-row no-gutters>
      <v-col cols="12" md="7" class="image-section"></v-col>
      <v-col cols="12" md="5" class="form-section">
        <v-card class="elevation-12 login-card">
          <div class="logo-container">
            <img src="/images/logo.png" alt="Logo da Empresa" class="logo" />
          </div>

          <v-toolbar color="#FFFF" dark flat>
            <v-toolbar-title>Criar Conta</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form @submit.prevent="criarConta">
              <v-text-field v-model="nome" label="Nome Completo" type="text" variant="outlined" required></v-text-field>

              <v-text-field v-model="email" label="Email" type="email" variant="outlined" required></v-text-field>

              <v-text-field v-model="senha" label="Senha" type="password" variant="outlined" required></v-text-field>

              <v-text-field v-model="confirmarSenha" label="Confirmar Senha" type="password" variant="outlined"
                required></v-text-field>

              <!-- Campo de UUID -->
              <v-text-field v-model="empresa_id" label="ID da Empresa (UUID)" type="text" variant="outlined"
                required></v-text-field>

              <v-checkbox v-model="aceitarTermos" label="Aceito os termos e condições" required></v-checkbox>

              <v-btn type="submit" color="secondary" block :loading="loading">
                Criar Conta
              </v-btn>
            </v-form>

            <v-alert v-if="error" type="error" class="mt-3">{{ error }}</v-alert>

            <div class="mt-4 text-center">
              Já tem uma conta?
              <v-btn variant="text" color="secondary" @click="$router.push('/login')">
                Faça Login
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { authService } from '@/services/authService';

export default {
  data() {
    return {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      // 'empresa_id' é UUID no backend
      empresa_id: "",
      aceitarTermos: false,
      loading: false,
      error: null,
    };
  },
  methods: {
    async criarConta() {
      if (!this.aceitarTermos) {
        this.error = "Você precisa aceitar os termos.";
        return;
      }

      if (this.senha !== this.confirmarSenha) {
        this.error = "Senhas não coincidem!";
        return;
      }

      // Validação UUID mais segura
      const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
      if (!uuidRegex.test(this.empresa_id)) {
        this.error = "UUID inválido para empresa.";
        return;
      }

      console.log("Enviando dados para API:", {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        empresa_id: this.empresa_id,
      });

      try {
        this.loading = true;
        await authService.register(
          this.nome,
          this.email,
          this.senha,
          this.empresa_id
        );
        alert("Conta criada com sucesso!");
        this.$router.push('/login');
      } catch (error) {
        console.error("Erro ao criar conta:", error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

  },
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  margin: 0;
  padding: 0;
}

.image-section {
  background: url('/public/images/login_bg.jpg') center center/cover no-repeat;
  height: 100vh;
}

.form-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  margin-top: 5%;
  max-width: 150px;
  max-height: 150px;
  width: auto;
  height: auto;
}

/* Responsividade */
@media (max-width: 960px) {
  .image-section {
    height: 40vh;
  }

  .form-section {
    height: 60vh;
  }
}

@media (max-width: 600px) {
  .image-section {
    height: 30vh;
  }

  .form-section {
    height: 70vh;
  }
}
</style>
