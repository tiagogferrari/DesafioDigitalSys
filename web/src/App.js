import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './components/Auth';
import Curriculum from './pages/Curriculum';
import Admin from './pages/Admin';

// Componente de rota protegida
const ProtectedRoute = ({ element: Component, isSuperuser, forAdminPage, ...rest }) => {

  if (forAdminPage) {
    return isSuperuser ? Component : <Navigate to="/" replace />;
  }

  return !isSuperuser ? Component : <Navigate to="/admin" replace />;
};

function App() {
  const isSuperuser = localStorage.getItem('is_superuser') === 'true';

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
                forAdminPage={false} 
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
                forAdminPage={true}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
