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


export const resetState = createAction("Reset_all")


const initialState = {
    allUser: null,
    isError: "",
    isSuccess: "",
    isLoading: "",
}

export const userSlice = createSlice({
    name: "shope",
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
            .addCase(resetState, () => initialState)


    }
})

export default userSlice.reducer