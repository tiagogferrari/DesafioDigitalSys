from rest_framework import viewsets
from .models import Curriculum, Contato, Experiencia, Formacao
from .serializers import CurriculumSerializer, ContatoSerializer, ExperienciaSerializer, FormacaoSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound

class CurriculumViewSet(viewsets.ModelViewSet):
    queryset = Curriculum.objects.all()
    serializer_class = CurriculumSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Associa o currículo ao usuário autenticado
        
    @action(detail=False, methods=['get'])
    def verificar_curriculo(self, request):
        # Verifica se o currículo existe para o usuário logado
        if Curriculum.objects.filter(user=request.user).exists():
            return Response({"detail": "Currículo encontrado."}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Você ainda não tem um currículo cadastrado."}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def meu_curriculo(self, request):
        try:
            # Busca o currículo do usuário logado
            curriculum = Curriculum.objects.get(user=request.user)
            
            # Serializa os dados do currículo e dos relacionamentos
            curriculum_data = CurriculumSerializer(curriculum).data
            contatos = ContatoSerializer(curriculum.contatos.all(), many=True).data
            experiencias = ExperienciaSerializer(curriculum.experiencias.all(), many=True).data
            formacoes = FormacaoSerializer(curriculum.formacoes.all(), many=True).data

            # Retorna todos os dados em uma única resposta
            return Response({
                'curriculum': curriculum_data,
                'contatos': contatos,
                'experiencias': experiencias,
                'formacoes': formacoes,
            })
        except Curriculum.DoesNotExist:
            return Response({"detail": "Currículo não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
class ContatoViewSet(viewsets.ModelViewSet):
    queryset = Contato.objects.all()
    serializer_class = ContatoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        curriculum = Curriculum.objects.get(user=user)  # Obtem o currículo do usuário
        serializer.save(curriculum=curriculum)  # Associa o contato ao currículo

class ExperienciaViewSet(viewsets.ModelViewSet):
    queryset = Experiencia.objects.all()
    serializer_class = ExperienciaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Verifica se a experiência está sendo associada ao currículo correto e ao usuário autenticado
        user = self.request.user
        curriculum = Curriculum.objects.get(user=user)  # Obtem o currículo do usuário
        serializer.save(curriculum=curriculum)  # Associa a experiência ao currículo

class FormacaoViewSet(viewsets.ModelViewSet):
    queryset = Formacao.objects.all()
    serializer_class = FormacaoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        curriculum = Curriculum.objects.get(user=user)  
        serializer.save(curriculum=curriculum)

# View para o registro de usuários
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuário criado com sucesso!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View para obter o token JWT.
class LoginView(APIView):
    def post(self, request):
        user = User.objects.filter(username=request.data.get('username')).first()
        if user and user.check_password(request.data.get('password')):
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'is_superuser': user.is_superuser, 
            })
        return Response({"detail": "Credenciais inválidas!"}, status=status.HTTP_401_UNAUTHORIZED)