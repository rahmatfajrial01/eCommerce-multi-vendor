import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder2 } from '../features/order2/order2Slice'
import OrderItem from '../components/OrderItem'


const Order = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state?.auth?.user?.token)
    const order2State = useSelector(state => state?.order2)
    let [orderStatus, setOrderStatus] = useState("")
    useEffect(() => {
        let userData = { token, orderStatus }
        dispatch(getOrder2(userData))
    }, [orderStatus])
    return (
        <section className='pt-5'>
            <div className='container mx-auto space-y-5'>
                <div className='flex gap-5 w-full justify-between text-center'>
                    <div
                        onClick={() => setOrderStatus("")}
                        className={`${orderStatus === '' ? "bg-green-500 text-white" : 'bg-slate-300'} w-full text-nowrap py-1 px-2 rounded-2xl opacity-95 cursor-pointer transition-all `}>All</div>
                    <div
                        onClick={() => setOrderStatus("6")}
                        className={`${orderStatus === '6' ? "bg-green-500 text-white" : 'bg-slate-300'} w-full text-nowrap py-1 px-2 rounded-2xl opacity-95 cursor-pointer transition-all `}>Waiting Payment</div>
                    <div
                        onClick={() => setOrderStatus('Being Packaged')}
                        className={`${orderStatus === 'Being Packaged' ? "bg-green-500 text-white " : 'bg-slate-300'} w-full text-nowrap py-1 px-2 rounded-2xl opacity-95 cursor-pointer transition-all `}>Being Packaged</div>
                    <div
                        onClick={() => setOrderStatus('Sended')}
                        className={`${orderStatus === 'Sended' ? "bg-green-500 text-white " : 'bg-slate-300'} w-full text-nowrap py-1 px-2 rounded-2xl opacity-95 cursor-pointer transition-all `}>Sended</div>
                    <div
                        onClick={() => setOrderStatus('Delifery')}
                        className={`${orderStatus === 'Delifery' ? "bg-green-500 text-white " : 'bg-slate-300'} w-full text-nowrap py-1 px-2 rounded-2xl opacity-95 cursor-pointer transition-all `}>Delivery</div>
                    <div
                        onClick={() => setOrderStatus('4')}
                        className={`${orderStatus === '4' ? "bg-green-500 text-white " : 'bg-slate-300'} w-full text-nowrap py-1 px-2 rounded-2xl opacity-95 cursor-pointer transition-all `}>Cancel</div>
                </div>
                <div className='space-y-3'>
                    {
                        order2State?.order2 && order2State?.order2.map((item, index) =>
                            <div key={index} className='border rounded-xl'>
                                <div className='flex justify-between p-2'>
                                    <p>{item?.shopeName}</p>
                                    <p>{item?.orderStatus}</p>
                                </div>

                                <div className=' '>
                                    {item?.products && item?.products.map((i, key) =>
                                        <OrderItem
                                            key={key}
                                            item={i}
                                        />
                                    )}
                                </div>
                            </div>
                        )

                    }

                </div>

            </div>
        </section>
    )
}

export default Order