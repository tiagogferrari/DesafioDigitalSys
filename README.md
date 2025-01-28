# Desafio Técnico - Desenvolvedor <img align="center" alt="Django" src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" style="margin-bottom: 5px;">

<p>
    Desenvolvido por: Tiago Garcez Ferrari  
    <a href="https://www.linkedin.com/in/tiago-garcez-ferrari-783833270/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white&logoWidth=20" alt="LinkedIn" style="margin-left: 10px; display: inline-block; margin-top: 10px;" />
    </a>
</p>

## Descrição do Projeto

Desenvolver um sistema de recrutamento que facilite o processo de contratação, onde os candidatos poderão submeter informações como dados pessoais, contatos, experiência profissional e formação acadêmica. O sistema será usado pela equipe de recrutamento da Pegho para avaliar os candidatos de maneira mais eficiente.

Objetivo principal: Avaliar suas habilidades de desenvolvimento backend com Django, mas também observar a implementação de um frontend funcional.

### Como rodar o projeto

Clonar o repositório
Abrir o mesmo em algum framework (como VsCode)
Abrir um terminal e rodar o comando:
- docker-compose up --build
- Após isso basta acessar http://localhost:3000/ no seu navegador para ver a homepage da aplicação

Observações!

- Fluxo da aplicação -> HomePage -> Reigistro -> Login -> Página de cadastro de currículos (/curriculo)
- Caso você seja um superuser (admin - username: admin; password: admin0907012) você será redirecionado automaticamente para /admin, onde poderá ver todos os currículos cadastrados
- Acesse http://127.0.0.1:8000/admin/ e entre com os mesmos dados passados aqui anteriormente (admin) para ter acesso ao painel de admin do Django

## Tecnologias utilizadas

<div style="display: inline_block"><br/>
    <img align="center" alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" style="margin-bottom: 5px;">
    <img align="center" alt="Python" src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" style="margin-bottom: 5px;">
    <img align="center" alt="React.js" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" style="margin-bottom: 5px;">
    <img align="center" alt="Django" src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" style="margin-bottom: 5px;">
    <img align="center" alt="Django" src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" style="margin-bottom: 5px;">
    <img align="center" alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" style="margin-bottom: 5px;">
    <img align="center" alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" style="margin-bottom: 5px;">
</div>

### Requisitos cumpridos:
- **Backend**:
    - Implementação de uma API em Django para gerenciar currículos.
    - Modelos de banco de dados e CRUD completo para: Dados pessoais; Contato; Experiência profissional; Formação acadêmica.
    - Validações básicas de informações
    - Criação do Django Admin para gerenciamento dos dados cadastrados.

- **Frontend**:
    - Implementação utilizando React.js
    - Permite que o usuário se registre, realize o login e cadastre o seu currículo
    - Estilização simples e agradável ao usuário, mas com foco nas funcionalidades

### Extras (opcionais, mas valorizados) - FEITOS:
- Utilização de Django Rest Framework (DRF) para criar uma API REST.
- Utilização de Docker para containerização da aplicação.
- Implementação de uma autenticação simples para proteger o sistema.
- Estilização básica no frontend com TailwindCSS.

### Diferenciais (não obrigatórios, mas valorizados) - NÃO FEITOS:
- Implementação de testes unitários no backend.
- Implementação de BDD (Behavior-Driven Development) para o backend usando ferramentas como Behave ou Pytest-BDD.

## Plus (boas práticas)
- Código comentado para maior entendimento
- Teste de rotas utilizando postman
