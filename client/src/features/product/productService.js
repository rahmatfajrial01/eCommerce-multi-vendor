import axios from 'axios';
import { base_url } from '../../Utils/axiosConfig';

export const getAllProduct = async () => {
    const response = await axios.get(`${base_url}product`)
    if (response.data) {
        return response.data
    }
}

export const createProduct = async (data) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${data.token}`,
        },
    };
    const response = await axios.post(`${base_url}product`, data.data, config)
    if (response.data) {
        return response.data
    }
}

export const deleteProduct = async (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.delete(`${base_url}product/${data.id}`, config)
    if (response.data) {
        return response.data
    }
}

export const productService = {
    getAllProduct,
    createProduct,
    deleteProduct,
}