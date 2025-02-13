<template>
    <v-container>
        <v-card class="mx-auto" max-width="800">
            <v-card-title class="text-h5 font-weight-bold">
                Meu Perfil
            </v-card-title>
            <v-card-subtitle class="text-subtitle-1">
                Atualize suas informações pessoais.
            </v-card-subtitle>
            <v-card-text>
                <v-form @submit.prevent="salvarPerfil">
                    <!-- Foto de Perfil -->
                    <v-row class="mb-4">
                        <v-col cols="12" class="text-center">
                            <v-avatar size="120" class="mb-2">
                                <v-img :src="fotoPerfil" alt="Foto de Perfil"></v-img>
                            </v-avatar>
                            <v-file-input v-model="novaFoto" label="Alterar Foto" variant="outlined" accept="image/*"
                                :rules="fotoRules" prepend-icon="mdi-camera" @change="atualizarFoto"></v-file-input>
                        </v-col>
                    </v-row>

                    <!-- Campo Nome -->
                    <v-text-field v-model="form.nome" label="Nome" variant="outlined"
                        :rules="[(v) => !!v || 'O nome é obrigatório']" required></v-text-field>

                    <!-- Campo E-mail -->
                    <v-text-field v-model="form.email" label="E-mail" variant="outlined" :rules="[
                        (v) => !!v || 'O e-mail é obrigatório',
                        (v) => /.+@.+\..+/.test(v) || 'E-mail inválido',
                    ]" required></v-text-field>

                    <!-- Campo Telefone -->
                    <v-text-field v-model="form.telefone" label="Telefone" variant="outlined"
                        :rules="[(v) => !!v || 'O telefone é obrigatório']" required></v-text-field>

                    <!-- Botão de Salvar -->
                    <v-btn type="submit" color="primary" block class="mt-4">
                        Salvar Alterações
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            // Dados do formulário
            form: {
                nome: "João Silva",
                email: "joao.silva@exemplo.com",
                telefone: "(11) 99999-9999",
            },

            // Foto de perfil atual
            fotoPerfil: "https://via.placeholder.com/150", // URL da foto de perfil

            // Nova foto de perfil (upload)
            novaFoto: null,

            // Regras de validação para a foto
            fotoRules: [
                (value) => {
                    return (
                        !value ||
                        !value.length ||
                        value[0].size < 5000000 || // Limite de 5MB
                        "A foto deve ter menos de 5MB!"
                    );
                },
                (value) => {
                    return (
                        !value ||
                        !value.length ||
                        ["image/jpeg", "image/png", "image/gif"].includes(value[0].type) ||
                        "Apenas imagens JPEG, PNG ou GIF são permitidas!"
                    );
                },
            ],
        };
    },
    methods: {
        // Método para atualizar a foto de perfil
        atualizarFoto() {
            if (this.novaFoto && this.novaFoto.length > 0) {
                const file = this.novaFoto[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.fotoPerfil = e.target.result; // Atualiza a foto de perfil
                };
                reader.readAsDataURL(file);
            }
        },

        // Método para salvar o perfil
        salvarPerfil() {
            if (this.form.nome && this.form.email && this.form.telefone) {
                console.log("Perfil salvo:", this.form);

                // Simulação de envio de dados
                const dadosPerfil = {
                    nome: this.form.nome,
                    email: this.form.email,
                    telefone: this.form.telefone,
                    fotoPerfil: this.fotoPerfil,
                };

                alert("Perfil atualizado com sucesso!");
                console.log("Dados enviados:", dadosPerfil);
            } else {
                alert("Preencha todos os campos obrigatórios.");
            }
        },
    },
};
</script>

<style scoped>
/* Estilos personalizados, se necessário */
</style>