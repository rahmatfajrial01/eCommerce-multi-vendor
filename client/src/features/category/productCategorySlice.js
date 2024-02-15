import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { productCategoryService } from "./productCategoryService"

export const getAllProductCategory = createAsyncThunk("product/get-all-product-category", async (thunkApi) => {
    try {
        return await productCategoryService.getAllProductCategory()
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const getAProductCategory = createAsyncThunk("product/get-a-product-categories", async (id, thunkApi) => {
    try {
        return await productCategoryService.getAProductCategory(id)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const createProductCategory = createAsyncThunk("product/create-product-categories", async (data, thunkApi) => {
    try {
        return await productCategoryService.createProductCategory(data)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const deleteProductCategory = createAsyncThunk("product/delete-productg-categories", async (data, thunkApi) => {
    try {
        return await productCategoryService.deleteProductCategory(data)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const updateProductCategory = createAsyncThunk("product/update-product-categories", async (data, thunkApi) => {
    try {
        return await productCategoryService.updateProductCategory(data)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

const initialState = {
    allProductCategory: "",
    productCategory: "",
    isError: "",
    isSuccess: "",
    isLoading: "",
    message: ""
}

export const productCategorySlice = createSlice({
    name: "post-categories",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.allProductCategory = action.payload;
            })
            .addCase(getAllProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productCategoryCreated = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Category Created Successfully")
                }
            })
            .addCase(createProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(deleteProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productCategoryDeleted = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Category Deleted Successfully")
                }
            })
            .addCase(deleteProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getAProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productCategory = action.payload;
            })
            .addCase(getAProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productCategoryUpdated = action.payload;
                state.productCategory = "";
                if (state.isSuccess === true) {
                    toast.success("Category Updated Successfully")
                }
            })
            .addCase(updateProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message)
                }
            })

    }
})

export default productCategorySlice.reducer
