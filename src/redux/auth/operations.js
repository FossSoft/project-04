import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCredentials, logoutAction, clearCredentials } from './slice';

export const apiClient = axios.create({
  baseURL: 'https://back-end-aquatrack.onrender.com',
  // baseURL: 'http://localhost:3001',
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

export const setupAxiosInterceptors = store => {
  apiClient.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await apiClient.post('/auth/refresh');
          const accessToken = res.data.data.accessToken;
          console.log(accessToken);
          // setAuthHeader(accessToken);
          apiClient.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          console.log(originalRequest);
          store.dispatch(setCredentials(accessToken));
          return apiClient(originalRequest);
        } catch (refreshError) {
          // store.dispatch(clearCredentials());
          store.dispatch(logoutAction());
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      const accessToken = response.data.data.accessToken;
      setAuthHeader(accessToken);
      // thunkAPI.dispatch(setCredentials(accessToken));
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
      // thunkAPI.dispatch(setCredentials(accessToken));
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await apiClient.post('/auth/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const sendEmail = createAsyncThunk(
  'auth/request-reset-email',
  async (credentials, thunkAPI) => {
    try {
      const response = await apiClient.post(
        '/auth/request-reset-email',
        credentials
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async(formData, thunkAPI)=>{
    try {
      const response = await apiClient.post('/auth/reset-password',formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
)
