import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder2 } from '../features/order2/order2Slice'
import OrderItem from '../components/OrderItem'


const Order = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state?.auth?.user?.token)
    const order2State = useSelector(state => state?.order2)
    console.log(order2State)
    useEffect(() => {
        dispatch(getOrder2(token))
    }, [])
    let [orderStatus, setOrderStatus] = useState("")
    return (
        <section className='pt-5'>
            <div className='container mx-auto space-y-5'>
                <div className='flex gap-5 w-full justify-between text-center'>
                    <div
                        onClick={() => setOrderStatus("6")}
                        className={`${orderStatus === '6' ? "bg-green-500 text-white" : 'bg-slate-300'} w-full text-nowrap py-1 px-2 rounded-2xl opacity-95 cursor-pointer `}>Waiting Payment</div>
                    <div
                        onClick={() => setOrderStatus('Being Packaged')}
                        className={`${orderStatus === 'Being Packaged' ? "bg-green-500 text-white " : 'bg-slate-300'} w-full text-nowrap py-1 px-2 rounded-2xl opacity-95 cursor-pointer `}>being packaged</div>
                    <div
                        onClick={() => setOrderStatus('Sended')}
                        className={`${orderStatus === 'Sended' ? "bg-green-500 text-white " : 'bg-slate-300'} w-full text-nowrap py-1 px-2 rounded-2xl opacity-95 cursor-pointer `}>sended</div>
                    <div
                        onClick={() => setOrderStatus('3')}
                        className={`${orderStatus === '3' ? "bg-green-500 text-white " : 'bg-slate-300'} w-full text-nowrap py-1 px-2 rounded-2xl opacity-95 cursor-pointer `}>delivery</div>
                    <div
                        onClick={() => setOrderStatus('4')}
                        className={`${orderStatus === '4' ? "bg-green-500 text-white " : 'bg-slate-300'} w-full text-nowrap py-1 px-2 rounded-2xl opacity-95 cursor-pointer `}>history</div>
                    <div
                        onClick={() => setOrderStatus('5')}
                        className={`${orderStatus === '5' ? "bg-green-500 text-white " : 'bg-slate-300'}  w-full text-nowrap py-1 px-2 rounded-2xl opacity-95 cursor-pointer `}>refund</div>
                </div>
                <div className='space-y-3'>
                    {
                        order2State?.order2 && order2State?.order2?.filter(item => item.orderStatus === orderStatus).map((item, index) =>
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