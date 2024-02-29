import React, { useEffect, useState } from 'react'
import { getSingleProduct } from '../features/product/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../components/Button'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { addCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CgProfile } from "react-icons/cg";

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

    // useEffect(() => {
    // for (let index = 0; index < cartState?.length; index++) {
    //     if (productState?._id === cartState[index]?.product?._id) {
    // setAlreadyAdded(true)
    //     }
    // }
    // if (cartState && cartState?.filter(item => item?.product?._id === productState?._id).length > 0)
    //     setAlreadyAdded(true)
    // }, [])
    // console.log(productState?.shope?._id)

    const addCartHandler = () => {
        if (quantity > productState?.quantity) {
            toast.info("Out of Stock")
        }
        else if (cartState && cartState?.filter(item => item?.product?._id === productState?._id).length > 0) {
            toast.info("Cart Already Axist")
        }
        else if (quantity <= 0) {
            toast.info("Minimal Cart 1")
        } else {
            let data = {
                product: productState?._id,
                shope: productState?.shope?._id,
                quantity,
                price: productState?.price
            }
            let userData = {
                data, token
            }
            dispatch(addCart(userData))
            // setTimeout(() => {
            //     setAlreadyAdded(true)
            // }, 200);
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
                            </div>
                            <div className='flex gap-3 pt-5'>
                                <Button
                                    onClick={addCartHandler}
                                    type='button'
                                    color='green'
                                    name='Add to Cart'
                                />
                            </div>
                            <div className='pt-5 flex gap-2 items-center'>
                                <CgProfile size='30' />
                                <p>{productState?.shope?.shopeName}</p>
                            </div>
                        </div>
                    </div>
            }
        </section >
    )
}

export default Detail