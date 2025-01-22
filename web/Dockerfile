# Use a versão 18 do Node.js (LTS)
FROM node:22.13.1

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de pacotes para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Expõe a porta
EXPOSE 3000

# Inicia o servidor
CMD ["npm", "start"]
