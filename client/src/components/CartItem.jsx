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
    let price = item?.productInfo?.price * cart
    return (
        <div className='h-36 flex border-t'>
            <div className='flex w-5/12'>
                <img className='w-36 h-36  object-cover p-1' src={item?.productInfo.images?.url} alt="" />
                <div className='p-5 flex items-center'>
                    <p>{item?.productInfo?.title}</p>
                </div>
            </div>
            <div className='w-3/12 py-5 flex items-center '>
                <p>Rp. {item?.productInfo?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
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
                <p>Rp. {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
            </div>
            <div className='w-2/12 py-5 flex items-center ps-5'>
                <FaTrash
                    onClick={() => handleDeleteCart(item?._id)}
                    size={20}
                    className='cursor-pointer' />
            </div>
        </div>
    )
}

export default CartItem   