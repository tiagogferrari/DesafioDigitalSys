import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './components/Auth';
import Curriculum from './pages/Curriculum';
import Admin from './pages/Admin';

// Componente de rota protegida
const ProtectedRoute = ({ element: Component, isSuperuser, forAdminPage, ...rest }) => {
  // Se for uma tentativa de acessar o /admin e o usuário não for superusuário
  if (forAdminPage) {
    return isSuperuser ? Component : <Navigate to="/" replace />;
  }

  // Se for uma tentativa de acessar o /curriculo e o usuário for superusuário
  return !isSuperuser ? Component : <Navigate to="/admin" replace />;
};

function App() {
  const isSuperuser = localStorage.getItem('is_superuser') === 'true'; // Verifica se o usuário é superusuário

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />

          {/* Protegendo a rota do currículo */}
          <Route
            path="/curriculo"
            element={
              <ProtectedRoute
                element={<Curriculum />}
                isSuperuser={isSuperuser}
                forAdminPage={false} // Passa false para indicar que não é a página de admin
              />
            }
          />

          {/* Protegendo a rota de admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                element={<Admin />}
                isSuperuser={isSuperuser}
                forAdminPage={true} // Passa true para indicar que é a página de admin
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
