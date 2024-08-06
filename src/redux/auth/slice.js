import { createSlice } from '@reduxjs/toolkit';
import { logIn, refreshUser, register } from './operations';

const authInitialState = {
  user: {},
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.token = action.payload.token || null;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(logIn.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(logIn.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = false;
      })
      .addCase(register.pending, state => {
        state.error = false;
      })
      .addCase(register.rejected, state => {
        state.error = true;
      });
  },
});

export const authReducer = authSlice.reducer;
