import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { getCurrentUser } from '../../features/auth/authSlice'
import { NotFound } from '../../pages/NotFound'
import Footer from './Footer'
import Header from './Header'
import Navigasi from './Navigasi'

const Layout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCurrentUser(authState?.user?.token))
    }, [])
    const authState = useSelector(state => state?.auth)
    return (
        <>
            {
                authState?.currentUser?.role >= 2
                    ?
                    <>
                        <Header />
                        <div className='flex mt-12'>
                            <Navigasi />
                            <div className='ps-52 w-full mb-5 min-h-screen'>
                                <Outlet />
                            </div>
                        </div>
                        <Footer />
                    </>
                    : authState?.currentUser?.role < 2 ? <NotFound /> :
                        <div className='min-h-screen flex justify-center items-center'>Loading...</div>
            }
        </>
    )
}

export default Layout