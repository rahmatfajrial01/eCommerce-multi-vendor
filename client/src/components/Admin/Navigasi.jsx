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
                <Link className='py-1  ps-5 pe-10  rounded-full text-center font-semibold text-xl  w-36 overflow-hidden'>{shopeState?.currentShope?.shope[0]?.shopeName}</Link>
                <Link to={'/admin'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Dashboard</Link>
                {
                    authState?.currentUser?.role >= 3
                        ?
                        <>
                            <span className='py-1  ps-5 pe-10  rounded-full font-bold mt-3'>Admin</span>
                            <Link to={'/admin/user'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>User</Link>
                            <Link to={'/admin/category'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Category</Link>
                            <Link to={'/admin/banner'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Banner</Link>
                            <Link to={'/admin/brand'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Brand</Link>
                            <Link to={'/admin/list-all-product'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Product</Link>
                        </>
                        :
                        ""
                }
                {authState?.currentUser?.role >= 3 && <span className='py-1  ps-5 pe-10  rounded-full font-bold mt-3'>Seller</span>}
                <Link to={'/admin/list-product'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>My Product</Link>
                <Link to={'/admin/order'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>My Order</Link>
                <span className='py-1  ps-5 pe-10  rounded-full font-bold mt-3'>Setting</span>
                <Link to={'/admin/shope-setting'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Shope Setting</Link>
                <Link to={'/admin/seller'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Admin Setting</Link>
                {/* <Link to={'/'} className='py-1  ps-5 pe-10 hover:bg-white rounded-full'>Back</Link> */}
            </section>
        </nav>
    )
}

export default Navigasi