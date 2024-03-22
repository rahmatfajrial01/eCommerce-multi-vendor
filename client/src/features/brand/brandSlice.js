import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { brandService } from "./brandService"

export const getAllBrand = createAsyncThunk("brand/get-all-brand", async (thunkApi) => {
    try {
        return await brandService.getAllBrand()
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const createBrand = createAsyncThunk("brand/create-brand", async (data, thunkApi) => {
    try {
        return await brandService.createBrand(data)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const deleteBrand = createAsyncThunk("brand/delete-brand", async (data, thunkApi) => {
    try {
        return await brandService.deleteBrand(data)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const getABrand = createAsyncThunk("brand/get-a-brand", async (data, thunkApi) => {
    try {
        return await brandService.getABrand(data)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const updateBrand = createAsyncThunk("brand/update-a-brand", async (data, thunkApi) => {
    try {
        return await brandService.updateBrand(data)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_single-brand")

const initialState = {
    allBrand: "",
    isError: "",
    isSuccess: "",
    isLoading: "",
    message: ""
}

export const bannerSlice = createSlice({
    name: "brand",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.allBrand = action.payload;
            })
            .addCase(getAllBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brandCreated = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Brand Created Successfully")
                }
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(deleteBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brandDeleted = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Banner Deleted Successfully")
                }
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getABrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getABrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleBrand = action.payload;
            })
            .addCase(getABrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brandUpdated = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Brand Updated Successfully")
                }
            })
            .addCase(updateBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, (state) => {
                state.singleBrand = null;
            })

    }
})

export default bannerSlice.reducer
