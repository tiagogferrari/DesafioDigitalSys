from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),                # Rota do Django Admin
    path('api/', include('curriculum.urls')),       # Inclui as rotas do app curriculum
]
