import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { orderService } from "./orderService"
import { toast } from 'react-toastify';

export const createOrder = createAsyncThunk("order/create-order", async (userData, thunkApi) => {
    try {
        return await orderService.createOrder(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const getOrder = createAsyncThunk("order/get-order", async (userData, thunkApi) => {
    try {
        return await orderService.getOrder(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const updateShippment = createAsyncThunk("order/udpate-shippment", async (userData, thunkApi) => {
    try {
        return await orderService.updateShippment(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const updateShippmentCost = createAsyncThunk("order/udpate-shippment-cost", async (userData, thunkApi) => {
    try {
        return await orderService.updateShippmentCost(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_checkout")


const initialState = {
    order: "",
    createdOrder: "",
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
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdOrder = action.payload;
                // if (state.isSuccess === true) {
                //     toast.info("order created")
                // }
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(getOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.order = action.payload;
                // if (state.isSuccess === true) {
                //     toast.info("shope created")
                // }
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                // if (state.isError === true) {
                //     toast.error("action.payload.response.data.message")
                // }
            })
            .addCase(updateShippment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateShippment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedShippment = action.payload;
                // if (state.isSuccess === true) {
                //     toast.info("shope created")
                // }
            })
            .addCase(updateShippment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                // if (state.isError === true) {
                //     toast.error("action.payload.response.data.message")
                // }
            })
            .addCase(updateShippmentCost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateShippmentCost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedShippmentCost = action.payload;
                // if (state.isSuccess === true) {
                //     toast.info("shope created")
                // }
            })
            .addCase(updateShippmentCost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                // if (state.isError === true) {
                //     toast.error("action.payload.response.data.message")
                // }
            })
            .addCase(resetState, (state) => {
                state.createdOrder = null;
            })
    }
})

export default authSlice.reducer