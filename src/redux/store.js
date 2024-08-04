import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import popoverReducer from '../redux/popover/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popover: popoverReducer,
  },
});
