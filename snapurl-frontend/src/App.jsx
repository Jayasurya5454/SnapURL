import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/logins/Register';
import Login from './components/logins/Login';
import Dashboard from './components/dashboard/Dashboard';
import Result from './components/Result/Result';
function App() {


  return (
    <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  </Router>
);
}

export default App
