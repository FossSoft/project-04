import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../auth/operations.js';

export const fetchWaterData = createAsyncThunk(
  'water/fetchWaterData',
  async (date, thunkAPI) => {
    try {
      const response = await apiClient.get(`/water/month/${date}`);
      console.log(response.data.data.records)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
