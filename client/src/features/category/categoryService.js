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

export const authService = {
    getAllUser
}