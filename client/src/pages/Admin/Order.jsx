import React, { useEffect } from 'react'
import DataTable from '../../components/DataTable'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder2ByShope } from '../../features/order2/order2Slice'
import { FaTrashAlt, FaEdit } from "react-icons/fa";


const Order = () => {
    const token = useSelector(state => state?.auth?.user?.token)
    const shopeState = useSelector(state => state?.shope)
    const order2State = useSelector(state => state?.order2)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrder2ByShope(token))
    }, [])
    // console.log(shopeState?.currentShope?.shope[0]?._id)
    console.log(order2State)
    // console.log(order2State?.filter(item => item?.shope === shopeState?.currentShope?.shope[0]?._id))
    return (
        <div className='p-5'>
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
                                            <p>X {i?.productInfo?.quantity}</p>
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
                            <td className='p-2'>{item?.shippment}</td>
                            <td className='p-2'>{item?.orderId}</td>
                            <td className='p-2'>
                                <div className='flex gap-3'>
                                    {/* <FaEdit className='cursor-pointer hover:text-yellow-500' />
                                    <FaTrashAlt onClick={() => handleDelete(item?._id)} className='cursor-pointer hover:text-red-500 ' /> */}
                                    <select defaultValue={item?.orderStatus} className='border p-2 rounded-xl' name="" id="">
                                        <option value="">choose</option>
                                        <option value="Being Packaged">being packaged</option>
                                        <option value="Sended">Sended</option>
                                    </select>
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