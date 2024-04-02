import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder2 } from '../features/order2/order2Slice'
import OrderItem from '../components/OrderItem'
import { getStatusOrder, resetState } from '../features/midtrans/midtransSlice'
import { toast } from 'react-toastify'


const Order = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state?.auth?.user?.token)
    const order2State = useSelector(state => state?.order2)
    const midtransState = useSelector(state => state?.midtrans)
    let [orderStatus, setOrderStatus] = useState("")
    useEffect(() => {
        let userData = { token, orderStatus }
        dispatch(getOrder2(userData))
        // if (midtransState?.statusOrder?.transaction_status === 'pending') {
        //     toast.info('still not paid')
        // } else if (midtransState?.statusOrder?.transaction_status === 'settlement') {
        //     toast.success('payment has been made')
        //     let userData = { token, orderStatus }
        //     dispatch(getOrder2(userData))
        //     dispatch(resetState())
        // }
    }, [orderStatus])

    // useEffect(() => {
    //     dispatch(getStatusOrder(token))
    // }, [])
    // console.log(order2State.order2.order2Unpaid)

    const getStatus = (id) => {
        let userData = { token, id }
        dispatch(getStatusOrder(userData))
    }

    return (
        <section className='w-full'>
            <div className='space-y-5'>
                <div className='flex gap-5 w-full justify-between text-center'>
                    <div
                        onClick={() => setOrderStatus("")}
                        className={`${orderStatus === '' ? "bg-green-500 text-white" : 'bg-slate-300'} w-full text-nowrap py-1 px-2 rounded-2xl opacity-95 cursor-pointer transition-all `}>All</div>
                    <div
                        onClick={() => setOrderStatus("Unpaid")}
                        className={`${orderStatus === 'Unpaid' ? "bg-green-500 text-white" : 'bg-slate-300'} w-full text-nowrap py-1 px-2 rounded-2xl opacity-95 cursor-pointer transition-all `}>Waiting Payment</div>
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
                <div className='space-y-5'>
                    {
                        order2State?.order2?.order2Unpaid && order2State?.order2?.order2Unpaid.map((item, index) =>
                            <div key={index} className='border rounded-xl'>
                                <div className='flex justify-between py-2 px-5'>
                                    <p>Order Id : {item?.orderId}</p>
                                    <div className='flex gap-3'>
                                        <p>Unpaid</p>
                                        <button onClick={() => getStatus(item?.orderId)} className='border px-2 rounded-xl bg-green-500 text-white hover:opacity-85'>Refresh</button>
                                    </div>
                                </div>
                                <div className='border-t'>
                                    {item?.order && item?.order.map((i, key) =>
                                        <div key={key} className='flex justify-between p-5 '>
                                            <div className='flex gap-8'>
                                                <div>
                                                    <p>Payment Methods</p>
                                                    <span className='font-semibold'>{i?.payInfo[0].payment_type} ( {i?.payInfo[0]?.va_numbers[0]?.bank})</span>
                                                </div>
                                                <div>
                                                    <p>Virtual Number</p>
                                                    <span className='font-semibold'> {i?.payInfo[0].va_numbers[0].va_number}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p>Tota Price</p>
                                                <span className='font-semibold'>Rp. {i?.payInfo[0].gross_amount}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        )
                    }
                </div>
                <div className='space-y-3'>
                    {
                        order2State?.order2.order2 && order2State?.order2.order2.filter(item => item.orderStatus !== 'Unpaid').map((item, index) =>
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