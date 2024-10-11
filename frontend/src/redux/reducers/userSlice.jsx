import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const response = await axios.get('http://localhost:3001/api/v1/user/profile', {
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    });
    return response.data.body; // Récupérer les données du profil utilisateur
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Thunk pour mettre à jour le nom d'utilisateur
export const updateUsername = createAsyncThunk('user/updateUsername', async (newUsername, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const response = await axios.put('http://localhost:3001/api/v1/user/profile', { userName: newUsername }, {
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    });
    return response.data.body; // Retourner les données mises à jour
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: 'VOID',
    userData: {},
    error: null,
  },
  reducers: {
    // Cette action sera appelée lorsque nous recevrons le nom d'utilisateur mis à jour
    updateUsername: (state, action) => {
      state.userData.userName = action.payload; // Mettre à jour le nom d'utilisateur dans l'état
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED';
        state.userData = action.payload; // Stocker les données de l'utilisateur
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.payload;
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.userData.userName = action.payload.userName; // Assurez-vous que le champ est correct
      });
  },
  
});


export default userSlice.reducer;
