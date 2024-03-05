import axios from 'axios';
import { base_url } from '../../Utils/axiosConfig';

const getAllProvince = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.get(`${base_url}raja-ongkir`, config)
    if (response.data) {
        return response.data
    }
}

const getCity = async (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.get(`${base_url}raja-ongkir/${data.id}`, config)
    if (response.data) {
        return response.data
    }
}
const getCost = async (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.post(`${base_url}raja-ongkir/cost`, data.data, config)
    if (response.data) {
        return response.data
    }
}

const updateCost = async (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.put(`${base_url}order/update-shippment-cost`, data.data, config)
    if (response.data) {
        return response.data
    }
}


export const authService = {
    getAllProvince, getCity, getCost, updateCost
}