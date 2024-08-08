import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const apiClient = axios.create({
  baseURL: 'https://back-end-aquatrack.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  },
});

const setAuthHeader = token => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const getToken = (state) => state.auth.accessToken || localStorage.getItem('token');

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue('Unable to get current user');
    }
    try {
      setAuthHeader(token)
      const response = await apiClient.get('/user/');
      console.log(response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async (formData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue('Unable to get current user');
    }
    try {
      setAuthHeader(token);
      const response = await apiClient.patch('/user/update', formData);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  'user/updateUserAvatar',
  async (formData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = getToken(state);

    if (!token) {
      return thunkAPI.rejectWithValue('Unable to update avatar');
    }
    try {
      setAuthHeader(token);
      const response = await apiClient.patch('/user/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchWaterDataByDay = createAsyncThunk(
  'user/fetchWaterDataByDay',
  async (date, thunkAPI) => {
    try {
      const response = await apiClient.get(`/water/day?date=${date}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addWaterAmount = createAsyncThunk(
  'user/addWaterAmount',
  async (waterData, thunkAPI) => {
    try {
      const response = await apiClient.post('/water', waterData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateWaterAmount = createAsyncThunk(
  'user/updateWaterAmount',
  async ({ id, waterData }, thunkAPI) => {
    try {
      const response = await apiClient.patch(`/water/${id}`, waterData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteWaterEntry = createAsyncThunk(
  'user/deleteWaterEntry',
  async (id, thunkAPI) => {
    try {
      await apiClient.delete(`/water/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
