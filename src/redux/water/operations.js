import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiClient } from '../auth/operations.js';

export const addWaterAmount = createAsyncThunk(
  'water/addWaterAmount',
  async (waterData, thunkAPI) => {
    try {
      const response = await apiClient.post('/water', waterData);
      return response.data;
    } catch (error) {
      // if (error.response && error.response.status === 401) {
      //   // console.error('Unauthorized: Token may be invalid or expired');
      //   // } else {
      //   //   console.error('Error adding water:', error.response?.data  error.message);
      // }
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteWaterEntry = createAsyncThunk(
  'water/deleteWaterEntry',
  async ({ id }, thunkAPI) => {
    try {
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
    // const state = getState();
    // const token = selectAccessToken(state);
    // setAuthHeader(token);
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
  async ([id, waterData], thunkAPI) => {
    try {
      const { data } = await apiClient.patch(`/water/${id}`, waterData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
