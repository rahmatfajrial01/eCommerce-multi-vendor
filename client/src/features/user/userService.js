import axios from 'axios';
import { base_url } from '../../Utils/axiosConfig';

const getAllUser = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.get(`${base_url}user`, config)
    if (response.data) {
        return response.data
    }
}

const deleteAddress = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.delete(`${base_url}user/delete-address/${userData.id}`, config)
    if (response.data) {
        return response.data
    }
}
const addAddress = async (userData) => {
    console.log(userData)
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.post(`${base_url}user/add-address`, userData.data, config)
    if (response.data) {
        return response.data
    }
}

const getCosts = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData}`,
            Accept: "application/json",
        },
    };
    const response = await axios.get(`${base_url}order/cost`, config)
    if (response.data) {
        return response.data
    }
}

const clearCost = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.patch(`${base_url}order/clear-cost`, userData.data, config)
    if (response.data) {
        return response.data
    }
}

const sendOrder = async (userData) => {
    console.log('ini', userData)
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.post(`${base_url}order/send-order`, userData.data, config)
    if (response.data) {
        return response.data
    }
}

export const authService = {
    getAllUser, deleteAddress, addAddress, getCosts, sendOrder, clearCost
}