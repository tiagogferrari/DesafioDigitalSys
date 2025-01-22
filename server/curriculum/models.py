from django.db import models

class Curriculum(models.Model):
    nome = models.CharField(max_length=100)
    data_nascimento = models.DateField()
    genero = models.CharField(max_length=100)
    nacionalidade = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Contato(models.Model):
    curriculum = models.ForeignKey(Curriculum, related_name='contatos', on_delete=models.CASCADE)
    email = models.EmailField()
    telefone = models.CharField(max_length=20)
    endereco = models.CharField(max_length=100)

    def __str__(self):
        return self.email

class Experiencia(models.Model):
    curriculum = models.ForeignKey(Curriculum, related_name='experiencias', on_delete=models.CASCADE)
    cargo = models.CharField(max_length=100)
    empresa = models.CharField(max_length=100)
    data_inicio = models.DateField()
    data_fim = models.DateField()

    def __str__(self):
        return f"{self.cargo} - {self.empresa}"

class Formacao(models.Model):
    curriculum = models.ForeignKey(Curriculum, related_name='formacoes', on_delete=models.CASCADE)
    curso = models.CharField(max_length=100)
    instituicao = models.CharField(max_length=100)
    nivel = models.CharField(max_length=100)
    data_inicio = models.DateField()
    data_conclusao = models.DateField()

    def __str__(self):
        return self.curso
