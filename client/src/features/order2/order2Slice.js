import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { order2Service } from "./order2Service"
import { toast } from 'react-toastify';

export const changeStatusOrder2 = createAsyncThunk("order2/change-status-order", async (userData, thunkApi) => {
    try {
        return await order2Service.changeStatusOrder2(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const getOrder2 = createAsyncThunk("order2/get-order2", async (userData, thunkApi) => {
    try {
        return await order2Service.getOrder2(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const getOrder2ByShope = createAsyncThunk("order2/get-orderByShope", async (userData, thunkApi) => {
    try {
        return await order2Service.getOrder2ByShope(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

// export const updateShippment = createAsyncThunk("order/udpate-shippment", async (userData, thunkApi) => {
//     try {
//         return await order2Service.updateShippment(userData)
//     } catch (error) {
//         return thunkApi.rejectWithValue(error)
//     }
// })

// export const updateShippmentCost = createAsyncThunk("order/udpate-shippment-cost", async (userData, thunkApi) => {
//     try {
//         return await order2Service.updateShippmentCost(userData)
//     } catch (error) {
//         return thunkApi.rejectWithValue(error)
//     }
// })

export const resetStateOrder = createAction("Reset_checkout")


const initialState = {
    order2: "",
    createdOrder: "",
    isError: "",
    isSuccess: "",
    isLoading: "",
}

export const order2Slice = createSlice({
    name: "order2",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changeStatusOrder2.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeStatusOrder2.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.changeStatusOrder2 = action.payload;
                if (state.isSuccess === true) {
                    toast.info("change status successfull")
                }
            })
            .addCase(changeStatusOrder2.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(getOrder2.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrder2.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.order2 = action.payload;
                // if (state.isSuccess === true) {
                //     toast.info("shope created")
                // }
            })
            .addCase(getOrder2.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                // if (state.isError === true) {
                //     toast.error("action.payload.response.data.message")
                // }
            })
            .addCase(getOrder2ByShope.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrder2ByShope.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.order2ByShope = action.payload;
                // if (state.isSuccess === true) {
                //     toast.info("shope created")
                // }
            })
            .addCase(getOrder2ByShope.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                // if (state.isError === true) {
                //     toast.error("action.payload.response.data.message")
                // }
            })
        // .addCase(updateShippment.pending, (state) => {
        //     state.isLoading = true;
        // })
        // .addCase(updateShippment.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.isError = false;
        //     state.isSuccess = true;
        //     state.updatedShippment = action.payload;
        //     // if (state.isSuccess === true) {
        //     //     toast.info("shope created")
        //     // }
        // })
        // .addCase(updateShippment.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.isSuccess = false;
        //     state.message = action.error;
        //     // if (state.isError === true) {
        //     //     toast.error("action.payload.response.data.message")
        //     // }
        // })
        // .addCase(updateShippmentCost.pending, (state) => {
        //     state.isLoading = true;
        // })
        // .addCase(updateShippmentCost.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.isError = false;
        //     state.isSuccess = true;
        //     state.updatedShippmentCost = action.payload;
        //     // if (state.isSuccess === true) {
        //     //     toast.info("shope created")
        //     // }
        // })
        // .addCase(updateShippmentCost.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.isSuccess = false;
        //     state.message = action.error;
        //     // if (state.isError === true) {
        //     //     toast.error("action.payload.response.data.message")
        //     // }
        // })
        // .addCase(resetStateOrder, (state) => {
        //     state.createdOrder = null;
        // })
    }
})

export default order2Slice.reducer