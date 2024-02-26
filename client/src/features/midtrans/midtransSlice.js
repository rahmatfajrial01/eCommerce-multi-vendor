import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { bannerService } from "./midtransService"

export const createMidtrans = createAsyncThunk("midtrans/create-midtrans", async (userData, thunkApi) => {
    try {
        return await bannerService.createMidtrans(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

const initialState = {
    midtrans: "",
    isError: "",
    isSuccess: "",
    isLoading: "",
    message: ""
}

export const bannerSlice = createSlice({
    name: "banner",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createMidtrans.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMidtrans.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.midtrans = action.payload;
            })
            .addCase(createMidtrans.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    }
})

export default bannerSlice.reducer
