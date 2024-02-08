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

const Header = () => {
    return (
        <header className='bg-green-600 text-white py-2 w-full fixed top-0 opacity-95'>
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
                    <div className='font-semibold text-2xl'>eCommerce.</div>
                    <div className='flex items-center w-full border-2 rounded-full bg-white border-white'>
                        <input placeholder='search...' className='text-black w-full py-1 px-3 focus:outline-none rounded-s-full text-sm' type="text" />
                        <button className='text-black py-2 px-3 rounded-full hover:opacity-80 bg-green-600'><FaSearch className='text-white' /></button>
                    </div>
                    <div className='flex gap-3 text-md'>
                        <div className='flex items-center gap-1 py-1 px-3 rounded-full'><FaHeart />Wishlist</div>
                        <div className='flex items-center gap-1 py-1 px-3 rounded-full'><FaShoppingCart />Cart</div>
                        <div className='flex items-center gap-1 py-1 px-3 rounded-full'><FaList />Orders</div>
                        <div className='border-2 flex items-center gap-1 py-1 px-2 rounded-full hover:opacity-80'><FaUser />Login</div>
                    </div>
                </div>
                <div className='justify-between flex text-sm'>
                    <div className=''>Kategory</div>
                    <div className='flex gap-3'>
                        <div>Home</div>
                        <div>Store</div>
                        <div>Contact</div>
                    </div>
                </div>
            </section>
        </header>
    )
}

export default Header