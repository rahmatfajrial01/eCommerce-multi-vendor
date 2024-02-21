import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCart, getCart } from '../features/cart/cartSlice'
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa6";


const Cart = () => {

    const dispatch = useDispatch()
    const token = useSelector(state => state?.auth?.user?.token)

    useEffect(() => {
        dispatch(getCart(token))
    }, [])

    let handleDeleteCart = (id) => {
        let userData = {
            token, id
        }
        dispatch(deleteCart(userData))
    }

    const cartState = useSelector((state) => state?.cart)
    console.log(cartState?.cart)

    return (
        <section>
            <div className='container mx-auto space-y-2 mt-5'>
                <div className='flex border'>
                    <span className='w-5/12 p-1 ps-10'>Product</span>
                    <span className='w-3/12 p-1'>Unit Price</span>
                    <span className='w-3/12 p-1'> Quantity</span>
                    <span className='w-2/12 p-1'>Total Price</span>
                    <span className='w-2/12 p-1'>Action</span>
                </div>
                <div className='flex flex-col gap-2'>
                    {
                        cartState.cart && cartState.cart.map((item, index) =>
                            <div key={index} className='h-36 border flex '>
                                <div className='flex w-5/12'>
                                    <img className='w-36 h-36  object-cover p-1' src={item?.product?.images?.url} alt="" />
                                    <div className='p-5 flex items-center'>
                                        <p>{item?.product?.title}</p>
                                    </div>
                                </div>
                                <div className='w-3/12 py-5 flex items-center '>
                                    <p>Rp. {item?.product?.price}</p>
                                </div>
                                <div className='w-3/12 py-5 flex items-center'>
                                    <div className='flex gap-4 items-center'>
                                        <FaMinus className='cursor-pointer' />
                                        <input className='w-1 focus:outline-none' type="text" value={item?.quantity} />
                                        <FaPlus className='cursor-pointer' />
                                    </div>
                                </div>
                                <div className='w-2/12 py-5 flex items-center'>
                                    <p>Rp. {item?.product?.price}</p>
                                </div>
                                <div className='w-2/12 py-5 flex items-center ps-5'>
                                    <FaTrash onClick={() => handleDeleteCart(item?._id)} size={20} className='cursor-pointer' />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default Cart