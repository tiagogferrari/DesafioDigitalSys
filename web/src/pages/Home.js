/*
import React, { useEffect, useState } from "react";

const Home = () => {
  const [curriculums, setCurriculums] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/curriculums/")
      .then((response) => response.json())
      .then((data) => setCurriculums(data));
  }, []);

  return (
    <div>
      <h1>Currículos</h1>
      {curriculums.map((curriculum) => (
        <div key={curriculum.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h2>{curriculum.nome}</h2>
          <p><strong>Data de Nascimento:</strong> {curriculum.data_nascimento}</p>
          <p><strong>Gênero:</strong> {curriculum.genero}</p>
          <p><strong>Nacionalidade:</strong> {curriculum.nacionalidade}</p>

          <h3>Contatos</h3>
          <ul>
            {curriculum.contatos.map((contato) => (
              <li key={contato.id}>
                <p><strong>Email:</strong> {contato.email}</p>
                <p><strong>Telefone:</strong> {contato.telefone}</p>
                <p><strong>Endereço:</strong> {contato.endereco}</p>
              </li>
            ))}
          </ul>

          <h3>Experiências</h3>
          <ul>
            {curriculum.experiencias.map((exp) => (
              <li key={exp.id}>
                <p><strong>Cargo:</strong> {exp.cargo}</p>
                <p><strong>Empresa:</strong> {exp.empresa}</p>
                <p>
                  <strong>Período:</strong> {exp.data_inicio} a {exp.data_fim}
                </p>
              </li>
            ))}
          </ul>

          <h3>Formações</h3>
          <ul>
            {curriculum.formacoes.map((formacao) => (
              <li key={formacao.id}>
                <p><strong>Curso:</strong> {formacao.curso}</p>
                <p><strong>Instituição:</strong> {formacao.instituicao}</p>
                <p><strong>Nível:</strong> {formacao.nivel}</p>
                <p>
                  <strong>Período:</strong> {formacao.data_inicio} a {formacao.data_conclusao}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Home;
*/