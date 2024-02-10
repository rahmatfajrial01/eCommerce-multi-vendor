import axios from 'axios';
import { base_url } from '../../Utils/axiosConfig';

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
    changePassword
}