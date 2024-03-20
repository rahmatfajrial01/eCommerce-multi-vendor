import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../../components/DataTable'
import { getAllUser } from '../../features/user/userSlice'
import { RxAvatar } from "react-icons/rx";

const User = () => {
    const dispatch = useDispatch()
    const userState = useSelector(state => state?.user)
    const authState = useSelector(state => state?.auth)
    useEffect(() => {
        dispatch(getAllUser(authState?.user?.token))
    }, [])
    return (
        <section className='mt-4 px-4 overflow-x-auto  w-full'>
            <DataTable
                headerTitle={[
                    'Usernme',
                    'Email',
                    'Role',
                    'Created At',
                    'Action',
                ]}
            >
                {
                    userState?.allUser?.map((item, index) =>
                        <tr key={index} className='border-2 p-2'>
                            <td className='p-2 flex items-center gap-2'>
                                {
                                    item?.avatar
                                        ?
                                        <img className='h-12 w-12 object-cover rounded-full' src={item?.avatar} alt="" />
                                        :
                                        <RxAvatar size={50} />
                                }
                                <span>{item?.username}</span>
                            </td>
                            <td className='p-2'>{item?.email}</td>
                            <td className='p-2'>{item?.role > 2 ? "Admin" : item?.role === 1 ? "buyer" : "Seller"}</td>
                            <td className='p-2'>{item?.createdAt}</td>
                            <td className='p-2'>action</td>
                        </tr>
                    )
                }
            </DataTable >
        </section>
    )
}

export default User