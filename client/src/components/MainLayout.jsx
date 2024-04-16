import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import MobileFooter from './MobileFooter'

const MainLayout = () => {
    return (
        <>
            <Header />
            <section className='min-h-screen md:pt-28 pt-[70px] md:px-5'>
                <Outlet />
            </section>
            <Footer />
            <MobileFooter />
        </>
    )
}

export default MainLayout