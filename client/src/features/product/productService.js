import axios from 'axios';
import { base_url } from '../../Utils/axiosConfig';

export const getAllProduct = async () => {
    const response = await axios.get(`${base_url}product`)
    if (response.data) {
        return response.data
    }
}
const sortProduct = async (data) => {
    const response = await axios.get(`${base_url}product/filter?search=${data.search ? data.search : ''}&category=${data.category ? data.category : ""}&tag=${data.tag ? data.tag : ""}&brand=${data.brand ? data.brand : ""}${data.minPrice ? `&price[gte]=${data.minPrice}` : ""}${data.maxPrice ? `&price[lte]=${data.maxPrice}` : ""}&sort=${data.sort ? data.sort : ""}`)
    if (response.data) {
        return response.data
    }
}

const getAProduct = async (slug) => {
    const response = await axios.get(`${base_url}product/${slug}`)
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
    getAProduct,
    sortProduct
}