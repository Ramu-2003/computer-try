import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import AIRules from './pages/AIRules';
import RoomSettings from './pages/RoomSettings';
import Lobby from './pages/Lobby';
import Game from './pages/Game';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/ai-rules" element={<PrivateRoute><AIRules /></PrivateRoute>} />
          <Route path="/room-settings" element={<PrivateRoute><RoomSettings /></PrivateRoute>} />
          <Route path="/lobby/:roomId" element={<PrivateRoute><Lobby /></PrivateRoute>} />
          <Route path="/game/:roomId" element={<PrivateRoute><Game /></PrivateRoute>} />
          
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
