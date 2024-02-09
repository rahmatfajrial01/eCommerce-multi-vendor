import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Navigasi from './Navigasi'

const Layout = () => {
    return (
        <>
            <Header />
            <section className='flex justify-between mt-10 '>
                <Navigasi />
                <Outlet />
            </section>
            <Footer />
        </>
    )
}

export default Layout