import React, { useState } from 'react'
import { Button } from '../components/Button'
import Input from '../components/Input'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { getCurrentUser, updateProfile } from '../features/auth/authSlice'
import { IoAdd } from "react-icons/io5";


const Profile = () => {

    const userState = useSelector(state => state?.auth)
    const dispatch = useDispatch()

    const Schema = yup.object({
        username: yup.string().required("username is reguired"),
        email: yup.string().nullable().email("email shoul be valid").notRequired('email is required'),
        password: yup.string(),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: userState?.currentUser?.username || '',
            email: userState?.currentUser?.email || '',
            password: userState?.currentUser?.password || '',
        },
        validationSchema: Schema,
        onSubmit: values => {
            let userData = { data: values, token: userState?.user?.token }
            dispatch(updateProfile(userData))
            // alert(JSON.stringify(values, null, 2));
        },
    });

    useEffect(() => {
        dispatch(getCurrentUser(userState?.user?.token))
    }, [])

    const [picture, setPicture] = useState('')

    return (
        <section className='flex flex-col justify-center bg-slate-200 items-center min-h-screen -mt-16 '>
            <div className='flex gap-2'>
                <div className='bg-white rounded-xl p-5 space-y-3 flex flex-col items-center justify-between'>
                    <h1 className='text-center font-semibold text-xl'>Avatar</h1>
                    {
                        userState?.currentUser?.avatar
                            ?
                            <img className='rounded-full h-32 w-32' src={userState?.currentUser?.avatar} alt="" />
                            :
                            picture
                                ?
                                <label htmlFor="picture" className='w-full h-full flex items-center justify-center'>
                                    <img className="object-cover h-32 w-32 rounded-full " src={URL.createObjectURL(picture)} alt="" />
                                </label>
                                :
                                <label htmlFor="picture" className='w-full h-full flex items-center justify-center'>
                                    <div className='bg-slate-200 h-32 w-32  rounded-full flex items-center justify-center'>
                                        <IoAdd size={40} />
                                    </div>
                                </label>
                    }
                    <input onChange={(e) => setPicture(e.target.files[0])} type="file" className='hidden' id='picture' />

                    <div className=''>
                        <div className='text-sm bg-slate-200 py-1 px-2 rounded-xl'>
                            <p className='opacity-70'>Max Image Size : 1 MB</p>
                            <p className='opacity-70'>Format Image : .JPEG, .PNG</p>
                        </div>
                    </div>
                    <button className={`bg-green-500 text-white w-full p-2 rounded-xl text-sm`}>{userState?.currentUser?.avatar ? "Delete" : "Submit"}</button>
                </div>
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
            </div>
        </section>
    )
}

export default Profile