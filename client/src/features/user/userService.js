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

export const authService = {
    getAllUser, deleteAddress, addAddress
}