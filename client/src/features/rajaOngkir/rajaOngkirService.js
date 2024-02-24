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



export const authService = {
    getAllProvince, getCity
}