import React from 'react'
import { Link } from 'react-router-dom'

const Navigasi = () => {
    return (
        <nav className='flex flex-col border ps-10 py-5 pe-20 rounded-xl gap-2 h-full'>
            <Link to={'/user'}>Profile</Link>
            <Link to={'/user/address'}>Address</Link>
            <Link to={'/user/order'} >Orders</Link>
            <Link to={'/user/wishlist'}>Wishlist</Link>
            <Link>Logout</Link>
        </nav>
    )
}

export default Navigasi