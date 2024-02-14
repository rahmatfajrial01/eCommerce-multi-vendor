import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import Input from '../components/Input'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { login, resetState } from '../features/auth/authSlice'
import Oauth from '../components/Oauth'

const Login = () => {

    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const Schema = yup.object({
        email: yup.string().nullable().email("email shoul be valid").required('email is required'),
        password: yup.string().required("passowrd is reguired"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Schema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            dispatch(login(values))
        },
    });

    useEffect(() => {
        if (authState?.user?.verified === false) {
            navigate(`/verifie-email/${authState?.user?.slug}`)
            dispatch(resetState())
        }
        else if (authState.user !== null && authState.isError === false) {
            localStorage.setItem("user", JSON.stringify({ token: authState.user.token }))
            navigate('/')
        }
    }, [authState])

    return (
        <section className='flex flex-col justify-center bg-slate-200 items-center min-h-screen'>
            <form
                onSubmit={formik.handleSubmit}
                className='space-y-3 w-96 px-5 py-5 bg-white rounded-lg'>
                <h1 className='text-center font-semibold text-xl'>Login</h1>
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
                <p className='text-sm text-blue-500'><Link to={'/forgot-password'}>Forgot password ?</Link></p>
                <Button
                    w='full'
                    type='submit'
                    color='green'
                    name='Submit' />
                <Oauth />
                <p className='text-sm'>not have an account ?<Link to={'/register'} className='text-blue-500'> Register ?</Link></p>
            </form>
        </section>
    )
}

export default Login