# Usar a versão LTS mais recente do Node.js
FROM node:22.13.1

# Definir o diretório de trabalho
WORKDIR /app

# Copiar apenas arquivos de dependência inicialmente
COPY package*.json ./

# Instalar dependências de produção
RUN npm install --only=production

# Copiar o restante do código
COPY . .

# Construir os arquivos estáticos (para produção)
RUN npm run build

# Expor a porta
EXPOSE 3000

# Iniciar o servidor para desenvolvimento
CMD ["npm", "start"]
