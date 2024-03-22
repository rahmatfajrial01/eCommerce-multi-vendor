import axios from 'axios';
import { base_url } from '../../Utils/axiosConfig';

export const getAllBrand = async () => {
    const response = await axios.get(`${base_url}brand`)
    if (response.data) {
        return response.data
    }
}

export const createBrand = async (data) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${data.token}`,
        },
    };
    const response = await axios.post(`${base_url}brand`, data.data, config)
    if (response.data) {
        return response.data
    }
}

export const deleteBrand = async (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.delete(`${base_url}brand/${data.id}`, config)
    if (response.data) {
        return response.data
    }
}
export const updateBrand = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.put(`${base_url}brand/${userData.id}`, userData.data, config)
    if (response.data) {
        return response.data
    }
}

export const getABrand = async (data) => {
    const response = await axios.get(`${base_url}brand/${data}`)
    if (response.data) {
        return response.data
    }
}


export const brandService = {
    getAllBrand,
    createBrand,
    deleteBrand,
    getABrand,
    updateBrand
}