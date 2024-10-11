import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isConnected); // Vérification de l'authentification

  // Si l'utilisateur n'est pas authentifié, redirige vers /login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
