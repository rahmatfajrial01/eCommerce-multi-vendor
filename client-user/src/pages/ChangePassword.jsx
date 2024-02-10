import React from 'react'
import { Button } from '../components/Button'
import Input from '../components/Input'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, resetState } from '../features/auth/authSlice';
import { useEffect } from 'react';

const ChangePassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const getToken = location.pathname.split("/")[2]
    const authState = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const Schema = yup.object({
        password: yup.string().required("password is reguired"),
        Cpassword: yup.string().required("confirm password is required").oneOf([yup.ref('password'), null], 'Must match "password" field value'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            password: "",
            Cpassword: ""
        },
        validationSchema: Schema,
        onSubmit: values => {
            // alert(JSON.stringify(values));
            let data = { password: values.password }
            dispatch(changePassword({ token: getToken, data }))
        },
    });

    useEffect(() => {
        if (authState.changedPassword !== null && authState.isError === false) {
            navigate(`/login`)
            dispatch(resetState())
        }
    }, [authState.changedPassword])

    return (
        <section className='flex flex-col justify-center bg-slate-200 items-center min-h-screen'>
            <form onSubmit={formik.handleSubmit} className='space-y-3 w-96 px-5 py-5 bg-white rounded-lg'>
                <h1 className='text-center font-semibold text-xl'>Change Password</h1>
                <div>
                    <Input
                        type="password"
                        name="password"
                        label="Password"
                        placeholder='Password...'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <p className='text-red-500'>
                        {formik.touched.password && formik.errors.password}
                    </p>
                </div>
                <div>
                    <Input
                        type="password"
                        name="Cpassword"
                        label="Password"
                        placeholder='Password...'
                        value={formik.values.Cpassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    <p className='text-red-500'>
                        {formik.touched.Cpassword && formik.errors.Cpassword}
                    </p>
                </div>
                <Button
                    type={'submit'}
                    color={'green'}
                    name={'submit'}
                />
            </form>
        </section >
    )
}

export default ChangePassword