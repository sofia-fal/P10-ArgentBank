import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Constantes pour les statuts
const STATUS = {
  VOID: 'VOID',
  LOADING: 'LOADING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
};

// État initial
const initialState = {
  status: STATUS.VOID,
  isConnected: false,
  token: localStorage.getItem('token') || null, // Récupérer le token du localStorage
  error: null,
};

// Thunk pour gérer la connexion
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/user/login',
        credentials
      );

      // Accéder au token dans la réponse
      const token = response.data.body.token; // Mise à jour ici pour récupérer le token

      if (token) {
        localStorage.setItem('token', token); // Stocker le token dans le localStorage
        return token; // Retourner le token
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      console.error(
        'Login Error:',
        error.response ? error.response.data : error.message
      ); // Debug: Afficher l'erreur
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: 'An unexpected error occurred' } // Message par défaut
      );
    }
  }
);

// Thunk pour la déconnexion
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token'); // Supprimer le token du localStorage
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null; // Réinitialiser les erreurs
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = STATUS.LOADING; // État de chargement
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED; // Connexion réussie
        state.isConnected = true;
        state.token = action.payload; // Stocker le token
        state.error = null; // Pas d'erreur
      })
      .addCase(login.rejected, (state, action) => {
        state.status = STATUS.FAILED; // Connexion échouée
        state.isConnected = false;
        state.error = action.payload; // Enregistrer l'erreur
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = STATUS.VOID;
        state.isConnected = false;
        state.token = null; // Réinitialiser le token
        state.error = null; // Réinitialiser les erreurs
      });
  },
});

// Exporter les actions
export const { resetError } = authSlice.actions;

// Exporter le reducer
export default authSlice.reducer;
