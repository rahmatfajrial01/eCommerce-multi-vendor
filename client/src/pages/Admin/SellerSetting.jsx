import React, { useEffect } from 'react'
import { RxAvatar } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../components/Button'
import DataTable from '../../components/DataTable'
import Input from '../../components/Input'
import { getMemberShope } from '../../features/shope/shopeSlice'

const Seller = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state?.auth?.user?.token)
    const shopeState = useSelector(state => state?.shope)

    // console.log(shopeState.memberShope.user)
    useEffect(() => {
        if (shopeState?.currentShope?.shope[0]?._id) {
            const userData = { token, id: shopeState?.currentShope?.shope[0]?._id }
            dispatch(getMemberShope(userData))
        }
    }, [shopeState?.currentShope?.shope[0]?._id])
    return (
        <section className='p-5 space-y-3'>
            <div>
                <form
                    // onSubmit={formik.handleSubmit} 
                    className='flex gap-1 p-5 bg-slate-200 rounded-xl'>
                    <div className='relative w-64'>
                        <Input
                            type="text"
                            name="title"
                            placeholder='Email User...'
                        // value={formik.values.title}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        />
                        <span className='flex gap-2 absolute bg-white px-2  rounded-xl'>
                            {/* <p className='text-red-500 text-nowrap'>
                                {formik.touched.title && formik.errors.title}
                            </p>
                            {formik.touched.title && formik.errors.title ? <button onClick={formik.resetForm}>Cancel</button> : ""} */}
                        </span>
                    </div>
                    <Button
                        type='submit'
                        color='green'
                        name='Submit' />
                </form>
            </div>
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
                    shopeState?.memberShope?.user && shopeState?.memberShope?.user?.map((item, index) =>
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

export default Seller