import { createSlice } from '@reduxjs/toolkit';
import {
  addWaterAmount,
  deleteWaterEntry,
  fetchWaterDataByDay,
  updateWaterAmount,
} from './operations.js';

const initialState = {
  waterData: [],
  date: new Date().toISOString().split('T')[0],
  isLoading: false,
  error: null,
  totalAmount: 0,
  percentageConsumed: 0,
};

const startLoading = state => {
  state.isLoading = true;
  state.error = null;
};

const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    setWaterDay(state, action) {
      state.waterData = action.payload;
    },
    setWaterDate(state, action) {
      state.date = action.payload;
    },
    addWater(state, action) {
      state.waterData.push(action.payload);
    },
    updateWater(state, action) {
      const index = state.waterData.findIndex(
        item => item.id === action.payload.id
      );
      if (index !== -1) {
        state.waterData[index] = action.payload;
      }
    },
    deleteWater(state, action) {
      state.waterData = state.waterData.filter(
        item => item.id !== action.payload
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWaterDataByDay.pending, startLoading)
      .addCase(fetchWaterDataByDay.fulfilled, (state, action) => {
        state.waterData = action.payload.data.waterData;
        state.totalAmount = action.payload.data.totalAmount;
        state.percentageConsumed = action.payload.data.percentageConsumed;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(fetchWaterDataByDay.rejected, setError)
      .addCase(addWaterAmount.pending, startLoading)
      .addCase(updateWaterAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.waterData.findIndex(
          item => item.id === action.payload.id
        );
        if (index !== -1) {
          state.waterData[index] = action.payload;
        }
      })
      .addCase(addWaterAmount.rejected, setError)
      .addCase(updateWaterAmount.pending, startLoading)
      .addCase(updateWaterAmount.rejected, setError)
      .addCase(deleteWaterEntry.pending, startLoading)
      .addCase(addWaterAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterData.push(action.payload.data);
      })
      .addCase(deleteWaterEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterData = state.waterData.filter(
          item => item.id !== action.payload
        );
      })
      .addCase(deleteWaterEntry.rejected, setError);
  },
});


export const { setWaterDay, addWater, updateWater, deleteWater, setWaterDate } =
  waterSlice.actions;

export default waterSlice.reducer;
