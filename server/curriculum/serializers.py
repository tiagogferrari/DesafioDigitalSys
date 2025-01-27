from rest_framework import serializers
from .models import Curriculum, Contato, Experiencia, Formacao

class ContatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contato
        fields = '__all__'
        extra_kwargs = {
            'curriculum': {'required': False}  # Torna o campo curriculum opcional
        }

class ExperienciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiencia
        fields = '__all__'
        extra_kwargs = {
            'curriculum': {'required': False}  # Torna o campo curriculum opcional
        }

class FormacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formacao
        fields = '__all__'
        extra_kwargs = {
            'curriculum': {'required': False}  # Torna o campo curriculum opcional
        }

class CurriculumSerializer(serializers.ModelSerializer):
    contatos = ContatoSerializer(many=True, read_only=True)
    experiencias = ExperienciaSerializer(many=True, read_only=True)
    formacoes = FormacaoSerializer(many=True, read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Curriculum
        fields = '__all__'
