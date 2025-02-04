# Generated by Django 5.1.5 on 2025-01-22 14:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Curriculum',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('data_nascimento', models.DateField()),
                ('genero', models.CharField(max_length=100)),
                ('nacionalidade', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Contato',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('telefone', models.CharField(max_length=20)),
                ('endereco', models.CharField(max_length=100)),
                ('curriculum', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contatos', to='curriculum.curriculum')),
            ],
        ),
        migrations.CreateModel(
            name='Experiencia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cargo', models.CharField(max_length=100)),
                ('empresa', models.CharField(max_length=100)),
                ('data_inicio', models.DateField()),
                ('data_fim', models.DateField()),
                ('curriculum', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='experiencias', to='curriculum.curriculum')),
            ],
        ),
        migrations.CreateModel(
            name='Formacao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('curso', models.CharField(max_length=100)),
                ('instituicao', models.CharField(max_length=100)),
                ('nivel', models.CharField(max_length=100)),
                ('data_inicio', models.DateField()),
                ('data_conclusao', models.DateField()),
                ('curriculum', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='formacoes', to='curriculum.curriculum')),
            ],
        ),
    ]
