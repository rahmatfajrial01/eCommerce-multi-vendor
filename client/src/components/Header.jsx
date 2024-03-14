import React, { useEffect, useState } from 'react'
import {
    FaInstagram,
    FaTiktok,
    FaTwitterSquare,
    FaFacebook,
    FaHeart,
    FaShoppingCart,
    FaList,
    FaUser,
    FaSearch
} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser, resetState } from '../features/auth/authSlice';
import { Menu } from '@headlessui/react'
import { getCart } from '../features/cart/cartSlice';
import { sortProduct } from '../features/product/productSlice';
import { getAllProductCategory } from '../features/category/productCategorySlice';
import { getAllBrand } from '../features/brand/brandSlice';

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authState = useSelector(state => state?.auth)
    const shopeState = useSelector(state => state?.shope)
    const cartState = useSelector((state) => state?.cart)
    const userState = useSelector((state) => state?.user)
    const CategoryState = useSelector((state) => state?.productCategory)

    // console.log(CategoryState)

    let [cat, setCat] = useState(true)

    const handleLogout = () => {
        // localStorage.clear()
        // navigate('/')
        // window.location.reload()
        setTimeout(() => {
            dispatch(logoutUser())
        }, 100);
        dispatch(resetState())
    }

    useEffect(() => {
        dispatch(getCurrentUser(authState?.user?.token))
    }, [
        shopeState?.createdShope,
        userState?.addressDeleted,
        userState?.addressAdded
    ])

    useEffect(() => {
        dispatch(getCart(authState?.user?.token))
    }, [
        cartState?.addCart,
        cartState?.cartDeleted
    ])

    useEffect(() => {
        dispatch(getAllProductCategory())
        dispatch(getAllBrand())
    }, [])

    let [search, setSearch] = useState("")

    let handleSearch = (e) => {
        e.preventDefault()
        dispatch(sortProduct(search))
        navigate(`/store`)
    }
    let handleCat = () => {
        setCat(false)
        navigate(`/store`)
        setTimeout(() => {
            setCat(true)
        }, 200);
    }

    return (
        <header className='bg-green-600 text-white py-2 w-full fixed top-0  z-10'>
            <section className='container mx-auto'>
                <div className='flex justify-between text-sm' >
                    <div className='flex gap-3'>
                        <FaInstagram />
                        <FaTiktok />
                        <FaTwitterSquare />
                        <FaFacebook />
                    </div>
                    <div>Telephone +078678668709</div>
                </div>
                <div className='flex justify-between gap-6 py-2 items-center'>
                    <div className='font-semibold text-2xl'><a href="/">eCommerce.</a> </div>
                    <form onSubmit={handleSearch} className='flex items-center w-full border-2 rounded-full bg-white border-white'>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='search...'
                            className='text-black w-full py-1 px-3 focus:outline-none rounded-s-full text-sm'
                            type="text"
                        />
                        <button type='submit' className='text-black py-2 px-3 rounded-full hover:opacity-80 bg-green-600'><FaSearch className='text-white' /></button>
                    </form>
                    <div className='flex gap-3 text-md'>
                        <Link to={'/wishlist'} className='flex items-center gap-1 py-1 px-3 rounded-full'><FaHeart />Wishlist</Link>
                        <Link to={'/cart'} className='flex items-center gap-1 py-1 px-3 rounded-full '>
                            <FaShoppingCart />Cart<span className='border-2 rounded-full px-2'>{cartState?.cart?.card_product_count}</span></Link>
                        <Link to={'/order'} className='flex items-center gap-1 py-1 px-3 rounded-full'><FaList />Orders</Link>
                        {
                            authState?.user === null
                                ?
                                <>
                                    <Link to={'/register'} className='border-2 flex items-center gap-1 py-1 px-3 rounded-full hover:opacity-80'>Register</Link>
                                    <Link to={'/login'} className='border-2 flex items-center gap-1 py-1 px-3 rounded-full hover:opacity-80'>Login</Link>
                                </>
                                :
                                <>
                                    {
                                        authState?.currentUser?.role >= 2
                                            ?
                                            <Link to={'/admin'} target="_blank" className='border-2 flex items-center gap-1 py-1 px-3 rounded-full hover:opacity-80'>Seller</Link>
                                            :
                                            <Link to={'/admin/register'} className='border-2 flex items-center gap-1 py-1 px-3 rounded-full hover:opacity-80'>Seller</Link>

                                    }
                                    <div className='relative'>
                                        <Menu>
                                            <Menu.Button className='flex items-center'>
                                                <span className='border-2 flex items-center gap-1 py-1 px-3 rounded-full hover:opacity-80'>Account</span>
                                            </Menu.Button>
                                            <Menu.Items className='absolute w-max bg-white text-black right-0 top-10 p-3 rounded-xl flex flex-col text-end border'>
                                                <Menu.Item>
                                                    <Link className='hover:bg-slate-300 px-2 py-1 rounded-xl transition-all' to={'/profile'}>Profile</Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link to={'/'} className='hover:bg-slate-300 px-2 py-1 rounded-xl transition-all '
                                                        onClick={handleLogout}
                                                    >Logout</Link>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Menu>
                                    </div>
                                </>
                        }
                    </div>
                </div>
                <div className='justify-between flex text-sm'>
                    <div className='relative group cursor-pointer'>
                        <p>Category</p>
                        <div className={`${cat ? "group-hover:block" : ""} hidden absolute left-0 bg-green-600 pt-4 px-5 pb-4 space-y-3 rounded-b-xl text-white`}>
                            {
                                CategoryState.allProductCategory && CategoryState.allProductCategory.map((item, index) =>
                                    <p className='hover:text-slate-300' onClick={() => handleCat()} key={index}>{item?.title}</p>
                                )
                            }
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <Link to={'/'}>Home</Link>
                        <Link to={'store'}>Store</Link>
                        <Link to={'/'}>Contact</Link>
                    </div>
                </div>
            </section>
        </header>
    )
}

export default Header