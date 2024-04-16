import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigasi from './Navigasi'

const ThirdLayout = () => {
    return (
        <section className='container mx-auto flex md:flex-row flex-col gap-5 pt-5 md:w-[1170px] px-5'>
            <Navigasi />
            <Outlet />
        </section>
    )
}

export default ThirdLayout