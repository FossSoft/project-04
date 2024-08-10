// redux/water/calendar/operations.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://back-end-aquatrack.onrender.com';

export const fetchWaterData = createAsyncThunk(
  'water/fetchWaterData',
  async (date, thunkAPI) => {
    try {
      const response = await axios.get(`/water/month/${date}`);
      console.log(response.data.data.records)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
