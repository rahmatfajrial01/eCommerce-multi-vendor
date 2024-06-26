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
    FaSearch,
    FaShoppingBag
} from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { MdCategory } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser, resetState } from '../features/auth/authSlice';
import { Menu } from '@headlessui/react'
import { getCart } from '../features/cart/cartSlice';
import { setCategory, sortProduct } from '../features/product/productSlice';
import { getAllProductCategory } from '../features/category/productCategorySlice';
import { getAllBrand } from '../features/brand/brandSlice';
import { setSearchs } from '../features/product/productSlice';
import { toast } from 'react-toastify';

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
        userState?.addressAdded,
        userState?.wishlistAdded
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
        // let data = { search }
        // dispatch(sortProduct(data))
        navigate(`/store`)
        dispatch(setSearchs(search))
    }
    let handleCat = (a) => {
        dispatch(setCategory(a))
        setCat(false)
        navigate(`/store`)
        setTimeout(() => {
            setCat(true)
        }, 200);
    }

    // console.log(authState?.currentUser)
    const loginFirst = () => {
        toast.info("Please Login First")
    }

    return (
        <header className='bg-green-600 text-white py-2 w-full fixed top-0  z-10 px-5'>
            <section className='container mx-auto'>
                <div className='md:flex justify-between text-sm hidden' >
                    <div className='flex gap-3'>
                        <FaInstagram />
                        <FaTiktok />
                        <FaTwitterSquare />
                        <FaFacebook />
                    </div>
                    <div>Telephone +078678668709</div>
                </div>
                <div className='flex justify-between md:gap-6 gap-3 py-2 items-center'>
                    <div className='font-semibold text-2xl hidden md:block'><a href="/">eCommerce.</a> </div>
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
                    <div className='md:hidden'>
                        {
                            authState?.currentUser ?
                                <>
                                    <Link to={'/cart'} className='relative flex items-center py-1 me-2 hover:opacity-85'>
                                        <FaShoppingCart size={22} />
                                        {authState?.currentUser && <span className='absolute -top-1 left-3 bg-slate-600 text-sm text-white h-5 px-1 min-w-5 text-center rounded-full'>{cartState?.cart?.card_product_count}</span>}
                                    </Link>
                                </> :
                                <>
                                    <div onClick={loginFirst} className='relative flex items-center py-1 me-2 hover:opacity-85 cursor-pointer'><FaShoppingCart size={22} /></div>
                                </>
                        }
                    </div>
                    <div className='md:flex gap-3 text-md hidden'>
                        {
                            authState?.currentUser ?
                                <>
                                    <Link to={'/cart'} className='relative flex items-center py-1 me-2 hover:opacity-85'>
                                        <FaShoppingCart size={22} />
                                        {authState?.currentUser && <span className='absolute -top-1 left-3 bg-slate-600 text-sm text-white h-5 px-1 min-w-5 text-center rounded-full'>{cartState?.cart?.card_product_count}</span>}
                                    </Link>
                                    <Link to={'/user/wishlist'} className='relative flex items-center py-1 me-2 hover:opacity-85'><FaHeart size={21} />
                                        {authState?.currentUser && <span className='absolute -top-1 left-3 bg-slate-600 text-sm text-white h-5 px-1 min-w-5 text-center rounded-full'>{authState?.currentUser?.wishlist?.length}</span>}
                                    </Link>
                                    <Link to={'/user/order'} className='relative flex items-center py-1 me-2 hover:opacity-85'><FaShoppingBag size={21} />
                                        {/* {authState?.currentUser && <span className='absolute -top-1 left-3 bg-slate-600 text-sm text-white h-5 px-1 min-w-5 text-center rounded-full'>{authState?.currentUser?.wishlist?.length}</span>} */}
                                    </Link>
                                </> :
                                <>
                                    <div onClick={loginFirst} className='relative flex items-center py-1 me-2 hover:opacity-85 cursor-pointer'><FaShoppingCart size={22} /></div>
                                    <div onClick={loginFirst} className='relative flex items-center py-1 me-2 hover:opacity-85 cursor-pointer'><FaHeart size={21} /></div>
                                    <div onClick={loginFirst} className='relative flex items-center py-1 me-2 hover:opacity-85 cursor-pointer'><FaShoppingBag size={21} /></div>
                                </>
                        }
                        {/* <Link to={'/user/order'} className='flex items-center py-1 rounded-full'><FaList /></Link> */}
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
                                            <Link to={'/admin'} target="_blank" className='flex items-center gap-1 py-1 px-1  hover:opacity-80 w-max'>Seller Center</Link>
                                            :
                                            <Link to={'/admin/register'} className='flex items-center gap-1 py-1 px-3  hover:opacity-80 w-max'>Be Seller</Link>

                                    }
                                    <div className='relative'>
                                        <Menu>
                                            <Menu.Button className='flex gap-2 items-center w-max hover:opacity-85'>
                                                {/* <span className='border-2 flex items-center gap-1 py-1 px-3 rounded-full hover:opacity-80'>Account</span> */}
                                                <p className='max-w-24 truncate'>{authState?.currentUser?.username}</p>
                                                {
                                                    authState?.currentUser?.avatar
                                                        ?
                                                        <img className='h-9 w-9 border object-cover rounded-full' src={authState?.currentUser?.avatar} alt="" />
                                                        :
                                                        <RxAvatar size={30} />
                                                }
                                            </Menu.Button>
                                            <Menu.Items className='absolute w-max bg-white text-black right-0 top-10 p-3 rounded-xl flex flex-col text-end border'>
                                                <Menu.Item>
                                                    <Link className='hover:bg-slate-300 px-2 py-1 rounded-xl transition-all' to={'/user'}>Profile</Link>
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
                <div className='justify-between md:flex text-sm hidden'>
                    <div className='relative group cursor-pointer'>
                        <p className='flex gap-2 items-center'><span><MdCategory size={12} /></span>Category</p>
                        <div className={`${cat ? "group-hover:block" : ""} hidden absolute left-0 bg-green-600 pt-4 px-5 pb-4 space-y-3 rounded-b-xl text-white`}>
                            {
                                CategoryState.allProductCategory && CategoryState.allProductCategory.map((item, index) =>
                                    <p className='hover:text-slate-300' onClick={() => handleCat(item._id)} key={index}>{item?.title}</p>
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