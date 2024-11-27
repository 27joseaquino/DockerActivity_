# Multistage build com imagem base Alpine
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Executa a aplicação
CMD ["npm", "start"]
