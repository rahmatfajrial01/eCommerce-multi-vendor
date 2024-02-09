import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <section>
            <div className='flex py-5 gap-5 container mx-auto'>
                <div className=' w-3/4'>
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
                        className="mySwiper rounded-xl"
                    >
                        <SwiperSlide><div className='h-80 flex justify-center items-center bg-green-500 rounded-xl'></div></SwiperSlide>
                        <SwiperSlide><div className='h-80 flex justify-center items-center bg-green-500 rounded-xl'></div></SwiperSlide>
                        <SwiperSlide><div className='h-80 flex justify-center items-center bg-green-500 rounded-xl'></div></SwiperSlide>
                        <SwiperSlide><div className='h-80 flex justify-center items-center bg-green-500 rounded-xl'></div></SwiperSlide>
                        <SwiperSlide><div className='h-80 flex justify-center items-center bg-green-500 rounded-xl'></div></SwiperSlide>
                        <SwiperSlide><div className='h-80 flex justify-center items-center bg-green-500 rounded-xl'></div></SwiperSlide>
                        <SwiperSlide><div className='h-80 flex justify-center items-center bg-green-500 rounded-xl'></div></SwiperSlide>
                        <SwiperSlide><div className='h-80 flex justify-center items-center bg-green-500 rounded-xl'></div></SwiperSlide>
                        <SwiperSlide><div className='h-80 flex justify-center items-center bg-green-500 rounded-xl'></div></SwiperSlide>
                    </Swiper>
                </div>
                <div className='w-1/4 flex flex-col gap-5 '>
                    <div className='h-1/2 flex justify-center items-center bg-green-500 rounded-xl'></div>
                    <div className='h-1/2 flex justify-center items-center bg-green-500 rounded-xl'></div>
                </div>
            </div>
            <div className='bg-slate-200'>
                <div className='container mx-auto grid grid-cols-5 gap-5 py-5'>
                    <div className='h-20 bg-blue-500 rounded-xl'></div>
                    <div className='h-20 bg-blue-500 rounded-xl'></div>
                    <div className='h-20 bg-blue-500 rounded-xl'></div>
                    <div className='h-20 bg-blue-500 rounded-xl'></div>
                    <div className='h-20 bg-blue-500 rounded-xl'></div>
                    <div className='h-20 bg-blue-500 rounded-xl'></div>
                    <div className='h-20 bg-blue-500 rounded-xl'></div>
                    <div className='h-20 bg-blue-500 rounded-xl'></div>
                    <div className='h-20 bg-blue-500 rounded-xl'></div>
                    <div className='h-20 bg-blue-500 rounded-xl'></div>
                </div>
            </div>
            <div className='bg-slate-200'>
                <div className='container mx-auto py-5 bg-white rounded-xl'>
                    <Marquee>
                        <div className='h-10 w-20 bg-blue-500 text-center rounded-xl mx-10'></div>
                        <div className='h-10 w-20 bg-blue-500 text-center rounded-xl mx-10'></div>
                        <div className='h-10 w-20 bg-blue-500 text-center rounded-xl mx-10'></div>
                        <div className='h-10 w-20 bg-blue-500 text-center rounded-xl mx-10'></div>
                        <div className='h-10 w-20 bg-blue-500 text-center rounded-xl mx-10'></div>
                        <div className='h-10 w-20 bg-blue-500 text-center rounded-xl mx-10'></div>
                        <div className='h-10 w-20 bg-blue-500 text-center rounded-xl mx-10'></div>
                        <div className='h-10 w-20 bg-blue-500 text-center rounded-xl mx-10'></div>
                        <div className='h-10 w-20 bg-blue-500 text-center rounded-xl mx-10'></div>
                        <div className='h-10 w-20 bg-blue-500 text-center rounded-xl mx-10'></div>
                        <div className='h-10 w-20 bg-blue-500 text-center rounded-xl mx-10'></div>
                        <div className='h-10 w-20 bg-blue-500 text-center rounded-xl mx-10'></div>
                    </Marquee>
                </div>
            </div>
            <div className='bg-slate-200 py-5 '>
                <div className='container mx-auto space-y-2'>
                    <h1>Featured Product</h1>
                    <div className='grid grid-cols-4 gap-5'>
                        <Link to={'/detail'} className='h-52 bg-green-500 rounded-xl'></Link>
                        <Link to={'/detail'} className='h-52 bg-green-500 rounded-xl'></Link>
                        <Link to={'/detail'} className='h-52 bg-green-500 rounded-xl'></Link>
                        <Link to={'/detail'} className='h-52 bg-green-500 rounded-xl'></Link>
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

        </section>
    )
}

export default Home