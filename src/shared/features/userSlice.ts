import { createSlice } from '@reduxjs/toolkit'

export interface RootState {
    data: {
        user: User
        user_schedule: UserSchedule
        user_colors: Colors
    }
}

interface Colors {
    [key: string]: {
        color: string
    }
}

interface UserSchedule {
    [key: string]: {
        [key: string]: {
            user_day_schedule: {
                [key: string]: string | boolean
            }
        }
    }
}

export interface User {
    isLoading: boolean
    user: {
        email: string
        uid: string
        username: string
    }
}

const initialState = {
    user: null,
    isLoading: true,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload
        },
        logoutUser: (state) => {
            state.user = null
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
    },
})

export const { loginUser, logoutUser, setLoading } = userSlice.actions
