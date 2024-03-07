import axios from 'axios';
import { base_url } from '../../Utils/axiosConfig';

const changeStatusOrder2 = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.patch(`${base_url}order2/${userData.data.id}`, userData.data, config)
    if (response.data) {
        return response.data
    }
}

const getOrder2 = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.get(`${base_url}order2?orderStatus=${userData.orderStatus}`, config)
    if (response.data) {
        return response.data
    }
}

const getOrder2ByShope = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.get(`${base_url}order2/order-by-shope?orderStatus=${userData.orderStatus}`, config)
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
    getOrder2, getOrder2ByShope, changeStatusOrder2
}