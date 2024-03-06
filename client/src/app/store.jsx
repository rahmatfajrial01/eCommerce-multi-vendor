import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../features/auth/authSlice'
import shopeReducer from '../features/shope/shopeSlice'
import userReducer from '../features/user/userSlice'
import bannerReducer from '../features/banner/bannerSlice'
import brandReducer from '../features/brand/brandSlice'
import productReducer from '../features/product/productSlice'
import cartReducer from '../features/cart/cartSlice'
import rajaOngkirReducer from '../features/rajaOngkir/rajaOngkirSlice'
import midtransReducer from '../features/midtrans/midtransSlice'
import orderReducer from '../features/order/orderSlice'
import order2Reducer from '../features/order2/order2Slice'
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
        cart: cartReducer,
        midtrans: midtransReducer,
        order: orderReducer,
        order2: order2Reducer,
        rajaOngkir: rajaOngkirReducer,
    },
})
