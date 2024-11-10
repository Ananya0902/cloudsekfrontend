import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import Otp from './Pages/Otp';


import PostCreation from './Pages/PostCreation';

import './App.css';
import PostPage from './PostPage';


const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-page" element={<Otp />} />
          <Route path="/post-creation" element={<PostCreation />} />
          <Route path="/post-page" element={<PostPage />} />
          
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
