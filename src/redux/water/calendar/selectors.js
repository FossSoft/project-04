// src/redux/water/calendar/selectors.js
export const selectWaterData = state => state.waterMonth.waterData;
export const selectMonth = state => state.waterMonth.date;
export const selectDate = state => state.waterMonth.date;

export const selectIsLoading = state => state.waterMonth.isLoading;
export const selectError = state => state.waterMonth.error;
