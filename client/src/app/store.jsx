import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../features/auth/authSlice'
import shopeReducer from '../features/shope/shopeSlice'
import userReducer from '../features/user/userSlice'
import bannerReducer from '../features/banner/bannerSlice'
import brandReducer from '../features/brand/brandSlice'
import productReducer from '../features/product/productSlice'
import productCategoryReducer from '../features/category/productCategorySlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        shope: shopeReducer,
        banner: bannerReducer,
        brand: brandReducer,
        productCategory: productCategoryReducer,
        product: productReducer,
    },
})
