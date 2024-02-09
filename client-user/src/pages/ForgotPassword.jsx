import React from 'react'
import { Button } from '../components/Button'
import Input from '../components/Input'

const ForgotPassword = () => {
    return (
        <section className='flex flex-col justify-center bg-slate-200 items-center min-h-screen'>
            <div className='space-y-3 w-96 px-5 py-5 bg-white rounded-lg'>
                <h1 className='text-center font-semibold text-xl'>Forgot Password</h1>
                <Input
                    label={'Email'}
                    placeholder={'Email...'}
                />
                <Button
                    type={'submit'}
                    color={'green'}
                    name={'submit'}
                />
            </div>
        </section >
    )
}

export default ForgotPassword