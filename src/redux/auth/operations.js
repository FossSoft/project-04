import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCredentials, clearCredentials } from './slice';

export const apiClient = axios.create({
  // baseURL: 'https://back-end-aquatrack.onrender.com',
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const setAuthHeader = token => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  apiClient.defaults.headers.common.Authorization = '';
};

export const getToken = state => state.auth.accessToken;

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const {
        data: { data: accessToken },
      } = await apiClient.post('/auth/refresh');
      setAuthHeader(accessToken);

      // await store.dispatch(resetTokens(accessToken));
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
      return apiClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      const { accessToken } = response.data;
      setAuthHeader(accessToken);
      thunkAPI.dispatch(setCredentials(response.data));
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await apiClient.post('/auth/login', credentials);
      const { accessToken } = data.data;
      setAuthHeader(accessToken);
      thunkAPI.dispatch(setCredentials(data.data));
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const refreshToken = createAsyncThunk(
//   'auth/refresh',
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await apiClient.post('/auth/refresh');
//       setAuthHeader(data.data.accessToken);
//       thunkAPI.dispatch(setCredentials(data.data));
//       console.log(data.data);
//       return data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await apiClient.post('/auth/logout');
    clearAuthHeader();
    localStorage.clear();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
