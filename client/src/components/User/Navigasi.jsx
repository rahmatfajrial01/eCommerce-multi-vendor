import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser, resetState } from '../../features/auth/authSlice'

const Navigasi = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        // localStorage.clear()
        // navigate('/')
        // window.location.reload()
        setTimeout(() => {
            dispatch(logoutUser())
        }, 100);
        dispatch(resetState())
    }

    return (
        <nav className='flex flex-col border ps-8 py-5 pe-16 rounded-xl gap-2 h-full'>
            <Link to={'/user'}>Profile</Link>
            <Link to={'/user/address'}>Address</Link>
            <Link to={'/user/order'} >Orders</Link>
            <Link to={'/user/wishlist'}>Wishlist</Link>
            <Link to={'/'} onClick={handleLogout}>Logout</Link>
        </nav>
    )
}

export default Navigasi