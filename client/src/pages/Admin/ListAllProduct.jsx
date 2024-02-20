import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../components/Button'
import DataTable from '../../components/DataTable'
import Input from '../../components/Input'
import * as yup from 'yup';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { deleteProduct, getAllProduct, resetState } from '../../features/product/productSlice'
import { Link, useNavigate } from 'react-router-dom'


const ListProduct = () => {

    const token = useSelector(state => state?.auth?.user?.token)
    const productState = useSelector(state => state?.product)
    const shopeState = useSelector(state => state?.shope)
    const dispatch = useDispatch()

    // console.log('ini shpe', shopeState.currentShope.shope[0]._id)
    console.log(productState.allProduct)

    useEffect(() => {
        dispatch(getAllProduct())
    }, [
        productState.productDeleted
    ])
    // console.log(productCatState)

    let [isOpen, setIsOpen] = useState(false)
    let [idCat, setIdCat] = useState("")
    // console.log(idCat)
    const openModal = (e) => {
        setIsOpen(true)
        setIdCat(e)
    }
    const closeModal = () => {
        setIsOpen(false)
    }

    const deleteAPost = (id) => {
        const data = { token, id }
        dispatch(deleteProduct(data))
        setIsOpen(false)
    }

    // const getAId = (id) => {
    //     dispatch(getAProductCategory(id))
    // }



    return (
        <section className='mt-4 px-4 overflow-x-auto space-y-3 w-full'>
            <DataTable
                headerTitle={['Product', 'Shope', 'tag', 'Category', 'Brand', 'Quantity', 'Price']}
            >
                {
                    productState.allProduct && productState.allProduct?.map((item, index) =>
                        <tr key={index} className='border-2 p-2'>
                            <td className='p-2 flex gap-3 items-center w-max'>
                                <img className='h-20' src={item?.images?.url} alt="" />
                                <p>{item?.title}                                </p>
                            </td>
                            <td className='p-2'>{item?.shope?.shopeName}</td>
                            <td className='p-2'>{item?.category?.title}</td>
                            <td className='p-2'>{item?.tag}</td>
                            <td className='p-2'>{item?.brand?.title}</td>
                            <td className='p-2'>{item?.quantity}</td>
                            <td className='p-2'>{item?.price}</td>
                            <td className='p-2'>
                                <div className='flex gap-3'>
                                    <FaTrashAlt onClick={() => { openModal(item?._id) }} className='cursor-pointer hover:text-red-500' />
                                    <FaEdit onClick={() => { getAId(item?._id) }} className='cursor-pointer hover:text-yellow-500' />
                                </div>
                            </td>
                        </tr>
                    )
                }
            </DataTable>
            <div className={`fixed inset-0 z-10 min-h-screen w-full ${isOpen === true ? "flex justify-center items-center" : "hidden"}`}>
                <div className='max-w-fit space-y-3 bg-slate-300 p-3 border rounded-xl '>
                    <p>Are Your Sure Deleting This Product ?</p>
                    <div className='flex justify-end gap-3 text-white'>
                        <button type='reset' onClick={() => closeModal()} className='bg-blue-500 py-1 px-3 rounded-xl'>NO</button>
                        <button onClick={() => deleteAPost(idCat)} className='bg-red-500 p-1 px-3 rounded-xl'>Yes</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ListProduct