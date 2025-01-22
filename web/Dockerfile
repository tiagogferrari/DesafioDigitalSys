# Imagem base com Node.js
FROM node:16

# Diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependências do React
COPY package.json package-lock.json /app/

# Instala as dependências do React
RUN npm install

# Copia o código da aplicação React
COPY . /app/

# Expõe a porta em que o React vai rodar
EXPOSE 3000

# Define o comando para rodar o servidor de desenvolvimento React
CMD ["npm", "start"]
