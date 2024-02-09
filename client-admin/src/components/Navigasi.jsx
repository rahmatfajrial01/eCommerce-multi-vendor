import React from 'react'
import { Link } from 'react-router-dom'

const Navigasi = () => {
    return (
        <nav className='min-h-screen bg-slate-300 '>
            <section className='flex flex-col mt-3 px-3'>
                <Link to={'/'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Dashboard</Link>
                <Link to={'user'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>User</Link>
                <Link to={'category'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Category</Link>
                <Link className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Product</Link>
                <Link className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Order</Link>
                <Link className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Logout</Link>
            </section>
        </nav>
    )
}

export default Navigasi