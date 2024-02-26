import axios from 'axios';
import { base_url } from '../../Utils/axiosConfig';

export const createMidtrans = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.post(`${base_url}midtrans`, userData.data, config)
    if (response.data) {
        return response.data
    }
}

export const bannerService = {
    createMidtrans,
}