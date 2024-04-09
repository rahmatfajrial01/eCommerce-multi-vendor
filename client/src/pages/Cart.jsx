import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../features/cart/cartSlice'

import CartItem from '../components/CartItem';
import CartItemOutStock from '../components/CartItemOutStock';
import { Button } from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder, resetStateOrder } from '../features/order/orderSlice';
import { toast } from 'react-toastify';

const Cart = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(state => state?.auth?.user?.token)
    const cartState = useSelector((state) => state?.cart)
    const orderState = useSelector((state) => state?.order)


    useEffect(() => {
        dispatch(getCart(token))
    }, [cartState.cartQtyChanged])

    // const [totalAmount, setTotalAmount] = useState(0)
    // useEffect(() => {
    //     let sum = 0
    //     for (let index = 0; index < cartState?.cart?.length; index++) {
    //         sum = sum + (Number(cartState?.cart[index]?.quantity) * cartState?.cart[index]?.price)
    //         setTotalAmount(sum)
    //     }
    // }, [cartState])
    console.log(cartState?.cart?.inStockProduct?.length < 1)

    useEffect(() => {
        if (orderState.createdOrder !== null && orderState.isError === false) {
            navigate(`/checkout`)
            // setTimeout(() => {
            //     dispatch(resetStateOrder())
            // }, 300);
        }
    }, [orderState.createdOrder])

    let firstdata = cartState.cart
    console.log(firstdata)
    let handleCheckout = () => {
        // for (let index = 0; index < firstdata.length; index++) {
        // let element = firstdata[index];
        let data = {
            // shope: element.shope,
            // shopeName: element.shopeName,
            // price: element.price,
            products: firstdata.inStockProduct
        }
        let userData = { token, data }
        if (cartState?.cart?.inStockProduct?.length < 1) {
            toast.error("not item to checkout")

        } else {
            dispatch(createOrder(userData))
        }
        // }
    }

    return (
        <section>
            <div className='container mx-auto space-y-5 mt-5 w-[1170px]'>
                {/* <div className='flex border'>
                    <span className='w-5/12 p-1 ps-10'>Product</span>
                    <span className='w-3/12 p-1'>Unit Price</span>
                    <span className='w-3/12 p-1'> Quantity</span>
                    <span className='w-2/12 p-1'>Total Price</span>
                    <span className='w-2/12 p-1'>Action</span>
                </div> */}
                <div className='flex flex-col gap-5'>
                    {
                        cartState?.cart?.inStockProduct?.length > 0
                            ? cartState.cart.inStockProduct.map((item, index) =>
                                <div className='border rounded-xl' key={index}>
                                    <p className='p-2'>{item?.shopeName}</p>
                                    {item?.products && item?.products.map((item, key) =>
                                        <CartItem
                                            key={key}
                                            item={item}
                                        />
                                    )}
                                </div>)
                            :
                            <div className='border rounded-xl h-40 flex flex-col gap-2 items-center justify-center'>
                                <p className='font-bold'>Your Cart is Empty</p>
                                <Link className='bg-green-600 text-white p-2 rounded-xl' to={'/'}>Star Shopping</Link>
                            </div>
                    }
                </div>
                {
                    cartState?.cart?.outOfStockProduct?.length > 0
                    &&
                    <div className='flex flex-col gap-5'>
                        <div className='border rounded-xl'>
                            <h1 className='p-2'>Out of Stock</h1>
                            {
                                cartState.cart.outOfStockProduct && cartState.cart.outOfStockProduct.map((item, index) =>
                                    <CartItemOutStock
                                        key={index}
                                        item={item}
                                    />
                                )
                            }
                        </div>
                    </div>
                }

                <div className='flex justify-end w-full p-5 '>
                    <div className='flex gap-6 items-center'>
                        <p>Grant Total :</p>
                        <p className='font-bold text-xl'>Rp.{cartState?.cart?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                        <button onClick={() => handleCheckout()} className='bg-green-500 p-2 rounded-xl text-white' >
                            Checkout
                        </button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Cart