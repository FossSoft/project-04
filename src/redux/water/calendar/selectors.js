// src/redux/water/calendar/selectors.js

export const selectWaterData = state => state.water.waterData;
export const selectMonth = state => state.water.date;
export const selectDate = state => state.water.date;

export const selectIsLoading = state => state.water.isLoading;
export const selectError = state => state.water.error;
