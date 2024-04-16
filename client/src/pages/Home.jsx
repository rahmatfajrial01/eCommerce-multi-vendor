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
        <section className='px-5 md:px-0 pb-14 md:pb-0'>
            <div className='flex container pb-1 md:pb-7 mx-auto py-5 gap-5'>
                <div className='lg:w-8/12 w-full'>
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
                            bannerState.isLoading
                                ?
                                <div className='2xl:h-[250px] xl:h-[215px] lg:h-[200px] md:h-[190px] sm:h-[140px] h-[90px] w-full rounded-xl object-cover bg-slate-300 animate-pulse'></div>
                                :
                                bannerState?.allBanner && bannerState?.allBanner?.filter(item => item.type === "main").map((item, index) =>
                                    <SwiperSlide key={index}><img src={item?.image?.url} className='2xl:h-[250px] xl:h-[215px] lg:h-[200px] md:h-[190px] sm:h-[140px] h-[90px]  w-full rounded-xl object-cover'></img></SwiperSlide>
                                )
                        }
                    </Swiper>
                </div>
                <div className='w-4/12 space-y-5 hidden lg:block'>
                    {
                        bannerState.isLoading
                            ?
                            <div className='rounded-xl 2xl:h-[115px] xl:h-[97px] lg:h-[90px]  h-[90px] object-cover w-full bg-slate-300 animate-pulse'></div>
                            :
                            <img src={bannerState?.allBanner && bannerState?.allBanner?.filter(item => item?.type === "leftTop")[0]?.image?.url} className='rounded-xl 2xl:h-[115px]  xl:h-[97px] lg:h-[90px]  h-[90px] object-cover w-full'></img>
                    }
                    {
                        bannerState.isLoading
                            ?
                            <div className='rounded-xl 2xl:h-[115px] xl:h-[97px] lg:h-[90px]  h-[90px] object-cover w-full bg-slate-300 animate-pulse'></div>
                            :
                            <img src={bannerState?.allBanner && bannerState?.allBanner?.filter(item => item?.type === "leftBottom")[0]?.image?.url} className='rounded-xl 2xl:h-[115px] xl:h-[97px] lg:h-[90px]  h-[90px] object-cover w-full'></img>
                    }
                </div>
            </div>
            <div className='hidden lg:block'>
                <div className='container mx-auto grid grid-cols-5 gap-1 pb-5 opacity-80 rounded-xl px-2'>
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
                                <p className='font-semibold text-md'>24/7 Customer Suport</p>
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
                                <p className='text-sm'>protected payment</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className=' bg-white lg:pt-0 pt-5'>
                <div className='container mx-auto md:py-5 py-3 bg-white rounded-xl border  flex items-center'>
                    <Marquee>
                        {
                            brandState.isLoading
                                ?
                                ([...Array(12)].map((item, index) => (<div key={index} className='md:w-20 md:h-20 h-16 bg-slate-300 rounded-xl mx-9 animate-pulse'></div>)))
                                :
                                brandState.allBrand && brandState.allBrand.map((item, index) =>
                                    <div key={index} className='md:w-20 w-16 h-16 md:h-20 text-center rounded-xl md:mx-14 mx-9'><img src={item?.image?.url} alt="" /></div>
                                )
                        }
                    </Marquee>
                </div>
            </div>

            <div className='bg-white py-5 '>
                <div className='container mx-auto space-y-2'>
                    <h1>Featured Product</h1>
                    <Swiper
                        speed={1500}
                        slidesPerView={2}
                        spaceBetween={10}
                        navigation={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                            },
                            1536: {
                                slidesPerView: 6,
                                spaceBetween: 20,
                            },
                        }}
                        modules={[Autoplay, Pagination, Navigation]}

                    >
                        {
                            productState.isLoading
                                ?
                                <>

                                    {/* <div className='bg-slate-300 h-[370px] animate-pulse rounded-xl'></div> */}
                                    {([...Array(6)].map((item, index) => (<SwiperSlide key={index} className='rounded-xl h-[370px] flex flex-col gap-5  border' >
                                        <div className='bg-slate-300 rounded-t-xl animate-pulse h-52 md:h-60'></div>
                                        <div className='bg-slate-300 h-4 animate-pulse ms-4 me-4 rounded-xl'></div>
                                        <div className='bg-slate-300 h-4 animate-pulse ms-4 me-12 rounded-xl'></div>
                                        <div className='bg-slate-300 h-4 animate-pulse ms-4 me-7 rounded-xl'></div>
                                    </SwiperSlide>)))}

                                </>
                                :
                                productState.allProduct && productState.allProduct.filter(item => item?.tag === 'Featured').map((item, index) =>
                                    <SwiperSlide className='bg-white rounded-xl h-[370px]  border' key={index}>
                                        <Link to={item?.slug}>
                                            <img src={item?.images?.url} alt="" className='w-full h-52 md:h-60 object-cover rounded-t-xl' />
                                            <div className='p-3 space-y-1'>
                                                <p className='text-green-500'>{item?.shope?.shopeName}</p>
                                                <p className='line-clamp-2'>{item?.title}</p>
                                                <div className='md:flex md:flex-row flex flex-col justify-between gap-1'>
                                                    <p className='font-semibold'>Rp {item?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                                                    <p className='opacity-85'>{item?.sold} Sold</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )
                        }
                    </Swiper>
                </div>
            </div>
            <div className='bg-white pb-10 '>
                <div className='container mx-auto space-y-2'>
                    <h1>Other Product</h1>
                    <Swiper
                        speed={1500}
                        slidesPerView={2}
                        spaceBetween={10}
                        navigation={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                            },
                            1536: {
                                slidesPerView: 6,
                                spaceBetween: 20,
                            },
                        }}
                        modules={[Autoplay, Pagination, Navigation]}

                    >
                        {
                            productState.isLoading
                                ?
                                <>
                                    {/* <div className='bg-slate-300 h-[370px] animate-pulse rounded-xl'></div> */}
                                    {([...Array(6)].map((item, index) => (<SwiperSlide key={index} className='rounded-xl h-[370px] flex flex-col gap-5  border' >
                                        <div className='bg-slate-300 rounded-t-xl animate-pulse h-52 md:h-60'></div>
                                        <div className='bg-slate-300 h-4 animate-pulse ms-4 me-4 rounded-xl'></div>
                                        <div className='bg-slate-300 h-4 animate-pulse ms-4 me-12 rounded-xl'></div>
                                        <div className='bg-slate-300 h-4 animate-pulse ms-4 me-7 rounded-xl'></div>
                                    </SwiperSlide>)))}
                                </>
                                :
                                productState.allProduct && productState.allProduct.filter(item => item?.tag === 'Basic').map((item, index) =>
                                    <SwiperSlide className='bg-white rounded-xl w-max h-[370px] border' key={index}>
                                        <Link to={item?.slug}>
                                            <img src={item?.images?.url} alt="" className='w-full h-52 md:h-60 object-cover rounded-t-xl' />
                                            <div className='p-3 space-y-1'>
                                                <p className='text-green-500'>{item?.shope?.shopeName}</p>
                                                <p className='line-clamp-2'>{item?.title}</p>
                                                <div className='md:flex md:flex-row flex flex-col justify-between gap-1'>
                                                    <p className='font-semibold'>Rp {item?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                                                    <p className='opacity-85'>{item?.sold} Sold</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )
                        }
                    </Swiper>
                </div>
            </div>

        </section >
    )
}

export default Home