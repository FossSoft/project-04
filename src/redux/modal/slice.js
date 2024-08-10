import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpenModalSettings: false,
    isOpenModalLogout: false,
    isOpenModalAddWater: false,
  },
  reducers: {
    openModalSettings: (state, action) => {
      state.isOpenModalSettings = true;
    },
    closeModalSettings: (state, action) => {
      state.isOpenModalSettings = false;
    },

    openModalLogout: (state, action) => {
      state.isOpenModalLogout = true;
    },
    closeModalLogout: (state, action) => {
      state.isOpenModalLogout = false;
    },
    openModalAddWater: (state, action) => {
      state.isOpenModalAddWater = true;
    },
    closeModalAddWater: (state, action) => {
      state.isOpenModalAddWater = false;
    },
  },
});

export const {
  openModalSettings,
  closeModalSettings,
  openModalLogout,
  closeModalLogout,
  openModalAddWater,
  closeModalAddWater,
} = modalSlice.actions;

export default modalSlice.reducer;
