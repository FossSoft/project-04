import { configureStore } from '@reduxjs/toolkit';
import waterReducer from './water/slice';

export const store = configureStore({
  reducer: {
    water: waterReducer,
  },
})
