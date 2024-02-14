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
            .addCase(resetState, () => initialState)
    }
})

export default userSlice.reducer