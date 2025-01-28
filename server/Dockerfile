FROM python:3.9-slim-buster

# Atualiza pacotes e instala ferramentas necessárias
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential && \
    rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Cria um usuário não-root para rodar o container
RUN useradd -m appuser

# Copia o arquivo de dependências
COPY requirements.txt .

# Atualiza pip e instala dependências
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copia o código da aplicação para dentro do container
COPY . .

# Muda para o usuário não-root
USER appuser

# Expõe a porta onde o Django vai rodar
EXPOSE 8000

# Comando para rodar o servidor Django
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "curriculum_manager.wsgi:application"]
