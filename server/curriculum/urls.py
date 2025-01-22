from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CurriculumViewSet, ContatoViewSet, ExperienciaViewSet, FormacaoViewSet

router = DefaultRouter()
router.register('curriculums', CurriculumViewSet)
router.register('contatos', ContatoViewSet)
router.register('experiencias', ExperienciaViewSet)
router.register('formacoes', FormacaoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
