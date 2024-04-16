import React, { useEffect, useState } from 'react'
import { getSingleProduct } from '../features/product/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../components/Button'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { addCart } from '../features/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CgProfile } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { addWishlist, getWishlist } from '../features/user/userSlice';
import { TbSquareRoundedMinus } from 'react-icons/tb';

const Detail = () => {
    const getSlug = location?.pathname?.split('/')[1]
    const token = useSelector(state => state?.auth?.user?.token)
    const productState = useSelector((state) => state?.product?.singleProduct)
    const loading = useSelector((state) => state?.product?.isLoading)
    const cartState = useSelector((state) => state?.cart?.cart)
    const wishlistState = useSelector(state => state?.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSingleProduct(getSlug))
    }, [])

    useEffect(() => {
        dispatch(getWishlist(token))
    }, [wishlistState.wishlistAdded])

    const [quantity, setQuantity] = useState(1)
    const [alreadyAdded, setAlreadyAdded] = useState(false);

    // useEffect(() => {
    // for (let index = 0; index < cartState?.length; index++) {
    //     if (productState?._id === cartState[index]?.product?._id) {
    // setAlreadyAdded(true)
    //     }
    // }
    // if (cartState && cartState?.filter(item => item?.product?._id === productState?._id).length > 0)
    //     setAlreadyAdded(true)
    // }, [])
    // console.log(productState?.shope?._id)

    let [cart, setCart] = useState(1)

    const addCartHandler = () => {
        // if (quantity > productState?.quantity) {
        //     toast.info("Out of Stock")
        // }
        // else if (cartState && cartState?.filter(item => item?.product?._id === productState?._id).length > 0) {
        //     toast.info("Cart Already Axist")
        // }
        // else 
        if (cart <= 0) {
            toast.info("Minimal Cart 1")
        } else {
            let data = {
                product: productState?._id,
                shope: productState?.shope?._id,
                quantity: cart,
                price: productState?.price
            }
            let userData = {
                data, token
            }
            dispatch(addCart(userData))
            // setTimeout(() => {
            //     setAlreadyAdded(true)
            // }, 200);
        }
    }

    const addToWishlistHandler = (id) => {
        const data = { token, id }
        dispatch(addWishlist(data))
    }

    const loginFirst = () => {
        toast.info("Please Login First")
    }
    // console.log(wishlistState.wishlist.wishlist)
    return (
        <section className='px-5 md:pb-0 pb-24'>
            {
                loading
                    ?
                    <div className='flex justify-center items-center h-96'>
                        <p>Loading...</p>
                    </div>
                    :
                    <div className='md:flex md:flex-row flex flex-col mt-5 container mx-auto justify-center gap-2'>
                        {/* <div className='flex'> */}
                        {/* <div className='w-24 h-96 flex flex-col'>
                                <img className='object-cover w-24 border-2' src={productState?.images?.url} alt="" />
                                <img className='object-cover w-24 border-2' src={productState?.images?.url} alt="" />
                                <img className='object-cover w-24 border-2' src={productState?.images?.url} alt="" />
                                <img className='object-cover w-24 border-2' src={productState?.images?.url} alt="" />
                            </div> */}
                        <div className='md:w-96 flex justify-center  '>
                            <img className='md:w-96 md:max-h-96 w-full h-full object-cover border rounded-xl' src={productState?.images?.url} alt="" />
                        </div>
                        {/* </div> */}
                        <div className='p-10 space-y-3 border rounded-xl'>
                            <p className='font-bold text-xl'>{productState?.title}</p>
                            <p>Price : Rp.{productState?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                            {/* <div className='flex items-center space-x-5'>
                                <p className=''>Qty :</p>
                                <input min={1} onChange={(e) => setQuantity(e.target.value)} value={quantity} type='number' className='p-1 rounded-xl w-10 focus:outline-none' />
                            </div> */}
                            <div className='flex items-center gap-10'>
                                <div className='flex gap-4 items-center py-3'>
                                    <button>
                                        <FaMinus size={25} onClick={() => setCart(cart === 1 ? 1 : cart - 1)} className='cursor-pointer border p-1 hover:border-2 border-black rounded-full' />
                                    </button>
                                    <span className='w-3 text-center'>
                                        {cart}
                                    </span>
                                    <button>
                                        <FaPlus size={25} onClick={() => setCart(cart + 1)} className='cursor-pointer border p-1 hover:border-2 border-black rounded-full' />
                                    </button>
                                </div>
                                <p>Stock : <span>{productState?.quantity}</span></p>
                            </div>
                            <div className='flex gap-3  items-center'>
                                <Button
                                    onClick={token ? addCartHandler : loginFirst}
                                    type='button'
                                    color='green'
                                    name='Add to Cart'
                                />
                                <FaHeart
                                    onClick={() => { token ? addToWishlistHandler(productState?._id) : loginFirst() }}
                                    size={22}
                                    className={`hover:opacity-95 cursor-pointer ${wishlistState.wishlist.wishlist && wishlistState.wishlist.wishlist?.filter((item) => item?._id === productState?._id).length === 1 ? "text-red-500 " : ""}`}
                                />
                            </div>
                            <Link to={`/seller/${productState?.shope?.shopeName}`} className='pt-5 flex gap-2 items-center'>
                                {
                                    productState?.shope
                                        ?
                                        <img className='h-12 w-12 object-cover rounded-2xl' src={productState?.shope?.avatar} alt="" />
                                        :
                                        <TbSquareRoundedMinus size={50} />
                                }
                                <p>{productState?.shope?.shopeName}</p>
                            </Link>
                            <p className='max-w-96'>{productState?.description}</p>
                        </div>
                    </div>
            }
        </section >
    )
}

export default Detail