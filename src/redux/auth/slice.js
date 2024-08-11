import { createSlice } from '@reduxjs/toolkit';
import { logIn, register, refreshToken, logout } from './operations';

const authInitialState = {
  user: null,
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
      state.error = null;
    },
    clearCredentials: state => {
      state.user = null;
      state.accessToken = null;
      state.isLoggedIn = false;
      state.error = null;
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
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log('Register Success:', action.payload);
        state.user = action.payload.user;
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
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.error;
        state.isRefreshing = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.accessToken = '';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.accessToken = '';
      })
      .addCase(logout.rejected, (state, action) => {
        state.accessToken = '';
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;
