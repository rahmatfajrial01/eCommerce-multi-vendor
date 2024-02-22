import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../features/cart/cartSlice'

import CartItem from '../components/CartItem';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

const Cart = () => {

    const dispatch = useDispatch()
    const token = useSelector(state => state?.auth?.user?.token)
    const cartState = useSelector((state) => state?.cart)
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        dispatch(getCart(token))
    }, [cartState.cartQtyChanged])

    useEffect(() => {
        let sum = 0
        for (let index = 0; index < cartState?.cart?.length; index++) {
            sum = sum + (Number(cartState?.cart[index]?.quantity) * cartState?.cart[index]?.price)
            setTotalAmount(sum)
        }
    }, [cartState])
    // console.log(cartState.cart)


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
                            <CartItem
                                key={index}
                                item={item}
                            />
                        )
                    }
                </div>
                <div className='flex justify-end w-full p-5 '>
                    <div className='flex gap-6 items-center'>
                        <p>Grant Total :</p>
                        <p className='font-bold text-xl'>Rp.{cartState.cart.length > 0 ? totalAmount : "0"}</p>
                        <Link className='bg-green-500 p-2 rounded-xl text-white' to={'/checkout'}>
                            Checkout
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Cart