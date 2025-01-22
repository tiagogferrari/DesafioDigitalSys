from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CurriculumViewSet, ContatoViewSet, ExperienciaViewSet, FormacaoViewSet, RegisterView, LoginView

router = DefaultRouter()
router.register('curriculums', CurriculumViewSet)
router.register('contatos', ContatoViewSet)
router.register('experiencias', ExperienciaViewSet)
router.register('formacoes', FormacaoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
