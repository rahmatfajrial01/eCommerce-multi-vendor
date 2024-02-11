import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import Input from '../../components/Input'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getCurrentUser, resetState } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userState = useSelector(state => state?.auth)
    useEffect(() => {
        dispatch(getCurrentUser(userState?.user?.token))
    }, [])
    console.log(userState.currentUser)

    const Schema = Yup.object().shape({
        telephone: Yup.number().required("telephone is required"),
        shopeName: Yup.string().required("shope name name is required"),
        address: Yup.string().required("address is required"),
        codePos: Yup.number().required("code pos is required"),
    });

    const formik = useFormik({
        initialValues: {
            telephone: '',
            shopeName: '',
            address: '',
            codePos: '',
        },
        validationSchema: Schema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            // dispatch(register(values))
        },
    })

    return (
        <section className='flex flex-col justify-center bg-slate-200 items-center min-h-screen'>
            <form onSubmit={formik.handleSubmit} className='space-y-3 w-96 px-5 py-5 bg-white rounded-lg'>
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
                <div>
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
                </div>
                <div>
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