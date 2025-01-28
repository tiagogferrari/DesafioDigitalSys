from rest_framework import serializers
from django.core.validators import RegexValidator, MinLengthValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from datetime import date, datetime
from django.contrib.auth.models import User
from .models import Curriculum, Contato, Experiencia, Formacao

class ContatoSerializer(serializers.ModelSerializer):
    
    # Validação para o formato do telefone
    telefone = serializers.CharField(
        validators=[RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Formato inválido de telefone.")]
    )

    # Validação para o formato do e-mail
    email = serializers.EmailField(
        error_messages={'invalid': 'Por favor, insira um e-mail válido.'}
    )
    
    # Validação para o campo de endereço (mínimo de 10 caracteres)
    endereco = serializers.CharField(
        validators=[MinLengthValidator(10, "O endereço deve ter pelo menos 10 caracteres.")]
    )
    
    class Meta:
        model = Contato
        fields = '__all__'
        extra_kwargs = {
            'curriculum': {'required': False}
        }

class ExperienciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiencia
        fields = '__all__'
        extra_kwargs = {
            'curriculum': {'required': False}
        }
    
    def validate_empresa(self, value):
        """Validação para garantir que o campo 'empresa' tenha pelo menos 5 caracteres."""
        if len(value) < 5:
            raise serializers.ValidationError("O nome da empresa deve ter no mínimo 5 caracteres.")
        return value

    def validate_cargo(self, value):
        """Validação para garantir que o campo 'cargo' tenha pelo menos 5 caracteres."""
        if len(value) < 5:
            raise serializers.ValidationError("O nome do cargo deve ter no mínimo 5 caracteres.")
        return value

    def validate_data_inicio(self, value):
        """Validação para garantir que a data de início seja anterior à data atual."""
        today = date.today()
        if value > today:
            raise serializers.ValidationError("A data de início não pode ser posterior à data atual.")
        return value

    def validate_data_fim(self, value):
        """Validação para garantir que a data de término seja posterior à data de início."""
        data_inicio = self.initial_data.get('data_inicio')  # Obtém a data de início enviada

        # Verifica se a data de início foi fornecida e se está no formato correto
        if data_inicio:
            data_inicio = datetime.strptime(data_inicio, '%Y-%m-%d').date()  # Converte para datetime.date
        
        # Converte a data de término para datetime.date
        if isinstance(value, str):
            value = datetime.strptime(value, '%Y-%m-%d').date()

        if data_inicio and value and value < data_inicio:
            raise serializers.ValidationError("A data de término não pode ser anterior à data de início.")
        
        return value 

class FormacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formacao
        fields = '__all__'
        extra_kwargs = {
            'curriculum': {'required': False}
        }

    def validate_instituicao(self, value):
        """Validação para garantir que o nome da instituição tenha pelo menos 3 caracteres."""
        if len(value) < 3:
            raise serializers.ValidationError("O nome da instituição deve ter no mínimo 3 caracteres.")
        return value

    def validate_curso(self, value):
        """Validação para garantir que o nome do curso tenha pelo menos 5 caracteres."""
        if len(value) < 5:
            raise serializers.ValidationError("O nome do curso deve ter no mínimo 5 caracteres.")
        return value

    def validate_data_inicio(self, value):
        """Validação para garantir que a data de início seja anterior à data atual."""
        today = datetime.today().date()
        if value > today:
            raise serializers.ValidationError("A data de início não pode ser posterior à data atual.")
        return value

    def validate_data_fim(self, value):
        """Validação para garantir que a data de término seja posterior à data de início."""
        data_inicio = self.initial_data.get('data_inicio')  # Obtém a data de início enviada

        # Converte a data de início para datetime.date
        if isinstance(data_inicio, str):
            data_inicio = datetime.strptime(data_inicio, '%Y-%m-%d').date()

        # Converte a data de término para datetime.date
        if isinstance(value, str):
            value = datetime.strptime(value, '%Y-%m-%d').date()

        # Verifica se a data de término é posterior à data de início
        if data_inicio and value and value < data_inicio:
            raise serializers.ValidationError("A data de término não pode ser anterior à data de início.")
        
        # Verifica se a data de início não está no futuro
        today = datetime.today().date()
        if data_inicio and data_inicio > today:
            raise serializers.ValidationError("A data de início não pode ser posterior à data atual.")
        
        return value

class CurriculumSerializer(serializers.ModelSerializer):
    contatos = ContatoSerializer(many=True, read_only=True)
    experiencias = ExperienciaSerializer(many=True, read_only=True)
    formacoes = FormacaoSerializer(many=True, read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Curriculum
        fields = '__all__'
        
    def validate_nome(self, value):
        """Validação para o nome, garantindo um comprimento mínimo de caracteres."""
        if len(value) < 5:
            raise serializers.ValidationError("O nome deve ter no mínimo 3 caracteres.")
        return value    

    def validate_data_nascimento(self, value):
        """Validação para garantir que a idade mínima seja de 16 anos."""
        today = date.today()
        idade = today.year - value.year - ((today.month, today.day) < (value.month, value.day))
        if idade < 16:
            raise serializers.ValidationError("A idade mínima deve ser de 16 anos.")
        return value    
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'confirm_password', 'email']

    def validate(self, data):
        """Verifica se as senhas coincidem e valida a força da senha"""
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "As senhas não coincidem."})

        try:
            # Valida a força da senha
            validate_password(data['password'])
        except ValidationError as e:
            raise serializers.ValidationError({"password": e.messages})

        return data

    def create(self, validated_data):
        # Remove o campo confirm_password do validated_data antes de criar o usuário
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user