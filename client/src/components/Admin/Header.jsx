import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../features/auth/authSlice'
import { getCurrentShope } from '../../features/shope/shopeSlice'

const Header = () => {

    const authState = useSelector(state => state?.auth)
    const shopeState = useSelector(state => state?.shope)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCurrentUser(authState?.user?.token))
    }, [])

    useEffect(() => {
        // if (authState?.currentUser?._id !== undefined) {
        let user = authState?.currentUser?._id
        let token = authState?.user?.token
        let userData = { token, user }
        dispatch(getCurrentShope(userData))
        // }

    }, [
        // authState?.currentUser?._id
    ])

    // console.log('ini', authState?.currentUser)
    // console.log('ini2', shopeState?.currentShope?.shope[0])

    return (
        <header className='w-full fixed top-0 z-10'>
            <section className='flex justify-between bg-green-500 text-white py-2 px-7'>
                <div>Seller Center</div>
                <div className='space-x-3'>
                    <span>{authState?.currentUser?.role === 3 ? '(Admin)' : '(Seller)'}</span>
                    <span>{authState?.currentUser?.username}</span>
                </div>
            </section>
        </header>
    )
}

export default Header