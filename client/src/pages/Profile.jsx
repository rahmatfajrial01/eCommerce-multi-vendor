import React, { useState } from 'react'
import { Button } from '../components/Button'
import Input from '../components/Input'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { getCurrentUser, updateProfile, updateProfilePicture } from '../features/auth/authSlice'
import { IoAdd } from "react-icons/io5";
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../utils/firebase'

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

    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        dispatch(getCurrentUser(userState?.user?.token))
        setIsLoading(false)
    }, [userState.profilePictureUpdated])

    const [picture, setPicture] = useState('')

    useEffect(() => {
        if (picture) {
            //firebase delete picture
            setIsLoading(true)
            const storage = getStorage(app);
            if (userState?.currentUser?.avatar) {
                const desertRef = ref(storage, userState?.currentUser?.avatar);
                deleteObject(desertRef)
                    .then(() => { }).catch((error) => {
                        console.log(error)
                    });
            }
            //firebase update picture
            const fileName = new Date().getTime() + picture.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, picture);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // const progress =
                    //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // setImagePercent(Math.round(progress));
                },
                (error) => {
                    // setImageError(true);
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const data = { avatar: downloadURL }
                        const userData = { data, token: userState?.user?.token }
                        dispatch(updateProfilePicture(userData))
                        // setImagePercent(0)
                    });
                }
            );
        }
    }, [picture])

    return (
        <section className='flex justify-center w-full border rounded-xl'>
            <div className='flex gap-5 '>
                <div className='bg-white  p-5 space-y-3 flex flex-col items-center justify-between'>
                    {/* <h1 className='text-center font-semibold text-xl'>Avatar</h1> */}
                    {
                        userState?.currentUser?.avatar
                            ?
                            <img className='rounded-full h-32 w-32 object-cover' src={userState?.currentUser?.avatar} alt="" />
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
                            <p className='opacity-70'>Format Image : .JPEG, .JPG, .PNG</p>
                        </div>
                    </div>
                    <label className='w-full bg-green-500 text-white text-center p-2 rounded-xl text-sm cursor-pointer' htmlFor="picture">
                        {isLoading ? "Loading..." : "Choose Photo"}
                    </label>
                    {/* <button className={`bg-green-500 text-white w-full p-2 rounded-xl text-sm`}>Choose Photo</button> */}
                </div>
                <form
                    onSubmit={formik.handleSubmit}
                    className='space-y-3 w-96 px-5 py-5 bg-white '>
                    {/* <h1 className='text-center font-semibold text-xl'>Profile</h1> */}
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
                    <div className='flex flex-col text-sm'>
                        {/* <Input
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
                        </p> */}
                        <label>Email</label>
                        <label className='border py-2 px-3 rounded-xl bg-slate-200 opacity-90'>{formik.values.email}</label>
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