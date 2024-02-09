
import React from 'react'
import { Button } from '../components/Button'
import Input from '../components/Input'

const VerifieEmail = () => {
    return (
        <section className='flex flex-col justify-center bg-slate-200 items-center min-h-screen'>
            <div className='space-y-3 w-96 px-5 py-5 bg-white rounded-lg'>
                <h1 className='text-center font-semibold text-xl'>Verifie Email</h1>
                <input
                    type="text"
                    className='border w-full p-2 rounded-full text-center'
                    placeholder='your OTP'
                />
                <Button
                    type={'submit'}
                    color={'green'}
                    name={'submit'}
                />
                <div className='flex justify-center text-sm text-blue-500'>
                    <button>resent Otp</button>
                </div>
            </div>
        </section >
    )
}

export default VerifieEmail