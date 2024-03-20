import React, { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import DataTable from '../../components/DataTable'
import Input from '../../components/Input'
import { TiDeleteOutline } from "react-icons/ti";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createBanner, deleteBanner, getAllBanner } from '../../features/banner/bannerSlice';

const Banner = () => {

    const dispatch = useDispatch()
    const token = useSelector(state => state?.auth?.user?.token)
    const bannerState = useSelector(state => state?.banner)

    useEffect(() => {
        dispatch(getAllBanner())
    }, [
        bannerState?.bannerCreated,
        bannerState?.bannerDeleted
    ])

    const [picture, setPicture] = useState('')
    const handleChoose = (e) => {
        const file = e.target.files[0];
        setPicture(file);
        formik.setFieldValue('image', e.currentTarget.files[0]);
    }
    const handleReset = () => {
        setPicture('');
        formik.setFieldValue('image', "");
    }

    const handleDelete = (id) => {
        let userData = { token, id }
        dispatch(deleteBanner(userData))
    }

    const Schema = yup.object({
        title: yup.string().required('title is required'),
        type: yup.string().required('type is required'),
        image: yup.mixed().required("image is required"),
    });
    const formik = useFormik({
        // enableReinitialize: true,
        initialValues: {
            title: '',
            type: '',
            image: '',
        },
        validationSchema: Schema,
        onSubmit: (values, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2));
            const data = new FormData()
            data.append('image', values.image)
            data.append('type', values.type)
            data.append('title', values.title)
            let userData = { data, token }
            dispatch(createBanner(userData))
            resetForm()
            setPicture('');
        },
    });

    return (
        <section className='p-5 space-y-5'>
            <form onSubmit={formik.handleSubmit} className='flex gap-5 p-5 bg-slate-200 rounded-xl '>
                <div className='w-2/3'>
                    {
                        picture
                            ?
                            <div className='relative'>
                                <label htmlFor="img" className='flex justify-center bg-white'>
                                    <img className='h-80' src={URL.createObjectURL(picture)} alt="" />
                                    <TiDeleteOutline onClick={handleReset} className='text-4xl text-red-500 absolute top-2 right-2 bg-white rounded-full cursor-pointer' />
                                </label>
                            </div>
                            :
                            <label htmlFor="img" className='flex h-80 items-center justify-center p-20 bg-white rounded-xl'>
                                <div>Click Here</div>
                            </label>
                    }
                    {formik.errors.image && formik.touched.image ? <p className='text-red-500'>{formik.errors.image}</p> : null}
                    <input onChange={handleChoose} type="file" id='img' className='hidden' />
                </div>
                <div className='space-y-4 w-1/3'>
                    <div className='text-sm'>
                        <label htmlFor="">Banner Posistion</label>
                        <select
                            name="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='w-full p-2 rounded-xl'>
                            <option value=''>Choose Position</option>
                            <option value='main'>Main Banner</option>
                            {
                                bannerState.allBanner && bannerState.allBanner.filter(item => item.type === 'leftTop').length < 1 &&
                                <option value='leftTop'>Left Top Banner</option>
                            }
                            {
                                bannerState.allBanner && bannerState.allBanner.filter(item => item.type === 'leftBottom').length < 1 &&
                                <option value='leftBottom'>Left Bottom Banner</option>
                            }
                        </select>
                        {formik.errors.type && formik.touched.type ? <p className='text-red-500'>{formik.errors.type}</p> : null}
                    </div>
                    <div>
                        <Input
                            type="text"
                            name="title"
                            label="Banner Name"
                            placeholder='...'
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.title && formik.touched.title ? <p className='text-red-500'>{formik.errors.title}</p> : null}
                    </div>
                    <Button
                        name={bannerState?.isLoading ? 'Loading...' : 'Submit'}
                        color='green'
                        w='full'
                        type='submit'
                    />
                </div>
            </form>
            <DataTable
                headerTitle={['Banner Name', 'Banner Type', 'Created At', 'Action']}
            >
                {
                    bannerState.allBanner && bannerState.allBanner.map((item, index) =>
                        <tr key={index} className='border-2 p-2'>
                            <td className='p-2 flex gap-3 items-center w-max'>
                                <img className='h-20' src={item?.image?.url} alt="" />
                                <p>{item?.title}                                </p>
                            </td>
                            <td className='p-2'>{item?.type}</td>
                            <td className='p-2'>{item?.createdAt}</td>
                            <td className='p-2'>
                                <div className='flex gap-3'>
                                    <FaTrashAlt onClick={() => handleDelete(item?._id)} className='cursor-pointer hover:text-red-500 ' />
                                    <FaEdit className='cursor-pointer hover:text-yellow-500' />
                                </div>
                            </td>
                        </tr>
                    )
                }
            </DataTable>
        </section>
    )
}

export default Banner