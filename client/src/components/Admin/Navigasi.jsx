import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navigasi = () => {
    const shopeState = useSelector(state => state?.shope)
    const authState = useSelector(state => state?.auth)
    // console.log('ini2', shopeState?.currentShope?.shope[0])

    return (
        <nav className='bg-slate-300 max-w-fit h-full min-h-screen fixed left-0 top-0'>
            <section className='flex flex-col mt-14 px-3'>
                <Link to={''} className='py-1  ps-5 pe-10 hover:bg-white rounded-full text-center font-semibold text-xl'>{shopeState?.currentShope?.shope[0]?.shopeName}</Link>
                <Link to={'/admin'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Dashboard</Link>
                {
                    authState?.currentUser?.role >= 3
                        ?
                        <>
                            <Link to={'/admin/user'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>User</Link>
                            <Link to={'/admin/category'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Category</Link>
                            <Link to={'/admin/banner'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Banner</Link>
                            <Link to={'/admin/brand'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Brand</Link>
                        </>
                        :
                        ""
                }
                <Link to={'/admin/product'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Product</Link>
                <Link to={'/admin/order'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Order</Link>
                {/* <Link to={'/'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Back</Link> */}
            </section>
        </nav>
    )
}

export default Navigasi