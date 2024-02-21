import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { productService } from "./productService"

export const getAllProduct = createAsyncThunk("product/get-all-product", async (thunkApi) => {
    try {
        return await productService.getAllProduct()
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const getSingleProduct = createAsyncThunk("product/single-product", async (slug, thunkApi) => {
    try {
        return await productService.getAProduct(slug)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const createProduct = createAsyncThunk("product/create-product", async (data, thunkApi) => {
    try {
        return await productService.createProduct(data)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const deleteProduct = createAsyncThunk("product/delete-product", async (data, thunkApi) => {
    try {
        return await productService.deleteProduct(data)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_createdProduct")

const initialState = {
    productCreated: null,
    allProduct: "",
    isError: "",
    isSuccess: "",
    isLoading: "",
    message: ""
}

export const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.allProduct = action.payload;
            })
            .addCase(getAllProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getSingleProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleProduct = action.payload;
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productCreated = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Product Created Successfully")
                }
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productDeleted = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Product Deleted Successfully")
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, (state) => {
                state.productCreated = null;
            })
    }
})

export default productSlice.reducer
