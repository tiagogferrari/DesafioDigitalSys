import React from 'react';
import { Link } from 'react-router-dom';  // Certifique-se de ter o react-router-dom instalado

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 min-h-screen flex flex-col">
      {/* Header */}
      <header className="text-white p-6 text-center">
        <h1 className="text-4xl font-bold">Pegho</h1>
        <p className="mt-2 text-lg">Conectando talentos ao futuro</p>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex flex-col justify-center items-center space-y-6">
        <h2 className="text-2xl text-white">Bem-vindo à Peghooo!</h2>
        <p className="text-white text-center px-6">
          Somos uma empresa especializada em seleção e recrutamento, conectando as melhores oportunidades
          aos talentos certos. Faça login para acessar a nossa plataforma.
        </p>
        
        {/* Login Section */}
        <Link
          to="/login"
          className="bg-yellow-400 text-white py-3 px-6 rounded-full text-xl hover:bg-yellow-500 transition-colors"
        >
          Fazer Login
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2025 Pegho | Todos os direitos reservados.</p>
        <p>Endereço: Rua Exemplo, 123 - Cidade, Estado</p>
        <p>Contato: contato@pegho.com</p>
      </footer>
    </div>
  );
};

export default Home;
