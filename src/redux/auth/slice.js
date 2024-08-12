import { createSlice } from '@reduxjs/toolkit';

import {
  logIn,
  register,
  setAuthHeader,
  clearAuthHeader,
  logout,
  sendEmail,
  resetPassword
} from './operations';

import { fetchTodayProgress } from '../user/operations.js';

const authInitialState = {
  user: null,
  accessToken: localStorage.getItem('token') || null,
  isLoggedIn: false,
  isRefreshing: false,
  isEmailSending: false,
  emailSent: false,
  emailError: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload;
      // state.user = action.payload.user;
      // setAuthHeader(state.accessToken);
    },
    clearCredentials: state => {
      state.accessToken = null;
      state.user = null;
      clearAuthHeader();
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;

        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(logIn.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.error;
        state.isRefreshing = false;
        state.isLoggedIn = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log('Register Success:', action.payload);
        state.user = action.payload.email;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.error = false;
      })
      .addCase(register.pending, state => {
        state.error = false;
      })
      .addCase(register.rejected, state => {
        state.error = true;
      })
      .addCase(logout.pending, (state, action) => {
        state.accessToken = '';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.accessToken = '';
      })
      .addCase(logout.rejected, (state, action) => {
        state.accessToken = '';
      })
      .addCase(fetchTodayProgress.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(fetchTodayProgress.fulfilled, (state, action) => {
        state.isRefreshing = false;
      })
      .addCase(fetchTodayProgress.rejected, (state, action) => {
        state.isRefreshing = false;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.isEmailSending = false;
        state.emailSent = true;
        state.emailError = null;
      })
      .addCase(sendEmail.pending, state => {
        state.isEmailSending = true;
        state.emailSent = false;
        state.emailError = null;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.isEmailSending = false;
        state.emailSent = false;
        state.emailError = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isRefreshing = true; 
        state.error = null;  
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload || action.error.message;
      })
  },
});

export const { setCredentials, clearCredentials, logoutAction } = authSlice.actions;
export const authReducer = authSlice.reducer;
