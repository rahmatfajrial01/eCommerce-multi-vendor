import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { authService } from "./rajaOngkirService"
import { toast } from 'react-toastify';

export const getAllProvince = createAsyncThunk("raja-ongkir/profince", async (token, thunkApi) => {
    try {
        return await authService.getAllProvince(token)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const getCity = createAsyncThunk("raja-ongkir/get-city", async (data, thunkApi) => {
    try {
        return await authService.getCity(data)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const getCost = createAsyncThunk("raja-ongkir/get-cost", async (data, thunkApi) => {
    try {
        return await authService.getCost(data)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all")


const initialState = {
    // createdShope: null,
    // currentShope: null,
    isError: "",
    isSuccess: "",
    isLoading: "",
    allProvince: ""
}

export const authSlice = createSlice({
    name: "shope",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProvince.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProvince.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.allProvince = action.payload;
                // if (state.isSuccess === true) {
                //     toast.info("shope created")
                // }
            })
            .addCase(getAllProvince.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload)
                }
            })
            .addCase(getCity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.city = action.payload;
                // if (state.isSuccess === true) {
                //     toast.info("shope created")
                // }
            })
            .addCase(getCity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                // if (state.isError === true) {
                //     toast.error("action.payload.response.data.message")
                // }
            })
            .addCase(getCost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cost = action.payload;
                // if (state.isSuccess === true) {
                //     toast.info("shope created")
                // }
            })
            .addCase(getCost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                // if (state.isError === true) {
                //     toast.error("action.payload.response.data.message")
                // }
            })
            .addCase(resetState, () => initialState)


    }
})

export default authSlice.reducer