import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';
import { fetchUserProfile } from '../redux/reducers/userSlice'; // Assurez-vous que le chemin est correct

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(''); // État pour les erreurs d'email
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isConnected, status, error } = useSelector((state) => state.auth);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification de l'email avec Regex
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError(''); // Réinitialise l'erreur si l'email est valide
    }

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchUserProfile()); // Appel pour récupérer le profil utilisateur
      navigate('/user/profile'); // Redirection vers la page utilisateur
    }
  }, [isConnected, dispatch, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Email</label>
        <input
          type="text"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && <p className="error">{emailError}</p>}{' '}
        {/* Afficher l'erreur d'email */}
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>

      <button className="sign-in-button" type="submit">
        Sign In
      </button>

      {status === 'LOADING' && <p>Loading...</p>}

      {/* Gérer l'affichage de l'erreur */}
      {error && typeof error === 'object' && error.message && (
        <p className="error">{error.message}</p>
      )}
    </form>
  );
};

export default Login;
