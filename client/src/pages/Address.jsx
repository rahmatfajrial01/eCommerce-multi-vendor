import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addAddress, deleteAddress } from '../features/user/userSlice'
import { getAllProvince, getCity } from '../features/rajaOngkir/rajaOngkirSlice'
import Input from '../components/Input'
import { Button } from '../components/Button'
import { FaTrashAlt } from 'react-icons/fa'
import { IoMdClose } from "react-icons/io";

const Address = () => {
    const dispatch = useDispatch()
    const addressState = useSelector((state) => state?.auth)
    const rajaOngkirState = useSelector((state) => state?.rajaOngkir)
    const token = useSelector(state => state?.auth?.user?.token)

    let [isOpenAdd, setIsOpenAdd] = useState(false)
    let [isOpen, setIsOpen] = useState(false)
    let [idProvince, setIdProvince] = useState("")

    useEffect(() => {
        let data = { token, id: idProvince }
        dispatch(getCity(data))
    }, [idProvince])

    const Schema = Yup.object().shape({
        recipientName: Yup.string().required("recipientName is required"),
        telephone: Yup.number().required("telephone is required"),
        province: Yup.string().required("province name is required"),
        city: Yup.string().required("city is required"),
        fullAddress: Yup.string().required("full adress is required"),
    });

    const formik = useFormik({
        initialValues: {
            recipientName: '',
            telephone: '',
            province: '',
            city: '',
            fullAddress: '',
        },
        validationSchema: Schema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            let data = {
                recipientName: values.recipientName,
                telephone: values.telephone,
                province: values.province,
                city: values.city,
                fullAddress: values.fullAddress,
            }

            let userData = { data, token }
            dispatch(addAddress(userData))
            setIsOpenAdd(false)
            setIsOpen(true)
        },
    })

    const deleteAddressHandler = (id, e) => {
        let userData = {
            token, id
        }
        dispatch(deleteAddress(userData))
        if (id === dataAddress._id) {
            setTimeout(() => {
                setDataAddress(null)
                setIsShipment(false)
                setCost('')
            }, 300);
        }
    }

    const closeModal = (e) => {
        if (e === 'container') {
            setIsOpen(false)
            setIsOpenAdd(false)
        }
    }

    return (
        <section className='w-full'>
            {/* <div id='container' onClick={(e) => closeModal(e.target.id)} className={`bg-black bg-opacity-20 fixed inset-0 -top-5 z-10 min-h-screen w-full  ${isOpen === true ? "flex justify-center items-center" : "hidden"}`}> */}
            <div className='md:min-w-96 bg-white border rounded-xl p-5'>
                <div className='flex justify-center w-full p-5 rounded-xl'>
                    <Button
                        color='green'
                        name='+ add new address'
                        onClick={() => { dispatch(getAllProvince(token)), setIsOpenAdd(true), setIsOpen(false) }}
                    />
                </div>
                <div className='space-y-3'>

                    {/* add submit */}
                    {
                        addressState?.currentUser?.addresses && addressState?.currentUser?.addresses?.map((item, index) =>
                            <div
                                key={index}
                                className=' flex justify-between gap-5 rounded-xl p-3 opacity-95 border cursor-pointer'>
                                <div className='flex gap-5'>
                                    <div>
                                        <p>{item?.recipientName}</p>
                                        <p>{item?.province}</p>
                                        <p>{item?.city}</p>
                                        {/* <button
                                            type='button'
                                            onClick={() => { setIsOpen(false), setDataAddress(item), setIdCity(item?.city_id), setIsShipment(true) }}
                                            className='bg-green-500 px-2 rounded-xl text-white'  >
                                            Select
                                        </button> */}
                                    </div>
                                    <div className='flex flex-col'>
                                        <p>{item?.telephone}</p>
                                        <p>{item?.fullAddress}</p>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <span id='trash' onClick={() => deleteAddressHandler(item?._id)} className='cursor-pointer hover:text-red-500'>
                                        <FaTrashAlt />
                                    </span>
                                </div>
                            </div>
                        )

                    }
                </div>
            </div>
            {/* </div> */}
            <div id='container' onClick={(e) => closeModal(e.target.id)} className={`bg-black px-5 bg-opacity-20 fixed inset-0 md:-top-5 top-24 z-10 min-h-screen w-full -mt-32 ${isOpenAdd === true ? "flex justify-center items-center" : "hidden"}`}>
                <div className='md:w-96 w-full bg-white border rounded-xl '>
                    <form onSubmit={formik.handleSubmit} className='relative space-y-3 w-full md:w-96 px-5 py-5 bg-white rounded-lg'>
                        <button type='button' onClick={() => setIsOpenAdd(false)} className='absolute top-5 right-5'><IoMdClose /></button>
                        <h1 className='text-center font-semibold text-xl'>Add Address</h1>
                        <div>
                            <Input
                                type="text"
                                name="recipientName"
                                label="Recipient Name"
                                placeholder='Recipient Name...'
                                onChange={formik.handleChange}
                                onBlur={formik.handleChange}
                                value={formik.values.recipientName}
                            />
                            {formik.errors.recipientName && formik.touched.recipientName ? <p className='text-red-500'>{formik.errors.recipientName}</p> : null}
                        </div>
                        <div>
                            <Input
                                type="text"
                                name="telephone"
                                label="Telephone"
                                placeholder='telephone...'
                                onChange={formik.handleChange}
                                onBlur={formik.handleChange}
                                value={formik.values.telephone}
                            />
                            {formik.errors.telephone && formik.touched.telephone ? <p className='text-red-500'>{formik.errors.telephone}</p> : null}
                        </div>
                        <div>
                            <label name="" id="">Province</label>
                            <select
                                name="province"
                                onInput={formik.handleChange}
                                onChange={(e) => setIdProvince(e.target.value)}
                                onBlur={formik.handleChange}
                                value={formik.values.province}
                                className='border p-2 text-sm rounded-xl w-full' id="">
                                <option value="">choose</option>
                                {
                                    rajaOngkirState?.allProvince?.rajaongkir?.results &&
                                    rajaOngkirState?.allProvince?.rajaongkir?.results?.map((item, index) =>
                                        <option key={index} value={item?.province_id}>{item?.province}</option>
                                    )
                                }
                            </select>
                            {formik.errors.province && formik.touched.province ? <p className='text-red-500'>{formik.errors.province}</p> : null}
                        </div>
                        <div>
                            <label name="" id="">City</label>
                            <select
                                name="city"
                                onChange={formik.handleChange}
                                onBlur={formik.handleChange}
                                value={formik.values.city}
                                className='border p-2 text-sm rounded-xl w-full' id="">
                                <option value="">choose</option>
                                {
                                    rajaOngkirState?.city?.rajaongkir?.results &&
                                    rajaOngkirState?.city?.rajaongkir?.results?.map((item, index) =>
                                        <option key={index} value={item?.city_id}>{item?.city_name}</option>
                                    )
                                }
                            </select>
                            {formik.errors.city && formik.touched.city ? <p className='text-red-500'>{formik.errors.city}</p> : null}
                        </div>
                        <div>
                            <Input
                                type="text"
                                name="fullAddress"
                                label="Full Adrress"
                                placeholder='Full Adrress...'
                                onChange={formik.handleChange}
                                onBlur={formik.handleChange}
                                value={formik.values.fullAddress}
                            />
                            {formik.errors.fullAddress && formik.touched.fullAddress ? <p className='text-red-500'>{formik.errors.fullAddress}</p> : null}
                        </div>
                        <Button
                            type={'submit'}
                            color={'green'}
                            name={'submit'} />
                        {/* <p className='text-sm'>already have account ?<Link to={'/login'} className='text-blue-500'> Login ?</Link></p> */}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Address