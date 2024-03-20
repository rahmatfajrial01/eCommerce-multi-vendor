import React, { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatusOrder2, getOrder2ByShope } from '../../features/order2/order2Slice'
import { FaTrashAlt, FaEdit } from "react-icons/fa";


const Order = () => {
    const token = useSelector(state => state?.auth?.user?.token)
    const shopeState = useSelector(state => state?.shope)
    const order2State = useSelector(state => state?.order2)
    const dispatch = useDispatch()
    let [orderStatus, setOrderStatus] = useState("")
    useEffect(() => {
        let userData = { token, orderStatus }
        dispatch(getOrder2ByShope(userData))
    }, [orderStatus, order2State.changeStatusOrder2])
    // console.log(shopeState?.currentShope?.shope[0]?._id)
    // console.log(order2State)
    // console.log(order2State?.filter(item => item?.shope === shopeState?.currentShope?.shope[0]?._id))
    const updateOrderStatus = (a, b) => {
        // dispatch(updateOrder({ id: a, status: b }))
        let data = { status: b, id: a }
        // let id = { id: a }
        let userData = { token, data }
        dispatch(changeStatusOrder2(userData))
    }
    console.log(order2State.order2ByShope)
    return (
        <div className='p-5 space-y-5'>
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
            <DataTable
                headerTitle={['Product', 'Total Price', 'Customer Info', 'Shipping', 'Order Id', 'Action']}
            >
                {
                    order2State.order2ByShope && order2State.order2ByShope.filter(item => item?.shope === shopeState?.currentShope?.shope[0]?._id).map((item, index) =>

                        <tr key={index} className='border-2 p-2'>
                            <td className='p-2 flex-nowrap space-y-3'>

                                {item?.products && item?.products.map((i, key) =>
                                    <div key={key} className='flex gap-3 items-center w-max'>
                                        <img className='h-20 object-cover border rounded-xl' src={i?.productInfo?.images?.url} alt="" />
                                        <div className='flex gap-5'>
                                            <p>{i?.productInfo?.title}</p>
                                            <p>X {i?.quantity}</p>
                                        </div>
                                    </div>
                                )
                                }
                            </td>
                            <td className='p-2'>Rp. {item?.price}</td>
                            <td className='p-2 '>
                                <div className='flex flex-col justify-center'>
                                    <span>Recipient Name :  {item?.address[0]?.recipientName}</span>
                                    <span>Telephon:  {item?.address[0]?.telephone}</span>
                                    <span>Province  {item?.address[0]?.province}</span>
                                    <span>City :  {item?.address[0]?.city}</span>
                                </div>
                            </td>
                            <td className='p-2'>{item?.shippment}-{item?.shippmentService}</td>
                            <td className='p-2'>{item?.orderId}</td>
                            <td className='p-2'>
                                <div className='flex gap-3'>
                                    {/* <FaEdit className='cursor-pointer hover:text-yellow-500' />
                                    <FaTrashAlt onClick={() => handleDelete(item?._id)} className='cursor-pointer hover:text-red-500 ' /> */}
                                    {
                                        item?.orderStatus !== 'Unpaid'
                                            ?
                                            <select
                                                defaultValue={item?.orderStatus}
                                                className='border p-2 rounded-xl'
                                                name=""
                                                id=""
                                                onChange={(e) => updateOrderStatus(item?._id, e.target.value)}
                                            >
                                                <option value="">choose</option>
                                                <option value="Being Packaged">being packaged</option>
                                                <option value="Sended">Sended</option>
                                                <option value="Delifery">Delifery</option>
                                            </select>
                                            :
                                            <span className='border p-2 rounded-xl'>Unpaid</span>
                                    }

                                </div>
                            </td>
                        </tr>


                    )
                }
            </DataTable>
        </div>
    )
}

export default Order