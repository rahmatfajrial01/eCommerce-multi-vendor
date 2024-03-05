import axios from 'axios';
import { base_url } from '../../Utils/axiosConfig';

export const createMidtrans = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.post(`${base_url}midtrans`, "", config)
    if (response.data) {
        return response.data
    }
}

export const bannerService = {
    createMidtrans,
}