import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlist, getWishlist } from '../features/user/userSlice'
import { RxCross1 } from "react-icons/rx";
import { Button } from '../components/Button';
import { addCart } from '../features/cart/cartSlice';

const Wishlist = () => {
    const token = useSelector(state => state?.auth?.user?.token)
    const wishlistState = useSelector(state => state?.user)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getWishlist(token))
    }, [wishlistState.wishlistAdded])

    const addToWishlistHandler = (id) => {
        const data = { token, id }
        dispatch(addWishlist(data))
    }

    const addToCart = (a, b, c) => {
        let data = {
            product: a,
            shope: b,
            quantity: 1,
            price: c
        }
        let userData = {
            data, token
        }
        dispatch(addCart(userData))
    }

    return (
        <section className='pt-5'>
            <div className='container mx-auto gap-5 grid grid-cols-5'>
                {
                    wishlistState?.wishlist?.wishlist && wishlistState?.wishlist?.wishlist.filter(item => item?.tag === 'Featured').map((item, index) =>
                        <div key={index} className=' bg-white rounded-xl border relative'>
                            <img src={item?.images?.url} alt="" className='h-56 w-full  rounded-t-xl' />
                            <div className='p-3 space-y-1'>
                                <p className='text-green-500'>{item?.shope?.shopeName}</p>
                                <p>{item?.title}</p>
                                <div className='flex justify-between items-center gap-3'>
                                    <p className='font-semibold'>Rp {item?.price}</p>
                                    <p className='opacity-85'>{item?.sold} Sold</p>
                                </div>
                            </div>
                            <div className='p-5'>
                                <Button
                                    onClick={() => addToCart(item?._id, item?.shope, item?.price)}
                                    type='button'
                                    color='green'
                                    name='Add to Cart'
                                    w='full'
                                />
                            </div>
                            <RxCross1
                                size={25}
                                className='absolute top-3 right-3 bg-white p-1 rounded-full cursor-pointer'
                                onClick={() => addToWishlistHandler(item?._id)}
                            />

                        </div>

                    )
                }
            </div>
        </section>
    )
}

export default Wishlist