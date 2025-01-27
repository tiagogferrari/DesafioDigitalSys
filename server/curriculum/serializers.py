from rest_framework import serializers
from .models import Curriculum, Contato, Experiencia, Formacao

class ContatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contato
        fields = '__all__'

class ExperienciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiencia
        fields = '__all__'

class FormacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formacao
        fields = '__all__'

class CurriculumSerializer(serializers.ModelSerializer):
    contatos = ContatoSerializer(many=True, read_only=True)
    experiencias = ExperienciaSerializer(many=True, read_only=True)
    formacoes = FormacaoSerializer(many=True, read_only=True)

    class Meta:
        model = Curriculum
        fields = '__all__'
