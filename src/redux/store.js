import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import popoverReducer from '../redux/popover/slice';
import modalReducer from '../redux/modal/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popover: popoverReducer,
    modal: modalReducer,
  },
});
