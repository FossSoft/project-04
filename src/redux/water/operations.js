import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://back-end-aquatrack.onrender.com';

// Функція для додавання води
export const addWaterAmount = createAsyncThunk(
  'water/addWaterAmount',
  async (waterData, thunkAPI) => {
    try {
      const { data } = await axios.post('/water', waterData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Функція для оновлення кількості води
export const updateWaterAmount = createAsyncThunk(
  'water/updateWaterAmount',
  async (waterData, thunkAPI) => {
    try {
      const { data } = await axios.put(`/water/${waterData.id}`, waterData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Функція для видалення запису води
export const deleteWaterEntry = createAsyncThunk(
  'water/deleteWaterEntry',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/water/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Функція для отримання даних про воду за день
export const fetchWaterDataByDay = createAsyncThunk(
  'water/fetchWaterDataByDay',
  async (date, thunkAPI) => {
    try {
      const { data } = await axios.get(`/water?date=${date}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
