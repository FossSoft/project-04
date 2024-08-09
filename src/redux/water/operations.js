
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectAccessToken } from '../auth/selectors.js';
import { apiClient, getToken, setAuthHeader } from '../auth/operations.js';

// axios.defaults.baseURL = 'https://back-end-aquatrack.onrender.com';

// const setAuthHeader = token => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

export const addWaterAmount = createAsyncThunk(
  'water/addWaterAmount',
  async ([waterItem, token], thunkAPI) => {
    try {
      if (token) {
        setAuthHeader(token);
      }
      const { data } = await apiClient.post('/water', waterItem);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateWaterAmount = createAsyncThunk(
  'water/updateWaterAmount',
  async ([id, waterItem, token], thunkAPI) => {
    try {
      if (token) {
        setAuthHeader(token);
      }
      const { data } = await apiClient.patch(`/water/${id}`, waterItem);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteWaterEntry = createAsyncThunk(
  'water/deleteWaterEntry',
  async ({ id, token }, thunkAPI) => {
    try {
      if (token) {
        setAuthHeader(token);
      }
      await apiClient.delete(`/water/${id}`);
      return id;
    } catch (error) {
      // console.error('Error deleting water entry:', error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchWaterDataByDay = createAsyncThunk(
  'water/fetchWaterDataByDay',
  async ({ date }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = getToken(state);
    setAuthHeader(token);
    try {
      const response = await apiClient.get(`/water/day/${date}`);
      return response.data;
    } catch (error) {
      // console.error('Error fetching water data:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
