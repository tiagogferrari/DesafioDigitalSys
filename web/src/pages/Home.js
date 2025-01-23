import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import recruitment from '../images/recruitment.png';
import Auth from '../components/Auth'; // Importando o componente Auth

const Home = () => {
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar a exibição do popup

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-300 min-h-screen flex flex-col">
      {/* Header */}
      <header className="text-white p-6 text-center relative">
        <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playwrite IN', serif", fontWeight: 600 }}>
          Pegho
        </h1>
        <button
        type='button'
          onClick={() => setShowPopup(true)} // Abre o popup ao clicar no ícone
          className="text-white py-2 px-4 absolute top-4 right-6 flex items-center space-x-2"
        >
          <AccountCircleIcon style={{ fontSize: 40 }} /> {/* Ícone de login */}
        </button>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex justify-center items-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl w-full">
          <div className="text-center md:text-left space-y-6">
            <h2 className="text-5xl font-extrabold text-blue-800 leading-tight">
              Encontre o seu próximo desafio!
            </h2>
            <p className="text-lg text-blue-800 md:text-xl font-semibold">
              Crie seu perfil e encontre as melhores oportunidades de trabalho. A Pegho conecta talentos com as melhores empresas.
            </p>
            <div className="mt-8"> 
              <Link
                onClick={() => setShowPopup(true)}
                className="className= bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold transition hover:from-blue-700 hover:to-blue-500" style={{ fontFamily: "Roboto Flex, serif", fontWeight: 300 }}
              >
                Cadastrar currículo
              </Link>
            </div>
          </div>
          {/* Imagem */}
          <div className="relative w-full flex justify-center">
            <img
              src={recruitment}
              alt="Imagem ilustrativa"
              className="rounded-lg shadow-2xl w-full md:max-w-lg"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="bg-gradient-to-r from-blue-600 to-blue-300 text-white text-center p-4"
        style={{ fontFamily: "Roboto Flex, serif", fontWeight: 400 }}
      >
        <p>&copy; 2025 Pegho | Todos os direitos reservados.</p>
      </footer>

      {/* Exibe o popup se o estado showPopup for verdadeiro */}
      {showPopup && <Auth setShowPopup={setShowPopup} />}
    </div>
  );
};

export default Home;
