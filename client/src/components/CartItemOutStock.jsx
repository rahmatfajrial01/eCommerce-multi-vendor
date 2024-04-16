import React, { useEffect, useState } from 'react'
import { FaGraduationCap, FaMinus, FaPlus, FaTrash } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { changeQtyCart, deleteCart } from '../features/cart/cartSlice'

const CartItem = (props) => {
    const { item } = props
    const [cart, setCart] = useState(item?.quantity)
    const [totalAmount, setTotalAmount] = useState(item?.product?.price * cart)
    const token = useSelector(state => state?.auth?.user?.token)

    const dispatch = useDispatch()

    const Increment = (id) => {
        if (cart === item?.product?.quantity) {
            setCart(cart)
        } else {
            setCart(cart + 1)
            // setTotalAmount((cart + 1) * item?.price)
            const data = { id, quantity: cart + 1 }
            const userData = {
                token, data
            }
            dispatch(changeQtyCart(userData))
        }
    };

    const Decrement = (id) => {
        setCart(cart === 1 ? 1 : cart - 1);
        // setTotalAmount((cart === 1 ? 1 : cart - 1) * item?.price)
        const data = { id, quantity: cart === 1 ? 1 : cart - 1 }
        const userData = {
            token, data
        }
        dispatch(changeQtyCart(userData))
    };

    let handleDeleteCart = (id) => {
        let userData = {
            token, id
        }
        dispatch(deleteCart(userData))
    }
    // console.log(item?.quantity > item?.product?.quantity)
    let price = item?.products[0]?.price * cart
    return (
        <>
            {/* <div className='h-36 flex border-t'>
                <div className='flex w-5/12'>
                    <img className='w-36 h-36  object-cover p-1' src={item?.products[0]?.images?.url} alt="" />
                    <div className='p-5 flex items-center'>
                        <p>{item?.products[0]?.title}</p>
                    </div>
                </div>
                <div className='w-3/12 py-5 flex items-center '>
                    <p>Rp. {item?.products[0]?.price}</p>
                </div>
                <div className='w-3/12 py-5 flex items-center'>
                    <div className='flex gap-4 items-center'>
                        <FaMinus onClick={() => Decrement(item?._id)} className='cursor-pointer' />
                        <span>
                            {cart}
                        </span>
                        <FaPlus onClick={() => Increment(item?._id)} className='cursor-pointer' />
                    </div>
                </div>
                <div className='w-2/12 py-5 flex items-center'>
                    <p>Rp.{price}</p>
                </div>
                <div className='w-2/12 py-5 flex items-center ps-5'>
                    <FaTrash
                        onClick={() => handleDeleteCart(item?._id)}
                        size={20}
                        className='cursor-pointer' />
                </div>
            </div> */}

            <div className='md:h-36 h-28 flex border-t'>
                <img className='md:h-36 object-cover p-1' src={item?.products[0]?.images?.url} alt="" />

                <div className='flex flex-col justify-center md:gap-5 w-full gap-2'>

                    <div className='md:px-5 px-1 flex items-center'>
                        <p className='line-clamp-2'>{item?.products[0]?.title}</p>
                    </div>

                    <div className='flex gap-5 md:px-5 px-1'>
                        <div className='w-7/12 md:w-5/12  flex items-center '>
                            <p>Rp.{item?.products[0]?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                        </div>
                        <div className='w-5/12 md:w-4/12 flex items-center'>
                            <div className='flex gap-4 items-center'>
                                <button>
                                    <FaMinus size={20} onClick={() => Decrement(item?._id)} className='cursor-pointer border p-1 hover:border-2 border-black rounded-full' />
                                </button>
                                <span>
                                    {cart}
                                </span>
                                <button>
                                    <FaPlus size={20} onClick={() => Increment(item?._id)} className='cursor-pointer border p-1 hover:border-2 border-black rounded-full' />
                                </button>
                            </div>
                        </div>

                        <div className=' md:w-3/12  md:flex items-center hidden'>
                            <p>Rp.{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                        </div>

                    </div>
                </div>

                <div className='md:flex items-center ps-4 pe-10 hidden'>
                    <FaTrash
                        onClick={() => handleDeleteCart(item?._id)}
                        size={20}
                        className='cursor-pointer' />
                </div>
            </div>
        </>


    )
}

export default CartItem   