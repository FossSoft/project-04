import { createSlice } from '@reduxjs/toolkit';
import {
  addWaterAmount,
  deleteWaterEntry,
  fetchUserInfo,
  fetchWaterDataByDay,
  updateUserAvatar,
  updateUserInfo,
  updateWaterAmount,
} from './operations.js';

const initialState = {
  _id: '',
  userId: '',
  avatar: '',
  gender: '',
  name: '',
  email: '',
  weight: 0,
  activityTime: '',
  dailyNorma: 0,
  waterData: [],
  monthlyWaterData: {
    date: '',
    data: [],
  },
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserInfo.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.gender = action.payload.gender;
        state.email = action.payload.email;
        state.weight = action.payload.weight;
        state.activityTime = action.payload.activityTime;
        state.dailyNorma = action.payload.dailyNorma;
        state.avatar = action.payload.avatar;
        state.name = action.payload.name;
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
        state.isLoggedIn = true;
        state.isLoading = false;
        state.gender = action.payload.gender;
        state.email = action.payload.email;
        state.weight = action.payload.weight;
        state.activeParticipationTime = action.payload.activityTime;
        state.dailyNorma = action.payload.dailyNorma;

        state.name = action.payload.name;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserAvatar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatar = action.payload.avatar;
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
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
