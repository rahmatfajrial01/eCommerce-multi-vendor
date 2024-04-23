import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { RxAvatar } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../components/Button'
import DataTable from '../../components/DataTable'
import Input from '../../components/Input'
import Modal from '../../components/Modal'
import { acceptMember, getMemberShope, getNewMember } from '../../features/shope/shopeSlice'

const Seller = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state?.auth?.user?.token)
    const shopeState = useSelector(state => state?.shope)
    console.log(shopeState.newMemberShope)

    // console.log(shopeState.memberShope.user)
    useEffect(() => {
        if (shopeState?.currentShope?.shope[0]?._id) {
            const userData = { token, id: shopeState?.currentShope?.shope[0]?._id }
            dispatch(getMemberShope(userData))
        }
    }, [shopeState?.currentShope?.shope[0]?._id, shopeState?.acceptMemberShope])

    let [user, setUser] = useState('')
    let [isOpen, setIsOpen] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = { email: user }
        const userData = { token, data }
        dispatch(getNewMember(userData))
    }

    useEffect(() => {
        if (shopeState.newMemberShope) {
            setIsOpen(true)
        }
    }, [shopeState.newMemberShope])

    const closeModal = (e) => {
        if (e === 'container') {
            setIsOpen(false)
        }
    }

    const handleAccept = () => {
        const userData = {
            token,
            shopeId: shopeState?.currentShope?.shope[0]?._id,
            id: shopeState?.newMemberShope?.id
        }
        dispatch(acceptMember(userData))
        setIsOpen(false)
    }

    return (
        <section className='p-5 space-y-3'>
            <div>
                <form
                    onSubmit={handleSubmit}
                    className='flex gap-1 p-5 bg-slate-200 rounded-xl'>
                    <div className='relative w-64'>
                        <Input
                            type="text"
                            name="title"
                            placeholder='Email User...'
                            value={user}
                            onChange={e => setUser(e.target.value)}

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
                            <td className='p-2 flex items-center gap-2 w-max'>
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
                            <td className='p-2'>
                                {new Date(item?.createdAt).getDate()}
                                {" "}
                                {new Date(item?.createdAt).toLocaleString("default", { month: "long", })}
                                {" "}
                                {new Date(item?.createdAt).getFullYear()}
                            </td>
                            <td className='p-2'>action</td>
                        </tr>
                    )
                }
            </DataTable >
            <Modal
                isOpen={isOpen}
                closeModal={(e) => closeModal(e.target.id)}
            >
                <div className='text-black m-3 relative'>
                    <button type='button' onClick={() => setIsOpen(false)} className='absolute -top-4 -right-4'><IoMdClose /></button>

                    {shopeState?.newMemberShope?.message}
                    {
                        shopeState?.newMemberShope?.message ? "" :
                            <div>
                                <div className='flex justify-center'>
                                    <img className='h-32 w-32 object-cover' src={shopeState?.newMemberShope?.avatar} alt="" />
                                </div>
                                <p>{shopeState?.newMemberShope?.email}</p>
                                <p>{shopeState?.newMemberShope?.username}</p>
                                <Button
                                    onClick={() => handleAccept()}
                                    color='green'
                                    type='button'
                                    name="Accept"
                                    w='full'
                                />
                            </div>
                    }
                </div>
            </Modal>

        </section>
    )
}

export default Seller