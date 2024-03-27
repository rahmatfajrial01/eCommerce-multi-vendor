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

export const updateInfoShope = createAsyncThunk("shope/update-info-shope", async (userData, thunkApi) => {
    try {
        return await authService.updateInfoShope(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const updateAddressShope = createAsyncThunk("shope/update-address-shope", async (userData, thunkApi) => {
    try {
        return await authService.updateAddressShope(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const getMemberShope = createAsyncThunk("shope/get-member-shope", async (userData, thunkApi) => {
    try {
        return await authService.getMemberShope(userData)
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
            .addCase(updateInfoShope.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateInfoShope.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.infoShopeUpdated = action.payload;
                if (state.isSuccess === true) {
                    toast.info("update info shope successfully")
                }
            })
            .addCase(updateInfoShope.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateAddressShope.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAddressShope.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addressShopeUpdated = action.payload;
                if (state.isSuccess === true) {
                    toast.info("update address shope successfully")
                }
            })
            .addCase(updateAddressShope.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getMemberShope.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMemberShope.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.memberShope = action.payload;
            })
            .addCase(getMemberShope.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)


    }
})

export default authSlice.reducer