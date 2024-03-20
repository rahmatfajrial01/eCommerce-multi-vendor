import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../../features/product/productSlice'
import { getAllUser } from '../../features/user/userSlice'

const Dashboard = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUser(authState?.user?.token))
        dispatch(getAllProduct())
    }, [])
    const authState = useSelector(state => state?.auth)
    const userState = useSelector((state) => state?.user)
    const productState = useSelector(state => state?.product)

    return (
        <section className='w-full mt-4 px-4'>
            <div className='flex gap-5'>
                <div className='flex justify-between w-full bg-slate-200 rounded-xl  p-3'>
                    <p>Admin</p>
                    <p className='bg-white px-2 rounded-lg'>{userState?.allUser && userState?.allUser.filter(item => item.role == 3)?.length}</p>
                </div>
                <div className='flex justify-between w-full bg-slate-200 rounded-xl p-3'>
                    <p>Seller</p>
                    <p className='bg-white px-2 rounded-lg'>{userState?.allUser && userState?.allUser.filter(item => item.role == 2)?.length}</p>
                </div>
                <div className='flex justify-between w-full bg-slate-200 rounded-xl p-3'>
                    <p>Buyer</p>
                    <p className='bg-white px-2 rounded-lg'>{userState?.allUser && userState?.allUser.filter(item => item.role == 1)?.length}</p>
                </div>
                <div className='flex justify-between w-full bg-slate-200 rounded-xl p-3'>
                    <p>Product</p>
                    <p className='bg-white px-2 rounded-lg'>{productState.allProduct && productState.allProduct.length}</p>
                </div>
            </div>

        </section>
    )
}

export default Dashboard