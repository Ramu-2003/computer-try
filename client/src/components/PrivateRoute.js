import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-white text-2xl">Loading...</div>
    </div>;
  }

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
