import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Curriculums from './pages/Home';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define a rota principal */}
          <Route path="/" element={<Auth />} />
          {/* Rota para Curriculums */}
          <Route path="/home" element={<Curriculums />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
