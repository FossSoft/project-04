import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectAccessToken } from '../auth/selectors.js';
import { apiClient } from '../auth/operations.js';

const setAuthHeader = (token) => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const addWaterAmount = createAsyncThunk(
  'water/addWaterAmount',
  async ([waterData, token], thunkAPI) => {
    try {
      setAuthHeader(token);
      const response = await apiClient.post('/water', waterData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteWaterEntry = createAsyncThunk(
  'water/deleteWaterEntry',
  async ({ id, token }, thunkAPI) => {
    try {
      setAuthHeader(token);
      await apiClient.delete(`/water/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchWaterDataByDay = createAsyncThunk(
  'water/fetchWaterDataByDay',
  async ({ date }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = selectAccessToken(state);
    setAuthHeader(token);
    try {
      const response = await apiClient.get(`/water/day/${date}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateWaterAmount = createAsyncThunk(
  'water/updateWaterAmount',
  async ([id, waterData, token], thunkAPI) => {
    try {
      setAuthHeader(token);
      const { data } = await apiClient.patch(`/water/${id}`, waterData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
