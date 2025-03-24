import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MentorProfile from './pages/MentorProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentor/:username" element={<MentorProfile />} />
      </Routes>
    </Router>
  );
}

export default App;