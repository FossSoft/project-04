import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://back-end-aquatrack.onrender.com';
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');

      setAuthHeader(token);
      const response = await axios.get('/user');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async (formData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');

      setAuthHeader(token);
      const response = await axios.patch('/user/update', formData);
      // console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// , {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
export const updateUserAvatar = createAsyncThunk(
  'user/updateUserAvatar',
  async (formData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');

      setAuthHeader(token);
      const response = await axios.post('/user/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(formData);

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
      const response = await axios.get(`/water/day?date=${date}`);
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
      const response = await axios.post('/water', waterData);
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
      const response = await axios.patch(`/water/${id}`, waterData);
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
      await axios.delete(`/water/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
