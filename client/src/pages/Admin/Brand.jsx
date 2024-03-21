import React, { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import DataTable from '../../components/DataTable'
import Input from '../../components/Input'
import { TiDeleteOutline } from "react-icons/ti";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createBrand, deleteBrand, getABrand, getAllBrand, resetState } from '../../features/brand/brandSlice';
import { GrUpdate } from "react-icons/gr";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Brand = () => {

    const dispatch = useDispatch()
    const token = useSelector(state => state?.auth?.user?.token)
    const brandState = useSelector(state => state?.brand)

    useEffect(() => {
        dispatch(getAllBrand())
    }, [
        brandState?.brandCreated,
        brandState?.brandDeleted
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
        dispatch(deleteBrand(userData))
    }

    const [editPicture, setEditPicture] = useState('')

    const Schema = yup.object({
        title: yup.string().required('title is required'),
        image: yup.mixed().required("image is required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: brandState?.singleBrand?.title || '',
            image: '',
        },
        validationSchema: Schema,
        onSubmit: (values, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2));
            const data = new FormData()
            data.append('image', values.image)
            data.append('title', values.title)
            let userData = { data, token }
            dispatch(createBrand(userData))
            resetForm()
            setPicture('');
        },
    });

    const getAId = (id) => {
        dispatch(getABrand(id))
    }

    return (
        <section className='p-5 space-y-5'>
            <form onSubmit={formik.handleSubmit} className='flex gap-5 p-5 bg-slate-200 rounded-xl '>
                <div className='w-2/3'>
                    {
                        brandState?.singleBrand?.image?.url
                            ?
                            <div className='relative'>
                                <div className='flex justify-center bg-white'>
                                    <div>
                                        <img className='h-32' src={brandState?.singleBrand?.image?.url} alt="" />
                                    </div>
                                    <label htmlFor="imgUpdate">
                                        {
                                            brandState?.isLoading
                                                ?
                                                <AiOutlineLoading3Quarters size={40} className='text-black absolute top-2 right-2 animate-spin  bg-white rounded-full p-2' />
                                                :
                                                <GrUpdate size={40} className='text-black absolute top-2 right-2 bg-white rounded-full cursor-pointer p-2' />
                                        }
                                        {/* <input id='imgUpdate' onChange={(e) => { setEditPicture(e.target.files[0]), setId(brandState?.singleBrand?._id) }} className='hidden' type="file" /> */}
                                    </label>
                                </div>
                            </div> :
                            picture
                                ?
                                <div className='relative'>
                                    <label htmlFor="img" className='flex justify-center bg-white'>
                                        <img className='h-32' src={URL.createObjectURL(picture)} alt="" />
                                        <TiDeleteOutline onClick={handleReset} className='text-4xl text-red-500 absolute top-2 right-2 bg-white rounded-full cursor-pointer' />
                                    </label>
                                </div>
                                :
                                <label htmlFor="img" className='flex h-32 items-center justify-center p-20 bg-white rounded-xl'>
                                    <div>Click Here</div>
                                </label>
                    }
                    {formik.errors.image && formik.touched.image ? <p className='text-red-500'>{formik.errors.image}</p> : null}
                    <input onChange={handleChoose} type="file" id='img' className='hidden' />
                </div>
                <div className='space-y-4 w-1/3'>
                    <div>
                        <Input
                            type="text"
                            name="title"
                            label="Brand Name"
                            placeholder='...'
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.title && formik.touched.title ? <p className='text-red-500'>{formik.errors.title}</p> : null}
                    </div>
                    <div className='flex gap-4'>
                        <Button
                            name={brandState?.isLoading ? 'Loading...' : 'Submit'}
                            color='green'
                            w='full'
                            type='submit'
                        />
                        {
                            brandState?.singleBrand &&
                            <Button
                                onClick={() => dispatch(resetState())}
                                name='ok'
                                color='red'
                                type='submit'
                            />
                        }
                    </div>
                </div>
            </form>
            <DataTable
                headerTitle={['Banner Name', 'Created At', 'Action']}
            >
                {
                    brandState.allBrand && brandState.allBrand.map((item, index) =>
                        <tr key={index} className='border-2 p-2'>
                            <td className='p-2 flex gap-3 items-center w-max'>
                                <img className='h-20' src={item?.image?.url} alt="" />
                                <p>{item?.title}                                </p>
                            </td>
                            <td className='p-2'>{item?.createdAt}</td>
                            <td className='p-2'>
                                <div className='flex gap-3'>
                                    <FaTrashAlt onClick={() => handleDelete(item?._id)} className='cursor-pointer hover:text-red-500 ' />
                                    <FaEdit onClick={() => getAId(item?._id)} className='cursor-pointer hover:text-yellow-500' />
                                </div>
                            </td>
                        </tr>
                    )
                }
            </DataTable>
        </section>
    )
}

export default Brand