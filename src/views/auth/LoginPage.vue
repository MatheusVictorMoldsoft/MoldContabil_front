<template>
  <v-container fluid class="login-container">
    <v-row no-gutters>
      <!-- Lado da imagem -->
      <v-col cols="12" md="7" class="image-section"></v-col>

      <!-- Lado do formulário -->
      <v-col cols="12" md="5" class="form-section">
        <v-card class="elevation-12 login-card">
          <!-- Logo da empresa -->
          <div class="logo-container">
            <img src="/images/logo.png" alt="Logo da Empresa" class="logo" />
          </div>

          <v-toolbar color="#FFFF" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-alert v-if="error" type="error" class="mt-3 mb-5">{{ error }}</v-alert>
            <v-form @submit.prevent="login">
              <v-text-field v-model="email" label="Email" type="email" variant="outlined" required></v-text-field>

              <v-text-field v-model="password" label="Senha" type="password" variant="outlined" required></v-text-field>

              <v-btn type="submit" color="primary" block :loading="loading">Realizar Acesso</v-btn>
            </v-form>

            <v-btn variant="text" class="mt-2 forgot-password">
              Esqueci minha senha?
            </v-btn>

            <!-- <div class="social-login">
              <p>Acesse sua conta através de suas redes sociais:</p>
              <div class="social-icons">
                <v-icon class="google-icon">mdi-google</v-icon>
                <v-icon class="linkedin-icon">mdi-linkedin</v-icon>
                <v-icon class="qrcode-icon">mdi-qrcode</v-icon>
              </div>
            </div> -->
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="$router.push('/criar-conta')">
              Criar Conta
            </v-btn>
          </v-card-actions>
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
      email: '',
      password: '',
      loading: false,
      error: null,
    };
  },
  methods: {
    async login() {
      this.loading = true;
      this.error = null;
      try {
        const success = await authService.login(this.email, this.password);
        if (success) {
          this.$router.push({ name: 'dashboard' }); // Redireciona para a página correta
        }
      } catch (err) {
        this.error = err;
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

.forgot-password {
  color: #1e88e5;
  text-transform: none;
}

.social-login {
  margin-top: 20px;
  text-align: center;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.google-icon {
  color: #db4437;
}

.linkedin-icon {
  color: #0077b5;
}

.qrcode-icon {
  color: #444;
}

/* Regras de responsividade */
@media (max-width: 960px) {
  .image-section {
    height: 40vh;
    /* Reduz a altura da imagem em telas menores */
  }

  .form-section {
    height: 60vh;
    /* Aumenta a altura do formulário em telas menores */
  }
}

@media (max-width: 600px) {
  .image-section {
    height: 30vh;
    /* Reduz ainda mais a altura da imagem em telas muito pequenas */
  }

  .form-section {
    height: 70vh;
    /* Aumenta a altura do formulário em telas muito pequenas */
  }
}

.logo {
  margin-top: 5%;
  max-width: 150px;
  /* Define a largura máxima da logo */
  max-height: 150px;
  /* Define a altura máxima da logo */
  width: auto;
  /* Mantém a proporção da imagem */
  height: auto;
  /* Mantém a proporção da imagem */
}
</style>