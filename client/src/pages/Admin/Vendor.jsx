import React, { useEffect } from 'react'
import { RxAvatar } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../../components/DataTable'
import { getAllShope } from '../../features/shope/shopeSlice'
import { TbSquareRoundedMinus } from "react-icons/tb";

const Vendor = () => {
    const token = useSelector(state => state?.auth?.user?.token)
    const shopeState = useSelector(state => state?.shope)
    console.log(shopeState)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllShope(token))
    }, [])

    return (
        <section className='mt-4 px-4 overflow-x-auto  w-full'>
            <DataTable
                headerTitle={[
                    'Shope Name',
                    'Telephone',
                    'Addres',
                    'Member',
                    'Products',
                    'Created At',
                    'Action',
                ]}
            >
                {
                    shopeState?.allShope?.map((item, index) =>
                        <tr key={index} className='border-2 p-2'>
                            <td className='p-2 flex items-center gap-2 w-max'>
                                {
                                    item?.avatar
                                        ?
                                        <img className='h-12 w-12 object-cover rounded-2xl' src={item?.avatar} alt="" />
                                        :
                                        <TbSquareRoundedMinus size={50} />
                                }
                                <span>{item?.shopeName}</span>
                            </td>
                            <td className='p-2'>{item?.telephone}</td>
                            <td className='p-2'>{item?.addresses[0]?.city} ({item?.addresses[0]?.province})</td>
                            <td className='px-8'>{item?.user?.length}</td>
                            <td className='px-8'>{item?.products?.length}</td>
                            <td className='p-2'>
                                {new Date(item?.createdAt).getDate()}
                                {" "}
                                {new Date(item?.createdAt).toLocaleString("default", { month: "long", })}
                                {" "}
                                {new Date(item.createdAt).getFullYear()}
                            </td>
                            <td className='p-2'>action</td>
                        </tr>
                    )
                }
            </DataTable >
        </section>
    )
}

export default Vendor