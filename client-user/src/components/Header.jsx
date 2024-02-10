import React from 'react'
import {
    FaInstagram,
    FaTiktok,
    FaTwitterSquare,
    FaFacebook,
    FaHeart,
    FaShoppingCart,
    FaList,
    FaUser,
    FaSearch
} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, resetState } from '../features/auth/authSlice';

const Header = () => {
    const dispatch = useDispatch()
    const authState = useSelector(state => state?.auth)

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
        <header className='bg-green-600 text-white py-2 w-full fixed top-0  z-10'>
            <section className='container mx-auto'>
                <div className='flex justify-between text-sm' >
                    <div className='flex gap-3'>
                        <FaInstagram />
                        <FaTiktok />
                        <FaTwitterSquare />
                        <FaFacebook />
                    </div>
                    <div>Telephone +078678668709</div>
                </div>
                <div className='flex justify-between gap-6 py-2 items-center'>
                    <div className='font-semibold text-2xl'><a href="/">eCommerce.</a> </div>
                    <div className='flex items-center w-full border-2 rounded-full bg-white border-white'>
                        <input placeholder='search...' className='text-black w-full py-1 px-3 focus:outline-none rounded-s-full text-sm' type="text" />
                        <button className='text-black py-2 px-3 rounded-full hover:opacity-80 bg-green-600'><FaSearch className='text-white' /></button>
                    </div>
                    <div className='flex gap-3 text-md'>
                        <Link to={'/wishlist'} className='flex items-center gap-1 py-1 px-3 rounded-full'><FaHeart />Wishlist</Link>
                        <Link to={'/cart'} className='flex items-center gap-1 py-1 px-3 rounded-full'><FaShoppingCart />Cart</Link>
                        <Link to={'/order'} className='flex items-center gap-1 py-1 px-3 rounded-full'><FaList />Orders</Link>
                        {
                            authState?.user === null
                                ?
                                <Link to={'/login'} className='border-2 flex items-center gap-1 py-1 px-2 rounded-full hover:opacity-80'><FaUser />Login</Link>
                                :
                                <Link onClick={handleLogout} to={'/'} className='border-2 flex items-center gap-1 py-1 px-2 rounded-full hover:opacity-80'><FaUser />Logout</Link>
                        }
                    </div>
                </div>
                <div className='justify-between flex text-sm'>
                    <div className=''>Kategory</div>
                    <div className='flex gap-3'>
                        <Link to={'/'}>Home</Link>
                        <Link to={'store'}>Store</Link>
                        <Link to={'/'}>Contact</Link>
                    </div>
                </div>
            </section>
        </header>
    )
}

export default Header