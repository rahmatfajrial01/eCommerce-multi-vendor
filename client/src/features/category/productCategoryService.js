import axios from 'axios';
import { base_url } from '../../utils/axiosConfig';

export const getAllProductCategory = async () => {
    const response = await axios.get(`${base_url}product-category`)
    if (response.data) {
        return response.data
    }
}

export const createProductCategory = async (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.post(`${base_url}product-category`, data.values, config)
    if (response.data) {
        return response.data
    }
}
export const getAProductCategory = async (data) => {
    const response = await axios.get(`${base_url}product-category/${data}`)
    if (response.data) {
        return response.data
    }
}

export const deleteProductCategory = async (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.delete(`${base_url}product-category/${data.id}`, config)
    if (response.data) {
        return response.data
    }
}

const updateProductCategory = async (data) => {
    // console.log(slug.updateData)
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.put(`${base_url}product-category/${data.id}`, data.values, config)
    if (response.data) {
        return response.data
    }
}


export const productCategoryService = {
    getAllProductCategory,
    createProductCategory,
    deleteProductCategory,
    getAProductCategory,
    updateProductCategory
}