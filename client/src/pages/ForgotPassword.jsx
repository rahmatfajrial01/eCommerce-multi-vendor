import React from 'react'
import { Button } from '../components/Button'
import Input from '../components/Input'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../features/auth/authSlice';

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const Schema = yup.object({
        email: yup.string().email().required("email is reguired"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
        },
        validationSchema: Schema,
        onSubmit: values => {
            // alert(JSON.stringify(values));
            dispatch(forgotPassword(values))
        },
    });
    return (
        <section className='flex flex-col justify-center bg-slate-200 items-center min-h-screen'>
            <form onSubmit={formik.handleSubmit} className='space-y-3 w-96 px-5 py-5 bg-white rounded-lg'>
                <h1 className='text-center font-semibold text-xl'>Forgot Password</h1>
                <div>
                    <Input
                        type="text"
                        name="email"
                        label='Email'
                        placeholder='Email...'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <p className='text-red-500'>
                        {formik.touched.email && formik.errors.email}
                    </p>
                </div>
                <Button
                    w='full'
                    type={'submit'}
                    color={'green'}
                    name={'submit'}
                />
            </form>
        </section >
    )
}

export default ForgotPassword