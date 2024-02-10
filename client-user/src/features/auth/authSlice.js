import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { authService } from "./authService"
import { toast } from 'react-toastify';

export const register = createAsyncThunk("auth/register", async (userData, thunkApi) => {
    try {
        return await authService.register(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const createUser = createAsyncThunk("auth/create-user", async (userData, thunkApi) => {
    try {
        return await authService.createUser(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const resentOtp = createAsyncThunk("auth/resent-otp", async (userData, thunkApi) => {
    try {
        return await authService.resentOtp(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const login = createAsyncThunk("auth/login", async (userData, thunkApi) => {
    try {
        return await authService.login(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const logoutUser = createAsyncThunk("auth/logout", (thunkApi) => {
    try {
        return authService.logout()
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all")

const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const initialState = {
    user: getTokenFromLocalStorage,
    createdUser: null,
    createdUserVerif: ""
}

export const authSlice = createSlice({
    name: "auth",
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
                state.createdUser = action.payload;
                if (state.isSuccess === true) {
                    toast.info("Verifie your email")
                }
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                // state.createdUserVerif = null;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUserVerif = action.payload;
                if (state.isSuccess === true) {
                    toast.info("User Created Successfully")
                }
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(resentOtp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resentOtp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.resentOtp = action.payload;
                if (state.isSuccess === true) {
                    toast.info("resent otp Successfully")
                }
            })
            .addCase(resentOtp.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                if (state.user.verified === true) {
                    // localStorage.setItem("user", JSON.stringify(action.payload))
                    toast.info("User Login Successfully")
                } else (
                    toast.info("verified your account")
                )
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })

            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = null;
                if (state.isSuccess === true) {
                    toast.info("User Logout Successfully")
                }
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                // if (state.isError === true) {
                //     toast.error(action.payload.response.data.message)
                // }
            })
            .addCase(resetState, (state) => {
                state.user = null;
                state.createdUser = null;
                state.createdUserVerif = null;
            })
    }
})

export default authSlice.reducer