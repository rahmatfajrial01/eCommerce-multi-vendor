import axios from 'axios';
import { base_url } from '../../Utils/axiosConfig';

const register = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.post(`${base_url}shope/register`, userData.data, config)
    if (response.data) {
        return response.data
    }
}

const currentShope = async (userData) => {
    // console.log(userData.user)
    const config = {
        headers: {
            Authorization: `Bearer ${userData}`,
            Accept: "application/json",
        },
    };
    const response = await axios.get(`${base_url}shope/current-shope`, config)
    if (response.data) {
        return response.data
    }
}
const updateProfileShope = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.put(`${base_url}shope/update-picture/${userData.id}`, userData.data, config)
    if (response.data) {
        return response.data
    }
}

export const authService = {
    register, currentShope, updateProfileShope
}