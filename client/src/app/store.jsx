import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../features/auth/authSlice'
import shopeReducer from '../features/shope/shopeSlice'
import userReducer from '../features/user/userSlice'
import productCategoryReducer from '../features/category/productCategorySlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        shope: shopeReducer,
        productCategory: productCategoryReducer,
    },
})