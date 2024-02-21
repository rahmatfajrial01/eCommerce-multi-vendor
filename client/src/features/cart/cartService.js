import axios from 'axios';
import { base_url } from '../../Utils/axiosConfig';

const addCart = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.post(`${base_url}cart`, userData.data, config)
    if (response.data) {
        return response.data
    }
}

const deleteCart = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.delete(`${base_url}cart/${userData.id}`, config)
    if (response.data) {
        return response.data
    }
}

const getCart = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.get(`${base_url}cart`, config)
    if (response.data) {
        return response.data
    }
}


export const cartService = {
    addCart, getCart, deleteCart
}