# Usar uma imagem oficial do Python
FROM python:3.9-slim-buster

# Atualizar pacotes e instalar ferramentas necessárias
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential && \
    rm -rf /var/lib/apt/lists/*

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Criar um usuário não-root para rodar o container
RUN useradd -m appuser

# Copiar o arquivo de dependências
COPY requirements.txt .

# Atualizar pip e instalar dependências
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copiar o código da aplicação para dentro do container
COPY . .

# Mudar para o usuário não-root
USER appuser

# Expor a porta onde o Django vai rodar
EXPOSE 8000

# Comando para rodar o servidor Django
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "curriculum_manager.wsgi:application"]
