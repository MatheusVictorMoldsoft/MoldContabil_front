# Stage 1: Build
FROM node:16-alpine as build-stage
WORKDIR /app
# Copia os arquivos de dependências (package.json e package-lock.json, se existir)
COPY package*.json ./
RUN npm install
# Copia o restante do código (pasta public, src, etc.)
COPY . .
# Compila a aplicação Vue (gera a pasta "dist")
RUN npm run build

# Stage 2: Serve com Nginx
FROM nginx:stable-alpine as production-stage
# Remove o conteúdo padrão do Nginx (opcional)
RUN rm -rf /usr/share/nginx/html/*
# Copia o build da aplicação do estágio de build para o diretório do Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
