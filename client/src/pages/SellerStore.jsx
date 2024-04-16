import React, { useEffect } from 'react'
import { RxAvatar } from 'react-icons/rx'
import { TbSquareRoundedMinus } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getShope } from '../features/shope/shopeSlice'

const SellerStore = () => {
    const dispatch = useDispatch()
    let shopeName = location?.pathname?.split('/')[2]
    const shopeState = useSelector(state => state?.shope)
    console.log(shopeState)
    useEffect(() => {
        dispatch(getShope(shopeName))
    }, [])
    return (
        <section className='container mx-auto mt-5 space-y-3 md:px-0 px-5 mb-24 md:mb-7'>
            <div>
                <div className='border p-5 rounded-xl flex gap-2 items-center'>

                    {
                        shopeState?.singleShope
                            ?
                            <img className='h-28 w-28 object-cover rounded-3xl' src={shopeState?.singleShope[0]?.avatar} alt="" />
                            :
                            <TbSquareRoundedMinus size={50} />
                    }

                    {/* <img className='h-28 w-28 object-cover rounded-3xl' src={shopeState?.singleShope[0]?.avatar} alt="" /> */}
                    <div className='space-y-3'>
                        <p>{shopeState?.singleShope && shopeState?.singleShope[0]?.shopeName}</p>
                        <div className='flex gap-1'>
                            <p>{shopeState?.singleShope && shopeState?.singleShope[0]?.addresses[0]?.city}</p>
                            <p>({shopeState?.singleShope && shopeState?.singleShope[0]?.addresses[0]?.province})</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='space-y-3'>
                <h1>Product</h1>
                <div className='grid xl:grid-cols-5  md:grid-cols-3 lg:grid-cols-4 grid-cols-2 md:gap-5 gap-2'>
                    {
                        shopeState?.singleShope && shopeState?.singleShope[0]?.products?.map((item, index) =>
                            <Link key={index} to={`/${item?.slug}`} className=' bg-white rounded-xl border'>
                                <img src={item?.images?.url} alt="" className='w-full  rounded-t-xl' />
                                <div className='p-3 space-y-1'>
                                    <p className='text-green-500'>{item?.shope?.shopeName}</p>
                                    <p className='line-clamp-2'>{item?.title}</p>
                                    <div className='flex justify-between items-center gap-3'>
                                        <p className='font-semibold'>Rp {item?.price}</p>
                                        <p className='opacity-85'>{item?.sold} Sold</p>
                                    </div>
                                </div>
                            </Link>

                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default SellerStore