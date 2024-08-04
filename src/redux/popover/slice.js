import { createSlice } from '@reduxjs/toolkit';

const popoverSlice = createSlice({
  name: 'popover',
  initialState: {
    showPopover: false,
  },
  reducers: {
    openPopover: (state, action) => {
      state.showPopover = true;
    },
    closePopover: (state, action) => {
      state.showPopover = false;
    },
  },
});

export const { openPopover, closePopover } = popoverSlice.action;
export default popoverSlice.reducer;
