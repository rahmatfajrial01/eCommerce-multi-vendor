import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBanner } from '../features/banner/bannerSlice';
import { getAllBrand } from '../features/brand/brandSlice';

import { FaShippingFast, FaGift, FaHeadset } from "react-icons/fa";
import { LuBadgePercent } from "react-icons/lu";
import { MdPayment } from "react-icons/md";
import { getAllProduct } from '../features/product/productSlice';

import { CgProfile } from "react-icons/cg";

const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllBanner())
        dispatch(getAllProduct())
    }, [])
    const bannerState = useSelector(state => state?.banner)
    const brandState = useSelector(state => state?.brand)
    const productState = useSelector(state => state?.product)
    // console.log(bannerState?.allBanner.filter(item => item.type === "leftBottom")[0]?.image?.url)
    // console.log(productState.allProduct)
    return (
        <section>
            <div className='flex container pb-7 mx-auto py-5 gap-5'>
                <div className='w-8/12'>
                    <Swiper
                        speed={2000}
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        // navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper rounded-xl "
                    >
                        {
                            bannerState.allBanner && bannerState.allBanner.filter(item => item.type === "main").map((item, index) =>
                                <SwiperSlide key={index}><img src={item?.image?.url} className='h-[300px] w-full rounded-xl object-cover'></img></SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>
                <div className='w-4/12 space-y-5'>
                    <img src={bannerState?.allBanner && bannerState?.allBanner?.filter(item => item?.type === "leftTop")[0]?.image?.url} className='rounded-xl h-[140px] object-cover w-full'></img>
                    <img src={bannerState?.allBanner && bannerState?.allBanner?.filter(item => item?.type === "leftBottom")[0]?.image?.url} className='rounded-xl h-[140px] object-cover w-full'></img>
                </div>
            </div>
            <div className='bg-slate-200'>
                <div className='container mx-auto grid grid-cols-5 gap-5 py-5 opacity-80'>
                    <div className='h-20  rounded-xl flex justify-center items-center '>
                        <div className='flex gap-3'>
                            <FaShippingFast className='text-4xl' />
                            <div>
                                <p className='font-semibold text-md'>Free Shipping</p>
                                <p className='text-sm'>from all order over $100</p>
                            </div>
                        </div>
                    </div>
                    <div className='h-20  rounded-xl flex justify-center items-center '>
                        <div className='flex gap-5'>
                            <FaGift className='text-4xl' />
                            <div>
                                <p className='font-semibold text-md'>Daily Surprise Offers</p>
                                <p className='text-sm'>save up to 25% off</p>
                            </div>
                        </div>
                    </div>
                    <div className='h-20  rounded-xl flex justify-center items-center '>
                        <div className='flex gap-5'>
                            <FaHeadset className='text-4xl' />
                            <div>
                                <p className='font-semibold text-md'>FaHeadset 24/7</p>
                                <p className='text-sm'>shop with an expert</p>
                            </div>
                        </div>
                    </div>
                    <div className='h-20  rounded-xl flex justify-center items-center '>
                        <div className='flex gap-5'>
                            <LuBadgePercent className='text-4xl' />
                            <div>
                                <p className='font-semibold text-md'>Affordable Price</p>
                                <p className='text-sm'>get factory direct price</p>
                            </div>
                        </div>
                    </div>
                    <div className='h-20  rounded-xl flex justify-center items-center '>
                        <div className='flex gap-5'>
                            <MdPayment className='text-5xl' />
                            <div>
                                <p className='font-semibold text-md'>Secure Payment</p>
                                <p className='text-sm'>100% protected payment</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='bg-slate-200'>
                <div className='container mx-auto py-5 bg-white rounded-xl'>
                    <Marquee>
                        {
                            brandState.allBrand && brandState.allBrand.map((item, index) =>
                                <div key={index} className='h-full w-20  text-center rounded-xl mx-10'><img src={item?.image?.url} alt="" /></div>
                            )
                        }
                    </Marquee>
                </div>
            </div>
            <div className='bg-slate-200 py-5 '>
                <div className='container mx-auto space-y-2'>
                    <h1>Featured Product</h1>
                    <div className='grid grid-cols-4 gap-5'>
                        {
                            productState.allProduct && productState.allProduct.filter(item => item?.tag === 'Featured').map((item, index) =>
                                <Link key={index} to={item?.slug} className=' bg-white rounded-xl'>
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
                        }
                    </div>
                </div>
            </div>
            <div className='bg-slate-200 py-5 '>
                <div className='container mx-auto space-y-2'>
                    <h1>Favorite Product</h1>
                    <div className='grid grid-cols-4 gap-5'>
                        <div className='h-52 bg-blue-500 rounded-xl'></div>
                        <div className='h-52 bg-blue-500 rounded-xl'></div>
                        <div className='h-52 bg-blue-500 rounded-xl'></div>
                        <div className='h-52 bg-blue-500 rounded-xl'></div>
                    </div>
                </div>
            </div>
            <div className='bg-slate-200 py-5 '>
                <div className='container mx-auto space-y-2'>
                    <h1>Latest Product</h1>
                    <div className='grid grid-cols-4 gap-5'>
                        <div className='h-52 bg-red-500 rounded-xl'></div>
                        <div className='h-52 bg-red-500 rounded-xl'></div>
                        <div className='h-52 bg-red-500 rounded-xl'></div>
                        <div className='h-52 bg-red-500 rounded-xl'></div>
                    </div>
                </div>
            </div>
            <div className='bg-slate-200 py-5 '>
                <div className='container mx-auto space-y-2'>
                    <h1>Other Product</h1>
                    <div className='grid grid-cols-4 gap-5'>
                        <div className='h-52 bg-orange-500 rounded-xl'></div>
                        <div className='h-52 bg-orange-500 rounded-xl'></div>
                        <div className='h-52 bg-orange-500 rounded-xl'></div>
                        <div className='h-52 bg-orange-500 rounded-xl'></div>
                        <div className='h-52 bg-orange-500 rounded-xl'></div>
                        <div className='h-52 bg-orange-500 rounded-xl'></div>
                        <div className='h-52 bg-orange-500 rounded-xl'></div>
                        <div className='h-52 bg-orange-500 rounded-xl'></div>
                    </div>
                </div>
            </div>

        </section >
    )
}

export default Home