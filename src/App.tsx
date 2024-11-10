import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import Otp from './Pages/Otp';


import PostCreation from './Pages/PostCreation';

import './App.css';
import PostPage from './PostPage';
import NewPasswordPage from './Pages/NewPasswordPage';
import MyPosts from './Pages/MyPosts';


const App: React.FC = () => {
  const [username, setUsername] = useState('User123'); // Example username state
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-page" element={<Otp />} />
          <Route path="/post-creation" element={<PostCreation username={username} />} />
          <Route path="/post-page" element={<PostPage />} />
          <Route path="/newpassword" element={<NewPasswordPage />} />
          <Route path="/myposts" element={<MyPosts />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
