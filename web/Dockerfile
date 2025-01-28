# Usar a versão LTS do Node.js (sugiro 18.x ou 20.x para maior compatibilidade com React)
FROM node:20.18.2

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependência
COPY package*.json ./

# Instalar TODAS as dependências (incluindo devDependencies)
RUN npm install

# Copiar o restante do código
COPY . .

# Construir os arquivos estáticos
RUN npm run build

# Expor a porta
EXPOSE 3000

# Iniciar o servidor (para produção, considere usar um servidor estático como `serve`)
CMD ["npm", "start"]