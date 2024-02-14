import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../features/auth/authSlice'
import shopeReducer from '../features/shope/shopeSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        shope: shopeReducer,
    },
})
