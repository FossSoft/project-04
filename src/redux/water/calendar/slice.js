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
      let newMonth = currentDate.getMonth() + 1; // getMonth возвращает значение от 0 до 11

      if (newMonth < 12) {
        currentDate.setMonth(newMonth);
      } else {
        currentDate.setMonth(0); // Переход на январь
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }

      state.date = currentDate.toISOString().split('T')[0];
    },

    downMonth(state) {
      const currentDate = new Date(state.date);
      let newMonth = currentDate.getMonth() - 1;

      if (newMonth >= 0) {
        currentDate.setMonth(newMonth);
      } else {
        currentDate.setMonth(11); // Переход на декабрь
        currentDate.setFullYear(currentDate.getFullYear() - 1);
      }

      state.date = currentDate.toISOString().split('T')[0];
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
