import React from 'react'
import { Button } from '../components/Button'
import Input from '../components/Input'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { getCurrentUser } from '../features/auth/authSlice'

const Profile = () => {

    const userState = useSelector(state => state?.auth)
    const dispatch = useDispatch()

    const Schema = yup.object({
        username: yup.string().required("username is reguired"),
        email: yup.string().nullable().email("email shoul be valid").required('email is required'),
        password: yup.string().required("passowrd is reguired"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: userState?.currentUser?.username || '',
            email: userState?.currentUser?.email || '',
            password: '',
        },
        validationSchema: Schema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    useEffect(() => {
        dispatch(getCurrentUser(userState?.user?.token))
    }, [])

    return (
        <section className='flex flex-col justify-center bg-slate-200 items-center min-h-screen -mt-16 '>
            <form
                onSubmit={formik.handleSubmit}
                className='space-y-3 w-96 px-5 py-5 bg-white rounded-lg'>
                <h1 className='text-center font-semibold text-xl'>Profile</h1>
                <div>
                    <Input
                        type="text"
                        name="username"
                        label='username'
                        placeholder='...'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <p className='text-red-500'>
                        {formik.touched.username && formik.errors.username}
                    </p>
                </div>
                <div>
                    <Input
                        type="text"
                        name="email"
                        label='Email'
                        placeholder='...'
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
                <Button
                    w='full'
                    type='submit'
                    color='green'
                    name='Submit' />
            </form>
        </section>
    )
}

export default Profile