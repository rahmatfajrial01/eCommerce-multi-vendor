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
        <div className='md:h-36 h-28 flex border-t'>
            <img className='md:w-36 md:h-36 h-28 object-cover p-1' src={item?.productInfo.images?.url} alt="" />
            <div className='flex flex-col justify-center gap-2 p-2 w-full'>
                <div className='flex items-center'>
                    <p className='line-clamp-2'>{item?.productInfo?.title}</p>
                </div>
                <div className='flex  gap-5'>
                    <div className=' md:py-5  flex items-center '>
                        X {cart}
                    </div>
                    <div className=' md:py-5 flex items-center'>
                        <p>Rp.{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CartItem   