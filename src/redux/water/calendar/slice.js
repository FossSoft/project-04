// redux/water/calendar/slice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchWaterData } from './operations';

const waterMonthSlice = createSlice({
  name: 'water',
  initialState: {
    waterData: [],
    date: new Date().toISOString().split('T')[0],
    isLoading: false,
    error: null,
    totalAmount: 0,
    percentageConsumed: 0,
  },
  reducers: {
    upMonth(state) {
      const currentDate = new Date(state.date);
      currentDate.setMonth(currentDate.getMonth() + 1);
      state.date = currentDate.toISOString().split('T')[0];
    },
    downMonth(state) {
      const currentDate = new Date(state.date);
      currentDate.setMonth(currentDate.getMonth() - 1);
      state.date = currentDate.toISOString().split('T')[0]; //2024-08
    },
    setDate(state, action) {
      state.date = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWaterData.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWaterData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterData = action.payload.data.records || [];
      })
      .addCase(fetchWaterData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { upMonth, downMonth, setDate } = waterMonthSlice.actions;

export default waterMonthSlice.reducer;
