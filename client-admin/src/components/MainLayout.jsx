import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Navigasi from './Navigasi'

const Layout = () => {


    return (
        <>
            <Header />
            <div className='flex mt-10'>
                <Navigasi />
                <div className='ps-40 w-full mb-5 min-h-screen'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Layout