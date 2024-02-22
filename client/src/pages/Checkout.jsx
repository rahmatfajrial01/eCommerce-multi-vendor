import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCart } from '../features/cart/cartSlice'

const Checkout = () => {

    const dispatch = useDispatch()
    const token = useSelector(state => state?.auth?.user?.token)
    const cartState = useSelector((state) => state?.cart)
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        dispatch(getCart(token))
    }, [])
    console.log(cartState.cart)

    useEffect(() => {
        let sum = 0
        for (let index = 0; index < cartState?.cart?.length; index++) {
            sum = sum + (Number(cartState?.cart[index]?.quantity) * cartState?.cart[index]?.price)
            setTotalAmount(sum)
        }
    }, [cartState])
    let cost = 5000

    return (
        <section >
            <div className='flex mt-5 container mx-auto gap-5'>
                <div className='w-full p-5 border rounded-xl'>

                    <form
                        // onSubmit={formik.handleSubmit}
                        className='flex flex-col space-y-2  bg-white'
                        action="">
                        <div>
                            <input
                                type="text"
                                placeholder='Receive name'
                                className='border p-2 w-full'
                            // value={formik.values.firstname}
                            // onChange={formik.handleChange("firstname")}
                            // onBlur={formik.handleBlur("firstname")}
                            />
                            <p className='text-red-500'>
                                {/* {formik.touched.firstname && formik.errors.firstname} */}
                            </p>
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder='Address'
                                className='border p-2 w-full'
                            // value={formik.values.address}
                            // onChange={formik.handleChange("address")}
                            // onBlur={formik.handleBlur("address")}
                            />
                            <p className='text-red-500'>
                                {/* {formik.touched.address && formik.errors.address} */}
                            </p>
                        </div>

                        <input placeholder='Aparmetn , suite, etc' className='border p-2' type="text" />


                        <div>
                            <textarea
                                type="text"
                                placeholder='full address'
                                className='border p-2 w-full'
                            // value={formik.values.state}
                            // onChange={formik.handleChange("state")}
                            // onBlur={formik.handleBlur("state")}
                            />
                            <p className='text-red-500'>
                                {/* {formik.touched.state && formik.errors.state} */}
                            </p>
                        </div>


                        <div className='p-3 flex justify-between'>
                            <Link className='p-2 bg-red-100' to='/cart'> Return to Cart</Link>
                            <button type='submit' className='p-2 bg-green-100' to=''>Continue to shipping</button>
                        </div>
                    </form>
                </div>
                <div className='w-[500px]'>
                    <div className='border space-y-5 p-5 rounded-lg'>
                        {
                            cartState.cart && cartState.cart.map((item, index) =>
                                <div key={index} className='flex items-center gap-3'>
                                    <img className='w-1/4 object-cover ' src={item?.product?.images?.url} alt="" />
                                    <div className='w-full'>
                                        <p>{item?.product?.title}</p>
                                        <div className='flex justify-between'>
                                            <p className='rounded-full'>Price:  </p><span className='font-semibold'>Rp.{item?.quantity * item?.price}</span>
                                        </div>
                                        <p className='rounded-full'>Item: <span>{item?.quantity}</span> </p>
                                    </div>
                                </div>
                            )
                        }
                        <div className='space-y-1'>
                            <div className='flex justify-between'>
                                <p>SubTotal : </p><span className='font-semibold'>Rp. {totalAmount}</span>
                            </div>
                            <div className='flex justify-between'>
                                <p>Shipping : </p><span className='font-semibold'>Rp. {cost}</span>
                            </div>
                            <div className='flex justify-between item'>
                                <p>Total :  </p><span className='font-semibold text-xl'>Rp. {cost + totalAmount}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Checkout