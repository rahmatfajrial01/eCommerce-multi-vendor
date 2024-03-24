import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import Input from '../../components/Input'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getCurrentUser } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { register, resetState } from '../../features/shope/shopeSlice';
import { getAllProvince, getCity } from '../..//features/rajaOngkir/rajaOngkirSlice'

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const rajaOngkirState = useSelector((state) => state?.rajaOngkir)

    let [idProvince, setIdProvince] = useState("")

    useEffect(() => {
        let data = { token: userState?.user?.token, id: idProvince }
        dispatch(getCity(data))
    }, [idProvince])

    const userState = useSelector(state => state?.auth)
    const shopeState = useSelector(state => state?.shope)

    useEffect(() => {
        dispatch(getCurrentUser(userState?.user?.token))
        dispatch(getAllProvince(userState?.user?.token))
    }, [])

    const Schema = Yup.object().shape({
        telephone: Yup.number().required("telephone is required"),
        shopeName: Yup.string().required("shope name name is required"),
        province: Yup.string().required("province is required"),
        city: Yup.string().required("city is required"),
        fullAddress: Yup.string().required("fullAddress is required"),
    });

    const formik = useFormik({
        initialValues: {
            telephone: '',
            shopeName: '',
            province: '',
            city: '',
            fullAddress: '',
        },
        validationSchema: Schema,
        onSubmit: values => {
            // alert(JSON.stringify(userData, null, 2));
            let data = {
                telephone: values.telephone,
                shopeName: values.shopeName,
                province: values.province,
                city: values.city,
                fullAddress: values.fullAddress,
                user: userState?.currentUser?._id
            }
            let token = userState?.user?.token
            let userData = { data, token }
            console.log(userData)
            dispatch(register(userData))
        },
    })

    useEffect(() => {
        if (shopeState.createdShope !== null && shopeState.isError === false) {
            window.open(`/admin`, '_blank');
            setTimeout(() => {
                navigate('/')
            }, 300);
            // dispatch(resetState())
        }
    }, [shopeState?.createdShope])


    return (
        <section className='flex flex-col justify-center bg-slate-200 items-center min-h-screen'>
            <form onSubmit={formik.handleSubmit} className='space-y-3 w-96 px-5 py-5 bg-white rounded-lg -mt-40'>
                <h1 className='text-center font-semibold text-xl'>Become Seller</h1>
                <div>
                    <Input
                        type="text"
                        name="telephone"
                        label="Telephone"
                        placeholder='Telephone...'
                        onChange={formik.handleChange}
                        onBlur={formik.handleChange}
                        value={formik.values.telephone}
                    />
                    {formik.errors.telephone && formik.touched.telephone ? <p className='text-red-500'>{formik.errors.telephone}</p> : null}
                </div>
                <div>
                    <Input
                        type="text"
                        name="shopeName"
                        label="Shope Name"
                        placeholder='Shope Name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleChange}
                        value={formik.values.shopeName}
                    />
                    {formik.errors.shopeName && formik.touched.shopeName ? <p className='text-red-500'>{formik.errors.shopeName}</p> : null}
                </div>
                {/* <div>
                    <Input
                        type="text"
                        name="address"
                        label="Address"
                        placeholder='Address...'
                        onChange={formik.handleChange}
                        onBlur={formik.handleChange}
                        value={formik.values.address}
                    />
                    {formik.errors.address && formik.touched.address ? <p className='text-red-500'>{formik.errors.address}</p> : null}
                </div> */}
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
                {/* <div>
                    <Input
                        type="text"
                        name="codePos"
                        label="Code pos"
                        placeholder='Code Pos...'
                        onChange={formik.handleChange}
                        onBlur={formik.handleChange}
                        value={formik.values.codePos}
                    />
                    {formik.errors.codePos && formik.touched.codePos ? <p className='text-red-500'>{formik.errors.codePos}</p> : null}
                </div> */}
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
                <div className='text-sm'>
                    <label htmlFor="fullAddress">Full Address</label>
                    <textarea
                        className='border w-full rounded-xl p-2'
                        name="fullAddress"
                        id="fullAddress"
                        rows="4"
                        onChange={formik.handleChange}
                        onBlur={formik.handleChange}
                        value={formik.values.fullAddress}
                    >
                    </textarea>
                    {formik.errors.fullAddress && formik.touched.fullAddress ? <p className='text-red-500'>{formik.errors.fullAddress}</p> : null}
                </div>
                <Button
                    type={'submit'}
                    color={'green'}
                    name={'submit'} />
                {/* <p className='text-sm'>already have account ?<Link to={'/login'} className='text-blue-500'> Login ?</Link></p> */}
            </form>
        </section>
    )
}

export default Register