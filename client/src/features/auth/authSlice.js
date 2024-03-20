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
export const forgotPassword = createAsyncThunk("auth/forgot-password", async (userData, thunkApi) => {
    try {
        return await authService.forgotPassword(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const changePassword = createAsyncThunk("auth/change-password", async (userData, thunkApi) => {
    try {
        return await authService.changePassword(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const loginGoogle = createAsyncThunk("auth/login-google", async (userData, thunkApi) => {
    try {
        return await authService.loginGoogle(userData)
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

export const getCurrentUser = createAsyncThunk("auth/profile", async (token, thunkApi) => {
    try {
        return await authService.currentUser(token)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const updateProfile = createAsyncThunk("auth/update-profile", async (userData, thunkApi) => {
    try {
        return await authService.updateProfile(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const updateProfilePicture = createAsyncThunk("auth/update-profile-picture", async (userData, thunkApi) => {
    try {
        return await authService.updateProfilePicture(userData)
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
    isError: "",
    isSuccess: "",
    isLoading: "",
    createdUserVerif: ""
    // message: "",
    // profile: "",
    // allUser: "",
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
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                if (state.isSuccess === true) {
                    toast.info("Check your email")
                }
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.changedPassword = action.payload
                if (state.isSuccess === true) {
                    toast.info("Password change success")
                }
            })
            .addCase(changePassword.rejected, (state, action) => {
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
                state.currentUser = null;
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
                state.changedPassword = null;
            })
            .addCase(loginGoogle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginGoogle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                if (state.isSuccess === true) {
                    // localStorage.setItem("user", JSON.stringify(action.payload))
                    toast.info("User Login Successfully")
                }
            })
            .addCase(loginGoogle.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.currentUser = action.payload;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.profileUpdated = action.payload;
                if (state.isSuccess === true) {
                    toast.info("Profile Updated")
                }
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateProfilePicture.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfilePicture.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.profilePictureUpdated = action.payload;
                if (state.isSuccess === true) {
                    toast.info("Profile Picture Updated")
                }
            })
            .addCase(updateProfilePicture.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    }
})

export default authSlice.reducer