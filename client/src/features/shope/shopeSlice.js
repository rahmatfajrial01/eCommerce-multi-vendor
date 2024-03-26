import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { authService } from "./shopeService"
import { toast } from 'react-toastify';

export const register = createAsyncThunk("shope/register", async (userData, thunkApi) => {
    try {
        return await authService.register(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const getCurrentShope = createAsyncThunk("shope/current-shope", async (userData, thunkApi) => {
    try {
        return await authService.currentShope(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const updateProfileShope = createAsyncThunk("shope/update-profile-shope", async (userData, thunkApi) => {
    try {
        return await authService.updateProfileShope(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all")


const initialState = {
    createdShope: null,
    currentShope: null,
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
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdShope = action.payload;
                if (state.isSuccess === true) {
                    toast.info("shope created")
                }
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(getCurrentShope.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentShope.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.currentShope = action.payload;
                // if (state.isSuccess === true) {
                //     toast.info("shope created")
                // }
            })
            .addCase(getCurrentShope.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                // if (state.isError === true) {
                //     toast.error("action.payload.response.data.message")
                // }
            })
            .addCase(updateProfileShope.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfileShope.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.pictureShopeUpdated = action.payload;
                if (state.isSuccess === true) {
                    toast.info("update profile shope successfully")
                }
            })
            .addCase(updateProfileShope.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)


    }
})

export default authSlice.reducer