import axios from 'axios';
import { base_url } from '../../utils/axiosConfig';

const register = async (userData) => {
    const response = await axios.post(`${base_url}user/register`, userData)
    if (response.data) {
        return response.data
    }
}
const createUser = async (userData) => {
    const response = await axios.post(`${base_url}user/verification`, userData)
    if (response.data) {
        return response.data
    }
}
const resentOtp = async (userData) => {
    const response = await axios.post(`${base_url}user/resend-otp`, userData)
    if (response.data) {
        return response.data
    }
}
const login = async (userData) => {
    const response = await axios.post(`${base_url}user/login`, userData)
    if (response.data) {
        return response.data
    }
}
const forgotPassword = async (userData) => {
    const response = await axios.post(`${base_url}user/forgot-password`, userData)
    if (response.data) {
        return response.data
    }
}
const changePassword = async (userData) => {
    console.log(userData.data)
    const response = await axios.put(`${base_url}user/reset-password/${userData.token}`, userData.data)
    if (response.data) {
        return response.data
    }
}

const loginGoogle = async (userData) => {
    const response = await axios.post(`${base_url}user/google`, userData)
    if (response.data) {
        // localStorage.setItem("user", JSON.stringify(response.data))
        return response.data
    }
    console.log('yess')
}

const currentUser = async (token) => {
    if (token === undefined) return
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.get(`${base_url}user/current-user`, config)
    if (response.data) {
        return response.data
    }
}
const updateProfile = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.put(`${base_url}user/update-profile`, userData.data, config)
    if (response.data) {
        return response.data
    }
}
const updateProfilePicture = async (userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
        },
    };
    const response = await axios.put(`${base_url}user/update-profile-picture`, userData.data, config)
    if (response.data) {
        return response.data
    }
}

const logout = () => {
    localStorage.clear()
}

export const authService = {
    register,
    login,
    logout,
    createUser,
    resentOtp,
    forgotPassword,
    changePassword,
    loginGoogle,
    currentUser,
    updateProfile,
    updateProfilePicture
}