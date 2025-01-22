from rest_framework import viewsets
from .models import Curriculum, Contato, Experiencia, Formacao
from .serializers import CurriculumSerializer, ContatoSerializer, ExperienciaSerializer, FormacaoSerializer
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers

class CurriculumViewSet(viewsets.ModelViewSet):
    queryset = Curriculum.objects.all()
    serializer_class = CurriculumSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Associar o currículo ao usuário autenticado

class ContatoViewSet(viewsets.ModelViewSet):
    queryset = Contato.objects.all()
    serializer_class = ContatoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Certificar que o contato está sendo associado ao currículo correto e ao usuário autenticado
        user = self.request.user
        curriculum = Curriculum.objects.get(user=user)  # Obter o currículo do usuário
        serializer.save(curriculum=curriculum)  # Associar o contato ao currículo

class ExperienciaViewSet(viewsets.ModelViewSet):
    queryset = Experiencia.objects.all()
    serializer_class = ExperienciaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Certificar que a experiência está sendo associada ao currículo correto e ao usuário autenticado
        user = self.request.user
        curriculum = Curriculum.objects.get(user=user)  # Obter o currículo do usuário
        serializer.save(curriculum=curriculum)  # Associar a experiência ao currículo

class FormacaoViewSet(viewsets.ModelViewSet):
    queryset = Formacao.objects.all()
    serializer_class = FormacaoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Certificar que a formação está sendo associada ao currículo correto e ao usuário autenticado
        user = self.request.user
        curriculum = Curriculum.objects.get(user=user)  # Obter o currículo do usuário
        serializer.save(curriculum=curriculum)  # Associar a formação ao currículo

# Serializer para o Registro do Usuário
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# View para o registro de usuários
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuário criado com sucesso!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View para obter o token JWT
class LoginView(APIView):
    def post(self, request):
        user = User.objects.filter(username=request.data.get('username')).first()
        if user and user.check_password(request.data.get('password')):
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({"detail": "Credenciais inválidas!"}, status=status.HTTP_401_UNAUTHORIZED)