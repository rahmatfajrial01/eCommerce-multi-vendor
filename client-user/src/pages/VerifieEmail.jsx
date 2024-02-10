import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { createUser, resentOtp, resetState } from '../features/auth/authSlice'



const VerifieEmail = () => {
    const getId = location?.pathname?.split('/')[2]
    const [otp, setOtp] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const authState = useSelector(state => state.auth)

    const submitOtp = (e) => {
        e.preventDefault();
        const values = {
            slug: getId,
            otp
        }
        dispatch(createUser(values))
    };

    const submitresentOtp = (e) => {
        e.preventDefault();
        const values = { slug: getId, }
        dispatch(resentOtp(values))
    };


    useEffect(() => {
        if (authState.createdUserVerif !== null && authState.isError === false) {
            dispatch(resetState())
            navigate(`/login`)
        }
    }, [authState.createdUserVerif])
    return (
        <section className='flex flex-col justify-center bg-slate-200 items-center min-h-screen'>
            <form onSubmit={submitOtp} className='space-y-3 w-96 px-5 py-5 bg-white rounded-lg'>
                <h1 className='text-center font-semibold text-xl'>Verifie Email</h1>
                <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    className='border w-full p-2 rounded-full text-center'
                    placeholder='your OTP'
                />
                <Button
                    type='submit'
                    color='green'
                    name='submit'
                />
                <div className='flex justify-center text-sm text-blue-500'>
                    <button type='button' onClick={submitresentOtp}>resent Otp</button>
                </div>
            </form>
        </section >
    )
}

export default VerifieEmail