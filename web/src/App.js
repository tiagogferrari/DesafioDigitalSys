import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define a rota principal */}
          <Route path="/" element={<Home />} />
          {/* Rota para Curriculums */}
          <Route path="/login" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
