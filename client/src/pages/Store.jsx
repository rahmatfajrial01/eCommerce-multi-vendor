import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'

const Store = () => {
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(resetStateSort())
    // }, [])
    const productState = useSelector(state => state?.product)
    return (
        <section>
            <div className='flex gap-3 container mx-auto'>
                <div className=' w-1/5 flex flex-col gap-2'>
                    <div className='h-10 bg-green-500'></div>
                    <div className='h-52 bg-green-500'></div>
                    <div className='h-52 bg-green-500'></div>
                    <div className='h-52 bg-green-500'></div>
                </div>
                <div className='w-4/5 flex flex-col gap-3'>
                    <div className='h-10 bg-green-500'></div>
                    <div className=' grid grid-cols-5 gap-2'>
                        {
                            productState?.sortProducts
                                ?
                                (
                                    productState?.sortProducts.map((item, index) =>
                                        <Link to={`/${item?.slug}`} key={index} className=' bg-white rounded-xl border relative'>
                                            <img src={item?.images?.url} alt="" className='h-56 w-full  rounded-t-xl' />
                                            <div className='p-3 space-y-1'>
                                                <p className='text-green-500'>{item?.shope?.shopeName}</p>
                                                <p>{item?.title}</p>
                                                <div className='flex justify-between items-center gap-3'>
                                                    <p className='font-semibold'>Rp {item?.price}</p>
                                                    <p className='opacity-85'>{item?.sold} Sold</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                )
                                : ""
                        }
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Store