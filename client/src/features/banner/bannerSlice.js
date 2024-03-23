import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
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

export const getABanner = createAsyncThunk("banner/get-a-banner", async (id, thunkApi) => {
    try {
        return await bannerService.getABanner(id)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const updateBanner = createAsyncThunk("banner/edit-banner", async (userData, thunkApi) => {
    try {
        return await bannerService.updateBanner(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_single-banner")

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
            .addCase(getABanner.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getABanner.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleBanner = action.payload;
            })
            .addCase(getABanner.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateBanner.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBanner.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.bannerUpdated = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Banner Image Update Successfully")
                }
            })
            .addCase(updateBanner.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, (state) => {
                state.singleBanner = null;
            })
    }
})

export default bannerSlice.reducer
