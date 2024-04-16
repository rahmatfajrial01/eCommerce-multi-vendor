import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import Input from '../components/Input'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register, resetState } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';


const Register = () => {
    const authState = useSelector(state => state.auth)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const Schema = Yup.object().shape({
        username: Yup.string().required("username is required"),
        email: Yup.string().email("email must be valid").required("email is required"),
        password: Yup.string().required("password is required").min(5),
        Cpassword: Yup.string().required("confirm password is required").oneOf([Yup.ref('password'), null], 'Must match "password" field value'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            Cpassword: '',
        },
        validationSchema: Schema,
        onSubmit: values => {
            // dispatch(registerUser(values))
            // alert(JSON.stringify(values, null, 2));
            dispatch(register(values))

        },
    })

    useEffect(() => {
        if (authState.createdUser !== null && authState.isError === false) {
            navigate(`/verifie-email/${authState.createdUser.slug}`)
            dispatch(resetState())
        }
    }, [authState.createdUser])


    return (
        <section className='flex flex-col justify-center bg-slate-200 items-center min-h-screen px-5'>
            <form onSubmit={formik.handleSubmit} className='space-y-3 sm:w-96 w-full px-5 py-5 bg-white rounded-lg'>
                <h1 className='text-center font-semibold text-xl'>Register</h1>
                <div>
                    <Input
                        type="text"
                        name="username"
                        label="Username"
                        placeholder='username...'
                        onChange={formik.handleChange}
                        onBlur={formik.handleChange}
                        value={formik.values.username}
                    />
                    {formik.errors.username && formik.touched.username ? <p className='text-red-500'>{formik.errors.username}</p> : null}
                </div>
                <div>
                    <Input
                        type="text"
                        name="email"
                        label="Email"
                        placeholder='email...'
                        onChange={formik.handleChange}
                        onBlur={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email ? <p className='text-red-500'>{formik.errors.email}</p> : null}
                </div>
                <div>
                    <Input
                        type="password"
                        name="password"
                        label="Password"
                        placeholder='password...'
                        onChange={formik.handleChange}
                        onBlur={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password ? <p className='text-red-500'>{formik.errors.password}</p> : null}
                </div>
                <div>
                    <Input
                        type="password"
                        name="Cpassword"
                        label="Confirm Password"
                        placeholder='confirm password...'
                        onChange={formik.handleChange}
                        onBlur={formik.handleChange}
                        value={formik.values.Cpassword}
                    />
                    {formik.errors.Cpassword && formik.touched.Cpassword ? <p className='text-red-500'>{formik.errors.Cpassword}</p> : null}
                </div>
                <Button
                    w="full"
                    type={'submit'}
                    color={'green'}
                    name={'submit'} />
                <p className='text-sm'>already have account ?<Link to={'/login'} className='text-blue-500'> Login ?</Link></p>
            </form>
        </section>
    )
}

export default Register