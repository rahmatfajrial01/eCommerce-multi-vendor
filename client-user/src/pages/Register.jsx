import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import Input from '../components/Input'

const Register = () => {
    return (
        <section className='flex flex-col justify-center bg-slate-200 items-center min-h-screen'>
            <div className='space-y-3 w-96 px-5 py-5 bg-white rounded-lg'>
                <h1 className='text-center font-semibold text-xl'>Register</h1>
                <Input
                    label={'username'}
                    placeholder={'username...'}
                />
                <Input
                    label={'Email'}
                    placeholder={'Email...'}
                />
                <Input
                    label={'Password'}
                    placeholder={'Password...'}
                />
                <Input
                    label={'Confirm Password'}
                    placeholder={'Confirm Password...'}
                />
                <Button
                    type={'submit'}
                    color={'green'}
                    name={'submit'} />
                <p className='text-sm'>already have account ?<Link to={'/login'} className='text-blue-500'> Login ?</Link></p>
            </div>
        </section>
    )
}

export default Register