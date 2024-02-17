import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { bannerService } from "./bannerService"

export const getAllBanner = createAsyncThunk("banner/get-all-banner", async (thunkApi) => {
    try {
        return await bannerService.getAllBanner()
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const createBanner = createAsyncThunk("banner/create-banner", async (data, thunkApi) => {
    try {
        return await bannerService.createBanner(data)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const deleteBanner = createAsyncThunk("banner/delete-banner", async (data, thunkApi) => {
    try {
        return await bannerService.deleteBanner(data)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


const initialState = {
    allBanner: "",
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
            .addCase(getAllBanner.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBanner.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.allBanner = action.payload;
            })
            .addCase(getAllBanner.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createBanner.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBanner.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.bannerCreated = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Banner Created Successfully")
                }
            })
            .addCase(createBanner.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(deleteBanner.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBanner.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.bannerDeleted = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Banner Deleted Successfully")
                }
            })
            .addCase(deleteBanner.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    }
})

export default bannerSlice.reducer
