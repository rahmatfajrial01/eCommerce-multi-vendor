import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { CgMenuGridR, CgMenu } from "react-icons/cg";
import { sortProduct } from '../features/product/productSlice'
import { IoClose } from "react-icons/io5";
import { Menu } from '@headlessui/react'
import Modal from '../components/Modal'

const Store = () => {
    const dispatch = useDispatch()
    const CategoryState = useSelector((state) => state?.productCategory)
    const brandState = useSelector(state => state?.brand)
    const sendState = useSelector(state => state?.product)
    // useEffect(() => {
    //     dispatch(resetStateSort())
    // }, [])
    const productState = useSelector(state => state?.product)
    let [sort, setSort] = useState("title")
    let [category, setCategory] = useState("")
    let [tag, setTag] = useState("")
    let [brand, setBrand] = useState("")
    let [minPrice, setMinPrice] = useState("")
    let [CMinPrice, setCMinPrice] = useState("")
    let [maxPrice, setMaxPrice] = useState("")
    let [CMaxPrice, setCMaxPrice] = useState("")

    useEffect(() => {
        let data = { category: category || sendState.valueCat, tag, brand, search: sendState.value, maxPrice, minPrice, sort }
        dispatch(sortProduct(data))
    }, [category, tag, brand, sendState.value, sendState.valueCat, maxPrice, minPrice, sort])

    let handlePrice = (e) => {
        e.preventDefault()
        setMinPrice(CMinPrice)
        setMaxPrice(CMaxPrice)
        // console.log(minPrice, maxPrice)
    }
    console.log(sort)

    // const closeModal = (e) => {
    //     if (e === 'container') {
    //         setIsOpen(false)
    //     }
    // }
    let [isOpen, setIsOpen] = useState(false)
    return (
        <section className='md:mb-7 mb-24 px-5'>
            <div className='flex gap-3 container mx-auto pt-5'>
                <div className=' md:w-1/5 md:flex md:flex-col gap-2 hidden'>
                    <div className='bg-white border rounded-xl p-3'>
                        <p className='font-semibold mb-2'>Categories</p>
                        {
                            CategoryState.allProductCategory && CategoryState.allProductCategory.map((item, index) =>
                                <p className='cursor-pointer' onClick={() => setCategory(item?._id)} key={index}>{item?.title}</p>
                            )
                        }
                    </div>
                    <div className='bg-white border rounded-xl p-3'>
                        <p className='font-semibold mb-2'>Price</p>
                        <form onSubmit={handlePrice} className='space-y-3'>
                            <input onChange={(e) => setCMinPrice(e.target.value)} value={CMinPrice} placeholder='min-price' type="number" className='border w-full rounded-xl py-1 px-2' />
                            <input onChange={(e) => setCMaxPrice(e.target.value)} value={CMaxPrice} placeholder='max-price' type="number" className='border w-full rounded-xl py-1 px-2' />
                            <button type='submit' className='border p-1 rounded-xl w-full'>Submit</button>
                        </form>
                    </div>
                    <div className='bg-white border rounded-xl p-3'>
                        <p className='font-semibold mb-2'>Produck Tages</p>
                        <div className='space-y-3'>
                            <div onClick={() => setTag('Basic')} className='border p-1 rounded-xl cursor-pointer'>Basic</div>
                            <div onClick={() => setTag('Featured')} className='border p-1 rounded-xl cursor-pointer'>Featured</div>
                        </div>
                    </div>
                    <div className='bg-white border rounded-xl p-3'>
                        <p className='font-semibold mb-2'>Brands</p>
                        <div className='flex flex-wrap gap-2'>
                            {
                                brandState.allBrand && brandState.allBrand.map((item, index) =>
                                    <div key={index} onClick={() => setBrand(item?._id)} className='border p-1 rounded-xl w-max cursor-pointer'>{item?.title}</div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='md:w-4/5 flex flex-col gap-3 w-full '>
                    <div className='py-1 bg-white border rounded-xl flex justify-between'>
                        <div className='flex items-center gap-2 ps-5'>
                            <span className='font-semibold hidden md:block'>Sort By :</span>
                            <select onChange={(e) => setSort(e.target.value)} value={sort} className='border p-1 rounded-lg' name="" id="">
                                <option value="title">Alphabetically, A-Z</option>
                                <option value="-title">Alphabetically, Z-A</option>
                                <option value="price">price low to hight</option>
                                <option value="-price">price hight to low</option>
                                <option value="createdAt">date old to new</option>
                                <option value="-createdAt">date low to old </option>
                            </select>
                        </div>
                        <div className='md:flex items-center pe-5 hidden'>
                            <CgMenu size={30} />
                            <CgMenuGridR size={28} />
                        </div>
                        <div onClick={() => setIsOpen(true)} className='py-1 px-2 rounded-xl border me-5 md:hidden cursor-pointer'>
                            filter
                        </div>
                        {
                            isOpen &&
                            <div className='fixed z-20 w-full top-0 right-0 bg-green-600  space-y-3  p-5 border  overflow-y-auto h-full md:hidden'>
                                <IoClose onClick={() => setIsOpen(false)} size={30} />
                                <div className='bg-white border rounded-xl p-3'>
                                    <p className='font-semibold mb-2'>Categories</p>
                                    {
                                        CategoryState.allProductCategory && CategoryState.allProductCategory.map((item, index) =>
                                            <p className='cursor-pointer' onClick={() => setCategory(item?._id)} key={index}>{item?.title}</p>
                                        )
                                    }
                                </div>
                                <div className='bg-white border rounded-xl p-3'>
                                    <p className='font-semibold mb-2'>Price</p>
                                    <form onSubmit={handlePrice} className='space-y-3'>
                                        <input onChange={(e) => setCMinPrice(e.target.value)} value={CMinPrice} placeholder='min-price' type="number" className='border w-full rounded-xl py-1 px-2' />
                                        <input onChange={(e) => setCMaxPrice(e.target.value)} value={CMaxPrice} placeholder='max-price' type="number" className='border w-full rounded-xl py-1 px-2' />
                                        <button type='submit' className='border p-1 rounded-xl w-full'>Submit</button>
                                    </form>
                                </div>
                                <div className='bg-white border rounded-xl p-3'>
                                    <p className='font-semibold mb-2'>Produck Tages</p>
                                    <div className='space-y-3'>
                                        <div onClick={() => setTag('Basic')} className='border p-1 rounded-xl cursor-pointer'>Basic</div>
                                        <div onClick={() => setTag('Featured')} className='border p-1 rounded-xl cursor-pointer'>Featured</div>
                                    </div>
                                </div>
                                <div className='bg-white border rounded-xl p-3'>
                                    <p className='font-semibold mb-2'>Brands</p>
                                    <div className='flex flex-wrap gap-2'>
                                        {
                                            brandState.allBrand && brandState.allBrand.map((item, index) =>
                                                <div key={index} onClick={() => setBrand(item?._id)} className='border p-1 rounded-xl w-max cursor-pointer'>{item?.title}</div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className=' grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2'>
                        {
                            productState?.sortProducts?.length > 0
                                ?
                                (
                                    productState?.sortProducts.map((item, index) =>
                                        <Link to={`/${item?.slug}`} key={index} className=' bg-white rounded-xl border relative'>
                                            <img src={item?.images?.url} alt="" className='h-56 w-full  rounded-t-xl' />
                                            <div className='p-3 space-y-1'>
                                                <p className='text-green-500'>{item?.shope?.shopeName}</p>
                                                <p className='line-clamp-3'>{item?.title}</p>
                                                <div className='flex justify-between items-center gap-3'>
                                                    <p className='font-semibold'>Rp {item?.price}</p>
                                                    <p className='opacity-85'>{item?.sold} Sold</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                )
                                :
                                <div className='h-40 flex items-center justify-center col-span-5'>
                                    <p>no product found</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
            {/* <div id='container' onClick={(e) => closeModal(e.target.id)} className={`fixed px-5 inset-0  w-full z-10 min-h-screen  ${isOpen === true ? "flex justify-center items-center" : "hidden"}`}>
                <div className='w-full bg-green-600  space-y-3 bg-whitew  p-5 border rounded-xl overflow-y-auto h-[500px] '>
                    <IoClose onClick={() => setIsOpen(false)} size={30} />
                    <div className='bg-white border rounded-xl p-3'>
                        <p className='font-semibold mb-2'>Categories</p>
                        {
                            CategoryState.allProductCategory && CategoryState.allProductCategory.map((item, index) =>
                                <p className='cursor-pointer' onClick={() => setCategory(item?._id)} key={index}>{item?.title}</p>
                            )
                        }
                    </div>
                    <div className='bg-white border rounded-xl p-3'>
                        <p className='font-semibold mb-2'>Price</p>
                        <form onSubmit={handlePrice} className='space-y-3'>
                            <input onChange={(e) => setCMinPrice(e.target.value)} value={CMinPrice} placeholder='min-price' type="number" className='border w-full rounded-xl py-1 px-2' />
                            <input onChange={(e) => setCMaxPrice(e.target.value)} value={CMaxPrice} placeholder='max-price' type="number" className='border w-full rounded-xl py-1 px-2' />
                            <button type='submit' className='border p-1 rounded-xl w-full'>Submit</button>
                        </form>
                    </div>
                    <div className='bg-white border rounded-xl p-3'>
                        <p className='font-semibold mb-2'>Produck Tages</p>
                        <div className='space-y-3'>
                            <div onClick={() => setTag('Basic')} className='border p-1 rounded-xl cursor-pointer'>Basic</div>
                            <div onClick={() => setTag('Featured')} className='border p-1 rounded-xl cursor-pointer'>Featured</div>
                        </div>
                    </div>
                    <div className='bg-white border rounded-xl p-3'>
                        <p className='font-semibold mb-2'>Brands</p>
                        <div className='flex flex-wrap gap-2'>
                            {
                                brandState.allBrand && brandState.allBrand.map((item, index) =>
                                    <div key={index} onClick={() => setBrand(item?._id)} className='border p-1 rounded-xl w-max cursor-pointer'>{item?.title}</div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div> */}
        </section >
    )
}

export default Store