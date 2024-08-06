import { createSlice } from '@reduxjs/toolkit';
import {
  addWaterAmount,
  deleteWaterEntry,
  fetchWaterDataByDay,
  updateWaterAmount,
} from './operations.js';

const initialState = {
  waterDay: [],
  date: new Date().toISOString(),// видалити пізніше

  isLoading: false,
  error: null,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    setWaterDay(state, action) {
      state.waterDay = action.payload;
    },
    addWater(state, action) {
      state.waterDay.push(action.payload);
    },
    updateWater(state, action) {
      const index = state.waterDay.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.waterDay[index] = action.payload;
      }
    },
    deleteWater(state, action) {
      state.waterDay = state.waterDay.filter(item => item._id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWaterDataByDay.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWaterDataByDay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterDay = action.payload.waterData;
      })
      .addCase(fetchWaterDataByDay.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addWaterAmount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addWaterAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterDay.push(action.payload);
      })
      .addCase(addWaterAmount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateWaterAmount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateWaterAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.waterDay.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.waterDay[index] = action.payload;
        }
      })
      .addCase(updateWaterAmount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteWaterEntry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteWaterEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterDay = state.waterDay.filter(item => item._id !== action.payload);
      })
      .addCase(deleteWaterEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setWaterDay, addWater, updateWater, deleteWater } = waterSlice.actions;

export default waterSlice.reducer;
