import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const MainLayout = () => {
    return (
        <>
            <Header />
            <section className='min-h-screen pt-28'>
                <Outlet />
            </section>
            <Footer />
        </>
    )
}

export default MainLayout