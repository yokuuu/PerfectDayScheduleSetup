import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user_schedule: null
}

export const userScheduleSlice = createSlice({
  name: 'userSchedule',
  initialState,
  reducers: {
    setUserSchedule: (state, action) => {
        state.user_schedule = action.payload;
    },
  },
});

export const { setUserSchedule } = userScheduleSlice.actions;