# Usar uma imagem oficial do Python
FROM python:3.9-slim

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o arquivo de dependências para dentro do container
COPY requirements.txt /app/

# Instalar as dependências do projeto (somente quando o requirements.txt mudar)
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o código da aplicação para dentro do container
COPY . /app/

# Expor a porta onde o Django vai rodar
EXPOSE 8000

# Comando para rodar o servidor Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
