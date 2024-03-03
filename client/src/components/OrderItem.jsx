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

    return (
        <div className='h-36 border flex '>
            <div className='flex w-4/6'>
                <img className='w-36 h-36  object-cover p-1' src={item?.productInfo.images?.url} alt="" />
                <div className='p-5 flex items-center'>
                    <p>{item?.productInfo?.title}</p>
                </div>
            </div>
            <div className='w-1/6 py-5 flex items-center '>
                X {cart}
            </div>
            <div className='w-1/6 py-5 flex items-center'>
                <p>Rp. {item?.productInfo?.price * cart}</p>
            </div>

        </div>
    )
}

export default CartItem   