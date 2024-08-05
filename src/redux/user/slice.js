import { createSlice } from '@reduxjs/toolkit';
import { logIn } from '../../redux/auth/operations.js';
import {
  addWaterAmount,
  deleteWaterEntry,
  fetchUserInfo,
  fetchWaterDataByDay,
  updateUserInfo,
  updateWaterAmount,
} from './operations.js';

const initialState = {
  userId: '',
  avatar: '',
  gender: '',
  name: '',
  email: '',
  weight: 0,
  activeParticipationTime: '',
  waterToDrink: 0,
  waterData: [],
  monthlyWaterData: {
    date: '',
    data: [],
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.userId = action.payload.data.userId;
      })
      .addCase(fetchUserInfo.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gender = action.payload.gender;
        state.email = action.payload.email;
        state.weight = action.payload.weight;
        state.activeParticipationTime = action.payload.activityTime;
        state.waterToDrink = action.payload.dailyNorma;
        state.avatar = action.payload.avatar;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserInfo.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gender = action.payload.gender;
        state.email = action.payload.email;
        state.weight = action.payload.weight;
        state.activeParticipationTime = action.payload.activityTime;
        state.waterToDrink = action.payload.dailyNorma;
        state.avatar = action.payload.avatar;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchWaterDataByDay.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWaterDataByDay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterData = action.payload.waterData;
      })
      .addCase(fetchWaterDataByDay.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addWaterAmount.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addWaterAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterData.push(action.payload);
      })
      .addCase(addWaterAmount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateWaterAmount.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateWaterAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.waterData.findIndex(
          item => item._id === action.payload._id
        );
        if (index !== -1) {
          state.waterData[index] = action.payload;
        }
      })
      .addCase(updateWaterAmount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteWaterEntry.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteWaterEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterData = state.waterData.filter(
          item => item._id !== action.payload
        );
      })
      .addCase(deleteWaterEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;