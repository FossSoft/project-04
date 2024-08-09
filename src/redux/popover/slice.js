import { createSlice } from '@reduxjs/toolkit';

const popoverSlice = createSlice({
  name: 'popover',
  initialState: {
    width: 0,
    showPopover: false,
    icon: false,
  },
  reducers: {
    togglePopover: (state, action) => {
      state.showPopover = !state.showPopover;
      state.icon = !state.icon;
    },
    hidePopover: (state, action) => {
      state.showPopover = false;
      state.icon = false;
    },

    getCurrentWidthBtn: (state, action) => {
      state.width = action.payload;
    },
  },
});

export const { togglePopover, hidePopover, getCurrentWidthBtn } =
  popoverSlice.actions;
export default popoverSlice.reducer;

// email: Bob_fun2024@gmail.com
// Пароль: 12345_bob
