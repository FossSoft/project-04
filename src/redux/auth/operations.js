import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
<<<<<<< Updated upstream
import { setCredentials, clearCredentials } from './slice';
=======
import { setCredentials, logoutAction, clearCredentials } from './slice';
>>>>>>> Stashed changes

export const apiClient = axios.create({
  baseURL: 'https://back-end-aquatrack.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
});

const setAuthHeader = token => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  apiClient.defaults.headers.common.Authorization = '';
}

export const setupAxiosInterceptors = (store) => {
  apiClient.interceptors.request.use(
    (config) => {
      const { auth } = store.getState();
      if (auth.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response, config } = error;

      if (response.status === 401 && !config.__isRetryRequest) {
        config.__isRetryRequest = true;

        try {
          await store.dispatch(refreshToken()).unwrap();
          const { auth } = store.getState();
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
          return apiClient(config);
        } catch (refreshError) {
          store.dispatch(clearCredentials());
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
      const {accessToken} = response.data;
      setAuthHeader(accessToken);
      thunkAPI.dispatch(setCredentials(response.data));
      return response.data;
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

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
   try {
    const { data }  = await apiClient.get('/user/refresh');
    thunkAPI.dispatch(setCredentials(data.data));
    console.log(data.data)
    return data;
   } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
   }
  }
);


export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await apiClient.post('/auth/logout');
    clearAuthHeader();
    localStorage.clear();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
