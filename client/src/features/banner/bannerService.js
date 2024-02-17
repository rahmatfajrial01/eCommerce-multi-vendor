import axios from 'axios';
import { base_url } from '../../Utils/axiosConfig';

export const getAllBanner = async () => {
    const response = await axios.get(`${base_url}banner`)
    if (response.data) {
        return response.data
    }
}

export const createBanner = async (data) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${data.token}`,
        },
    };
    const response = await axios.post(`${base_url}banner`, data.data, config)
    if (response.data) {
        return response.data
    }
}


export const deleteBanner = async (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.delete(`${base_url}banner/${data.id}`, config)
    if (response.data) {
        return response.data
    }
}


export const bannerService = {
    getAllBanner,
    createBanner,
    deleteBanner,
}