import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { authService } from "./userService"
import { toast } from 'react-toastify';

export const getAllUser = createAsyncThunk("user/get-all-user", async (userData, thunkApi) => {
    try {
        return await authService.getAllUser(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const deleteAddress = createAsyncThunk("user/delete-address", async (userData, thunkApi) => {
    try {
        return await authService.deleteAddress(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const addAddress = createAsyncThunk("user/add-address", async (userData, thunkApi) => {
    try {
        return await authService.addAddress(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const addWishlist = createAsyncThunk("user/add-wishlis", async (userData, thunkApi) => {
    try {
        return await authService.addWishlist(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const getWishlist = createAsyncThunk("user/get-wishlis", async (userData, thunkApi) => {
    try {
        return await authService.getWishlist(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const getCosts = createAsyncThunk("rajaongkirr/get-cost", async (userData, thunkApi) => {
    try {
        return await authService.getCosts(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const sendOrder = createAsyncThunk("order/send-order", async (userData, thunkApi) => {
    try {
        return await authService.sendOrder(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const clearCost = createAsyncThunk("order/clear-costs", async (userData, thunkApi) => {
    try {
        return await authService.clearCost(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const resetState = createAction("Reset_all")


const initialState = {
    allUser: null,
    wishlist: "",
    isError: "",
    isSuccess: "",
    isLoading: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.allUser = action.payload;
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addressDeleted = action.payload;
                if (state.isSuccess === true) {
                    toast.info("address deleted")
                }
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addressAdded = action.payload;
                if (state.isSuccess === true) {
                    toast.info("address added succesfully")
                }
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlistAdded = action.payload;
                if (state.isSuccess === true) {
                    toast.info("wishlist modify succesfully")
                }
            })
            .addCase(addWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getCosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cost = action.payload;
                // if (state.isSuccess === true) {
                //     toast.info("shope created")
                // }
            })
            .addCase(getCosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                // if (state.isError === true) {
                //     toast.error("action.payload.response.data.message")
                // }
            })
            .addCase(sendOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.sendedOrder = action.payload;
                // if (state.isSuccess === true) {
                //     toast.info("shope ok")
                // }
            })
            .addCase(sendOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(clearCost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(clearCost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.clearedCost = action.payload;
                // if (state.isSuccess === true) {
                //     toast.info("shope ok")
                // }
            })
            .addCase(clearCost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                // if (state.isError === true) {
                //     toast.error(action.payload.response.data.message)
                // }
            })
            .addCase(resetState, () => initialState)


    }
})

export default userSlice.reducer