import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import userReducer from './reducers/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, // Réducteur d'authentification
    user: userReducer, // Réducteur d'utilisateur
  },
  devTools: process.env.NODE_ENV !== 'production', // Activation des outils de développement
});

export default store;
