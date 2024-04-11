import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user_colors: null
}

export const userColorsSlice = createSlice({
  name: 'userColors',
  initialState,
  reducers: {
    setUserColors: (state, action) => {
        state.user_colors = action.payload;
    },
  },
});

export const { setUserColors } = userColorsSlice.actions;