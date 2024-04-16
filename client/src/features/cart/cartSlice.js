import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { cartService } from "./cartService"
import { toast } from 'react-toastify';

export const addCart = createAsyncThunk("cart/add-cart", async (userData, thunkApi) => {
    try {
        return await cartService.addCart(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const getCart = createAsyncThunk("cart/get-cart", async (userData, thunkApi) => {
    try {
        return await cartService.getCart(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const deleteCart = createAsyncThunk("cart/delete-cart", async (userData, thunkApi) => {
    try {
        return await cartService.deleteCart(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const changeQtyCart = createAsyncThunk("cart/change-qty-cart", async (userData, thunkApi) => {
    try {
        return await cartService.changeQtyCart(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

const initialState = {
    cart: "",
    isError: "",
    isSuccess: "",
    isLoading: "",
}

export const authSlice = createSlice({
    name: "shope",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addCart = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Cart Add Successfully")
                }
            })
            .addCase(addCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(getCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cart = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartDeleted = action.payload;
                if (state.isSuccess === true) {
                    toast.info("Cart Deleted Successfully")
                }
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(changeQtyCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeQtyCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartQtyChanged = action.payload;
                // if (state.isSuccess === true) {
                //     toast.info("Cart Qty Updated Successfully")
                // }
            })
            .addCase(changeQtyCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
    }
})

export default authSlice.reducer