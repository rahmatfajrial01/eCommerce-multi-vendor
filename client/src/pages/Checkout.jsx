import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { getCart } from '../features/cart/cartSlice'
import { RadioGroup } from '@headlessui/react'
import { FaTrashAlt } from 'react-icons/fa'
import { addAddress, deleteAddress } from '../features/user/userSlice'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input'
import { getAllProvince, getCity, getCost } from '../features/rajaOngkir/rajaOngkirSlice'

const Checkout = () => {

    const dispatch = useDispatch()
    const token = useSelector(state => state?.auth?.user?.token)
    const cartState = useSelector((state) => state?.cart)
    const addressState = useSelector((state) => state?.auth)
    const rajaOngkirState = useSelector((state) => state?.rajaOngkir)
    const [totalAmount, setTotalAmount] = useState(0)
    // let [plan, setPlan] = useState(undefined)


    useEffect(() => {
        dispatch(getCart(token))
        dispatch(getAllProvince(token))
    }, [])
    // console.log(rajaOngkirState?.city?.rajaongkir?.results)

    useEffect(() => {
        let sum = 0
        for (let index = 0; index < cartState?.cart?.length; index++) {
            sum = sum + (Number(cartState?.cart[index]?.quantity) * cartState?.cart[index]?.price)
            setTotalAmount(sum)
        }
    }, [cartState])



    let [cost, setCost] = useState("")
    let [isOpen, setIsOpen] = useState(false)
    let [isOpenAdd, setIsOpenAdd] = useState(false)
    let [dataAddress, setDataAddress] = useState(false)
    let [idProvince, setIdProvince] = useState("")
    let [idCity, setIdCity] = useState(null)
    let [shipment, setShipment] = useState(null)
    let [isShipment, setIsShipment] = useState(false)
    let [idCat, setIdCat] = useState("")



    const openModal = () => {
        setIsOpen(true)
    }

    useEffect(() => {
        let data = { token, id: idProvince }
        dispatch(getCity(data))
    }, [idProvince])

    useEffect(() => {
        if (idCity && shipment) {
            let data = { origin: '153', destination: idCity, weight: 1700, courier: shipment }
            // let data = { origin: '501', destination: '114', weight: 1700, courier: 'jne' }
            let userData = {
                token, data
            }
            dispatch(getCost(userData))
        }
    }, [idCity, shipment])
    console.log(rajaOngkirState?.cost?.rajaongkir?.results)

    const closeModal = (e) => {
        if (e === 'container') {
            setIsOpen(false)
            setIsOpenAdd(false)
        }
    }

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

    const handlePayment = () => {
        if (!dataAddress) {
            alert('plaes chosse address')
        } else if (!shipment) {
            alert('please choose cories')
        } else if (!cost) {
            alert('please choose shiping cost')
        } else {
            alert('ok')
        }
    }

    const Schema = Yup.object().shape({
        recipientName: Yup.string().required("recipientName is required"),
        province: Yup.string().required("province name is required"),
        city: Yup.string().required("city is required"),
        fullAddress: Yup.string().required("full adress is required"),
    });

    const formik = useFormik({
        initialValues: {
            recipientName: '',
            province: '',
            city: '',
            fullAddress: '',
        },
        validationSchema: Schema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            let data = {
                recipientName: values.recipientName,
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

    return (
        <section>
            <div className='flex mt-5 container justify-center mx-auto gap-5'>
                <div className='space-y-5'>
                    <div className='w-[700px]'>
                        <div className='border p-5 rounded-xl space-y-5'>
                            <h1>Address</h1>
                            <Button
                                type='button'
                                name='Choose Address'
                                color='green'
                                onClick={() => { openModal() }}
                            />
                            {
                                dataAddress &&
                                <div>
                                    <div className='flex gap-10 border p-5 rounded-xl bg-green-500 text-white'>
                                        <div>
                                            <p>recipient name : <span className='font-semibold'>{dataAddress?.recipientName}</span> </p>
                                            <p>province : <span className='font-semibold'>{dataAddress?.province}</span></p>
                                            <p>city: <span className='font-semibold'>{dataAddress?.city}</span></p>
                                        </div>
                                        <p>full address : <span className='font-semibold'> {dataAddress?.fullAddress}</span></p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='w-[700px]'>
                        {/* shipemtn methods */}
                        {
                            isShipment &&
                            <div className='border p-5 rounded-xl space-y-5'>
                                <h1>Shipment Methods</h1>
                                <p>Sent From : <span>{rajaOngkirState?.cost?.rajaongkir?.origin_details?.province}, {rajaOngkirState?.cost?.rajaongkir?.origin_details?.city_name}</span></p>
                                <div className='flex gap-5 items-center'>
                                    <button onClick={() => { setShipment('jne'), setCost('') }} className={`rounded-lg p-1  ${shipment === 'jne' && 'border-2 border-green-500'}`}>
                                        <img className='h-16 w-24 object-cover' src="../../../public/jne.png" alt="" />
                                    </button>
                                    <button onClick={() => { setShipment('pos'), setCost('') }} className={`rounded-lg p-1  ${shipment === 'pos' && 'border-2 border-green-500'}`}>
                                        <img className='h-16 w-24 object-cover' src="../../../public/pos.png" alt="" />
                                    </button>
                                    <button onClick={() => { setShipment('tiki'), setCost('') }} className={`rounded-lg p-1 pt-5 h-16 focus:border-2  ${shipment === 'tiki' && 'border-2 border-green-500'}`}>
                                        <img className='h-8 w-24 object-cover' src="../../../public/tiki.png" alt="" />
                                    </button>
                                </div>
                                <div className='flex gap-5'>
                                    {
                                        rajaOngkirState?.cost?.rajaongkir?.results[0]?.costs && rajaOngkirState?.cost?.rajaongkir?.results[0]?.costs?.map((item, index) =>
                                            <div key={index} className={`${item?.cost[0]?.value === cost && 'border-2 border-green-500'} space-y-3 p-3 rounded-xl border cursor-pointer `} onClick={() => setCost(item?.cost[0]?.value)}
                                            >
                                                <div className='flex justify-between gap-10'>
                                                    <p>{item?.service}</p>
                                                    <p>{item?.cost[0]?.etd}</p>
                                                </div>
                                                <p>Rp. {item?.cost[0]?.value}</p>
                                            </div>
                                        )
                                    }
                                </div>
                                {/* <Button
                                type='button'
                                name='Choose Address'
                                color='green'
                                onClick={() => { openModal() }}
                            /> */}
                            </div>
                        }
                    </div>
                </div>
                <div className='w-[450px]'>
                    <div className='border space-y-5 p-5 rounded-lg'>
                        {
                            cartState.cart && cartState.cart.map((item, index) =>
                                <div key={index} className='flex items-center gap-3'>
                                    <img className='w-1/4 object-cover ' src={item?.product?.images?.url} alt="" />
                                    <div className='w-full'>
                                        <p>{item?.product?.title}</p>
                                        <div className='flex justify-between'>
                                            <p className='rounded-full'>Price:  </p><span className='font-semibold'>Rp.{item?.quantity * item?.price}</span>
                                        </div>
                                        <p className='rounded-full'>Item: <span>{item?.quantity}</span> </p>
                                    </div>
                                </div>
                            )
                        }
                        <div className='space-y-1'>
                            <div className='flex justify-between'>
                                <p>SubTotal : </p><span className='font-semibold'>Rp. {totalAmount}</span>
                            </div>
                            <div className='flex justify-between'>
                                <p>Shipping : </p><span className='font-semibold'>Rp. {cost}</span>
                            </div>
                            <div className='flex justify-between item'>
                                <p>Total :  </p><span className='font-semibold text-xl'>Rp. {cost + totalAmount}</span>
                            </div>
                        </div>
                        <Button
                            w='full'
                            type='button'
                            name='Choose Payment'
                            color='green'
                            onClick={() => handlePayment()}
                        />
                    </div>
                </div>
            </div>

            <div id='container' onClick={(e) => closeModal(e.target.id)} className={`bg-black bg-opacity-20 fixed inset-0 -top-5 z-10 min-h-screen w-full  ${isOpen === true ? "flex justify-center items-center" : "hidden"}`}>
                <div className='min-w-96 bg-white border rounded-xl p-5'>
                    <div className='flex justify-center w-full p-5 rounded-xl'>
                        <Button
                            color='green'
                            name='+ add new address'
                            onClick={() => { setIsOpenAdd(true), setIsOpen(false) }}
                        />
                    </div>
                    <div className='space-y-3'>

                        {/* add submit */}
                        {
                            addressState?.currentUser?.addresses && addressState?.currentUser?.addresses?.map((item, index) =>
                                <div
                                    key={index}
                                    className=' flex justify-between gap-5 rounded-xl p-3 opacity-95 border-2 cursor-pointer'>
                                    <div className='flex gap-5'>
                                        <div>
                                            <p>{item?.recipientName}</p>
                                            <p>{item?.province}</p>
                                            <p>{item?.city}</p>
                                            <button
                                                type='button'
                                                onClick={() => { setIsOpen(false), setDataAddress(item), setIdCity(item?.city_id), setIsShipment(true) }}
                                                className='bg-green-500 px-2 rounded-xl text-white'  >
                                                Select
                                            </button>
                                        </div>
                                        <p>{item?.fullAddress}</p>
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
            </div>

            <div id='container' onClick={(e) => closeModal(e.target.id)} className={`bg-black bg-opacity-20 fixed inset-0 -top-5 z-10 min-h-screen w-full  ${isOpenAdd === true ? "flex justify-center items-center" : "hidden"}`}>
                <div className='w-96 bg-white border rounded-xl '>
                    <form onSubmit={formik.handleSubmit} className='space-y-3 w-96 px-5 py-5 bg-white rounded-lg'>
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
                            {/* <Input
                                type="text"
                                name="province"
                                label="Province"
                                placeholder='Province'
                                onChange={formik.handleChange}
                                onBlur={formik.handleChange}
                                value={formik.values.province}
                            /> */}
                            {formik.errors.province && formik.touched.province ? <p className='text-red-500'>{formik.errors.province}</p> : null}
                        </div>
                        <div>

                            <label name="" id="">Province</label>
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

                            {/* <Input
                                type="text"
                                name="city"
                                label="City"
                                placeholder='City...'
                                onChange={formik.handleChange}
                                onBlur={formik.handleChange}
                                value={formik.values.city}
                            /> */}
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
        </section >
    )
}

export default Checkout