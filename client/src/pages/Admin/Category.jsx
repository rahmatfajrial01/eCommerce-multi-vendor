import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../components/Button'
import DataTable from '../../components/DataTable'
import Input from '../../components/Input'
import { createProductCategory, deleteProductCategory, getAllProductCategory, getAProductCategory, updateProductCategory } from '../../features/category/productCategorySlice'
import * as yup from 'yup';
import { FaTrashAlt, FaEdit } from "react-icons/fa";


const Category = () => {

    const token = useSelector(state => state?.auth?.user?.token)
    const productCatState = useSelector(state => state?.productCategory)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProductCategory())
    }, [
        productCatState.productCategoryCreated,
        productCatState.productCategoryDeleted,
        productCatState.productCategoryUpdated
    ])
    // console.log(productCatState)

    let [isOpen, setIsOpen] = useState(false)
    let [idCat, setIdCat] = useState("")
    // console.log(idCat)
    const openModal = (e) => {
        setIsOpen(true)
        setIdCat(e)
        console.log(e)
    }
    const closeModal = (e) => {
        if (e === 'container') {
            setIsOpen(false)
        }
    }

    const deleteAPost = (id) => {
        const data = { token, id }
        dispatch(deleteProductCategory(data))
        setIsOpen(false)
    }

    const getAId = (id) => {
        dispatch(getAProductCategory(id))
    }


    const Schema = yup.object({
        title: yup.string().required('Category is required'),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: productCatState?.productCategory?.title || ''
        },
        validationSchema: Schema,
        onSubmit: (values, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2));
            if (productCatState?.productCategory) {
                const data = { token, values, id: productCatState.productCategory._id }
                dispatch(updateProductCategory(data))
            } else {
                const data = { token, values }
                dispatch(createProductCategory(data))
                resetForm()
            }
        },
    });

    return (
        <section className='mt-4 px-4 overflow-x-auto space-y-3 w-full'>
            <form onSubmit={formik.handleSubmit} className='flex gap-1 p-5 bg-slate-200 rounded-xl'>
                <div className='relative w-64'>
                    <Input
                        type="text"
                        name="title"
                        placeholder='Category...'
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='flex gap-2 absolute bg-white px-2  rounded-xl'>
                        <p className='text-red-500 text-nowrap'>
                            {formik.touched.title && formik.errors.title}
                        </p>
                        {formik.touched.title && formik.errors.title ? <button onClick={formik.resetForm}>Cancel</button> : ""}
                    </span>
                </div>
                <Button
                    type='submit'
                    color='green'
                    name='Submit' />
            </form>
            <DataTable
                headerTitle={['Category', 'Created At', 'Action']}
            >
                <>
                    {
                        productCatState?.allProductCategory && productCatState?.allProductCategory?.map((item, index) =>
                            <tr key={index} className='border-2 p-2'>
                                <td className='p-2'>{item?.title}</td>
                                <td className='p-2'>
                                    {new Date(item?.createdAt).getDate()}
                                    {" "}
                                    {new Date(item?.createdAt).toLocaleString("default", { month: "long", })}
                                    {" "}
                                    {new Date(item?.createdAt).getFullYear()}
                                </td>
                                <td className='p-2 flex gap-3 '>
                                    <FaTrashAlt onClick={() => { openModal(item?._id) }} className='cursor-pointer hover:text-red-500' />
                                    <FaEdit onClick={() => { getAId(item?._id) }} className='cursor-pointer hover:text-yellow-500' />
                                </td>
                            </tr>
                        )
                    }
                </>
            </DataTable>
            <div id='container' onClick={(e) => closeModal(e.target.id)} className={`fixed inset-0 -top-5 z-10 min-h-screen w-full ${isOpen === true ? "flex justify-center items-center" : "hidden"}`}>
                <div className='max-w-fit space-y-3 bg-slate-300 p-3 border rounded-xl '>
                    <p>Are Your Sure Deleting This Category ?</p>
                    <div className='flex justify-end gap-3 text-white'>
                        <button type='reset' onClick={() => setIsOpen(false)} className='bg-blue-500 py-1 px-3 rounded-xl'>NO</button>
                        <button onClick={() => deleteAPost(idCat)} className='bg-red-500 p-1 px-3 rounded-xl'>Yes</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Category