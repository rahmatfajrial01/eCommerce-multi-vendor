import React, { useEffect, useState } from 'react'
import { getSingleProduct } from '../features/product/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../components/Button'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { addCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const Detail = () => {
    const getSlug = location?.pathname?.split('/')[1]
    const token = useSelector(state => state?.auth?.user?.token)
    const productState = useSelector((state) => state?.product?.singleProduct)
    const loading = useSelector((state) => state?.product?.isLoading)
    const cartState = useSelector((state) => state?.cart?.cart)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSingleProduct(getSlug))
    }, [])

    const [quantity, setQuantity] = useState(1)
    const [alreadyAdded, setAlreadyAdded] = useState(false);

    useEffect(() => {
        for (let index = 0; index < cartState?.length; index++) {
            if (productState?._id === cartState[index]?.product?._id) {
                setAlreadyAdded(true)
            }
        }
    })

    const addCartHandler = () => {
        if (alreadyAdded) {
            navigate('/cart')
        } else {
            let data = {
                product: productState?._id,
                quantity,
                price: productState?.price
            }
            let userData = {
                data, token
            }
            dispatch(addCart(userData))
            setTimeout(() => {
                setAlreadyAdded(true)
            }, 200);
        }
    }

    return (
        <section>
            {
                loading
                    ?
                    <div className='flex justify-center items-center h-96'>
                        <p>Loading...</p>
                    </div>
                    :
                    <div className='flex mt-5 container mx-auto justify-center '>
                        <div className='flex'>
                            <div className='w-24 h-96 flex flex-col'>
                                <img className='object-cover w-24 border-2' src={productState?.images?.url} alt="" />
                                <img className='object-cover w-24 border-2' src={productState?.images?.url} alt="" />
                                <img className='object-cover w-24 border-2' src={productState?.images?.url} alt="" />
                                <img className='object-cover w-24 border-2' src={productState?.images?.url} alt="" />
                            </div>
                            <div className='w-96 flex justify-center'>
                                <img className='w-96 h-full object-cover border-2 ' src={productState?.images?.url} alt="" />
                            </div>
                        </div>
                        <div className='p-10 space-y-3 border-2'>
                            <p className='font-bold text-xl'>{productState?.title}</p>
                            <p>Price : Rp.{productState?.price}</p>
                            <div className='flex items-center space-x-5'>
                                <p className=''>Qty</p>
                                <input min={1} onChange={(e) => setQuantity(e.target.value)} value={quantity} type='number' className='p-1 rounded-xl w-10 focus:outline-none' />
                                {/* <span className='rounded-full border-2 p-1 cursor-pointer'>
                            <FaPlus />
                        </span> */}
                            </div>
                            <div className='flex gap-3 pt-5'>
                                <button
                                    type='button'
                                    onClick={addCartHandler}
                                    className={`${alreadyAdded ? "bg-red-400" : "bg-green-500"}  py-1 px-4 rounded-full text-white`}>{alreadyAdded ? "Go to Cart" : "Add to Cart"}
                                </button>
                                {/* <Button
                            type='button'
                            color='green'
                            name='Buy Now'
                        /> */}
                            </div>
                        </div>
                    </div>
            }
        </section >
    )
}

export default Detail