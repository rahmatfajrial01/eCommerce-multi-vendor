import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import Input from '../components/Input'

const Login = () => {
    return (
        <section className='flex flex-col justify-center bg-slate-200 items-center min-h-screen'>
            <div className='space-y-3 w-96 px-5 py-5 bg-white rounded-lg'>
                <h1 className='text-center font-semibold text-xl'>Login</h1>
                <Input
                    label={'Email'}
                    placeholder={'Email...'}
                />
                <Input
                    label={'Password'}
                    placeholder={'Password...'}
                />
                <p className='text-sm text-blue-500'><Link to={'/forgot-password'}>Forgot password ?</Link></p>
                <Button
                    type={'submit'}
                    color={'green'}
                    name={'submit'} />
                <p className='text-sm'>not have an account ?<Link to={'/register'} className='text-blue-500'> Register ?</Link></p>
            </div>
        </section>
    )
}

export default Login