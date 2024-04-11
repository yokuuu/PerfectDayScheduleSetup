import { combineReducers } from "redux";
import { userColorsSlice } from "../features/userColorsSlice";
import { userScheduleSlice } from "../features/userScheduleSlice";
import { userSlice } from "../features/userSlice";

export const rootReducer = combineReducers({
    user: userSlice.reducer,
    user_schedule: userScheduleSlice.reducer,
    user_colors: userColorsSlice.reducer
})