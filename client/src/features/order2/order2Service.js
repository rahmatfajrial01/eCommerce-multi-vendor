import axios from 'axios';
import { base_url } from '../../Utils/axiosConfig';

// const createOrder = async (userData) => {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${userData.token}`,
//             Accept: "application/json",
//         },
//     };
//     const response = await axios.post(`${base_url}order`, userData.data, config)
//     if (response.data) {
//         return response.data
//     }
// }

const getOrder2 = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData}`,
            Accept: "application/json",
        },
    };
    const response = await axios.get(`${base_url}order2`, config)
    if (response.data) {
        return response.data
    }
}

const getOrder2ByShope = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData}`,
            Accept: "application/json",
        },
    };
    const response = await axios.get(`${base_url}order2/order-by-shope`, config)
    if (response.data) {
        return response.data
    }
}

// const updateShippment = async (userData) => {
//     console.log(userData)
//     const config = {
//         headers: {
//             Authorization: `Bearer ${userData.token}`,
//             Accept: "application/json",
//         },
//     };
//     const response = await axios.put(`${base_url}order/update-shippment`, userData.data, config)
//     if (response.data) {
//         return response.data
//     }
// }

// const updateShippmentCost = async (userData) => {
//     console.log(userData)
//     const config = {
//         headers: {
//             Authorization: `Bearer ${userData.token}`,
//             Accept: "application/json",
//         },
//     };
//     const response = await axios.put(`${base_url}order/update-shippment-cost`, userData.data, config)
//     if (response.data) {
//         return response.data
//     }
// }

export const order2Service = {
    getOrder2, getOrder2ByShope
}