import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpenModalSettings: false,
    isOpenModalLogout: false,
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
  },
});

export const {
  openModalSettings,
  closeModalSettings,
  openModalLogout,
  closeModalLogout,
} = modalSlice.actions;

export default modalSlice.reducer;
