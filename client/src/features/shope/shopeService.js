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
const updateInfoShope = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.put(`${base_url}shope/update-info/${userData.id}`, userData.data, config)
    if (response.data) {
        return response.data
    }
}
const updateAddressShope = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.put(`${base_url}shope/update-address/${userData.id}`, userData.data, config)
    if (response.data) {
        return response.data
    }
}
const getMemberShope = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.get(`${base_url}shope/member-shope/${userData.id}`, config)
    if (response.data) {
        return response.data
    }
}
const getNewMember = async (userData) => {
    console.log(userData)
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.post(`${base_url}shope/new-member`, userData.data, config)
    if (response.data) {
        return response.data
    }
}
const acceptMember = async (userData) => {
    console.log(userData)
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.put(`${base_url}shope/accept-member/${userData.id}/${userData.shopeId}`, '', config)
    if (response.data) {
        return response.data
    }
}

const getAllShope = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.get(`${base_url}shope`, config)
    if (response.data) {
        return response.data
    }
}
const getShope = async (userData) => {
    const response = await axios.get(`${base_url}shope/${userData}`)
    if (response.data) {
        return response.data
    }
}

export const authService = {
    register, currentShope, updateProfileShope, updateInfoShope, updateAddressShope, getMemberShope, getNewMember, acceptMember, getAllShope, getShope
}