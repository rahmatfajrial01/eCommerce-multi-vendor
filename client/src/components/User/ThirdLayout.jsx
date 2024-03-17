import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigasi from './Navigasi'

const ThirdLayout = () => {
    return (
        <section className='container mx-auto flex gap-5 pt-5 w-[1170px]'>
            <Navigasi />
            <Outlet />
        </section>
    )
}

export default ThirdLayout