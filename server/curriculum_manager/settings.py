from pathlib import Path
from datetime import timedelta
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-di!p&3#+^j3$5hq&q-3b1cjta=-doc^xth!lv3whno!06!y*1)'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'curriculum',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'curriculum_manager.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'curriculum_manager.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {'min_length': 8},
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# URL para os arquivos estáticos
STATIC_URL = '/static/'

# Caminho onde os arquivos estáticos serão coletados para produção
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Diretórios adicionais onde o Django deve procurar por arquivos estáticos
STATICFILES_DIRS = [
    BASE_DIR / 'static',  # Pasta onde você coloca os arquivos estáticos durante o desenvolvimento
]

# Configurações de autenticação simples
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
         'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

# Permitir acesso de localhost:3000
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),  # Tempo de expiração do access token
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),     # Tempo de expiração do refresh token
    'ROTATE_REFRESH_TOKENS': False,                  # Gera um novo refresh token a cada login
    'BLACKLIST_AFTER_ROTATION': True,                # Invalida os refresh tokens antigos
    'UPDATE_LAST_LOGIN': False,                      # Atualiza o campo last_login do usuário

    'ALGORITHM': 'HS256',                            # Algoritmo de criptografia
    'SIGNING_KEY': SECRET_KEY,                       # Chave secreta do Django
    'VERIFYING_KEY': None,                           # Chave pública para verificação (usada em algoritmos assimétricos)
    'AUDIENCE': None,
    'ISSUER': None,

    'AUTH_HEADER_TYPES': ('Bearer',),                # Tipo do header de autenticação
    'USER_ID_FIELD': 'id',                           # Campo usado como identificador do usuário
    'USER_ID_CLAIM': 'user_id',                      # Claim no token que armazena o ID do usuário

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',                              # Identificador único do token

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}