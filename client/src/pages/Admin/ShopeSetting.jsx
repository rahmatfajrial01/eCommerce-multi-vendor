import React, { useEffect, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../utils/firebase'
import { updateAddressShope, updateInfoShope, updateProfileShope } from '../../features/shope/shopeSlice';
import Modal from '../../components/Modal';
import { Button } from '../../components/Button';
import Input from '../../components/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAllProvince, getCity, updateCost } from '../../features/rajaOngkir/rajaOngkirSlice'


const Address = () => {
    const dispatch = useDispatch()

    const rajaOngkirState = useSelector((state) => state?.rajaOngkir)
    const shopeState = useSelector(state => state?.shope)
    const token = useSelector(state => state?.auth?.user?.token)

    let [isOpenAdd, setIsOpenAdd] = useState(false)
    const [picture, setPicture] = useState('')
    const [telephone, setTelephone] = useState('')
    const [shopeName, setShopeName] = useState('')
    const [isLoading, setIsLoading] = useState('')
    let [isOpen, setIsOpen] = useState(false)
    let [idProvince, setIdProvince] = useState("")


    const closeModal = (e) => {
        if (e === 'container') {
            setIsOpen(false)
            setIsOpenAdd(false)
        }
    }

    useEffect(() => {
        if (picture) {
            //firebase delete picture
            setIsLoading(true)
            const storage = getStorage(app);
            if (shopeState?.currentShope?.shope[0]?.avatar) {
                const desertRef = ref(storage, shopeState?.currentShope?.shope[0]?.avatar);
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
                        const userData = { data, token, id: shopeState?.currentShope?.shope[0]?._id }
                        dispatch(updateProfileShope(userData))
                        setIsLoading(false)
                        // setImagePercent(0)
                    });
                }
            );
        }
    }, [picture])


    useEffect(() => {
        let data = { token, id: idProvince }
        dispatch(getCity(data))
    }, [idProvince])

    const handleOpenInfo = () => {
        setIsOpen(true)
        setTelephone(shopeState?.currentShope?.shope[0]?.telephone)
        setShopeName(shopeState?.currentShope?.shope[0]?.shopeName)
    }

    const handleUpdateInfo = () => {
        if (telephone === "" || shopeName === "") {
            alert("empty info")
        } else {
            let data = { telephone, shopeName }
            const userData = { data, token, id: shopeState?.currentShope?.shope[0]?._id }
            dispatch(updateInfoShope(userData))
            setIsOpen(false)
        }
    }

    const Schema = Yup.object().shape({
        province: Yup.string().required("province name is required"),
        city: Yup.string().required("city is required"),
        fullAddress: Yup.string().required("full adress is required"),
    });

    const formik = useFormik({
        initialValues: {
            province: '',
            city: '',
            fullAddress: '',
        },
        validationSchema: Schema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            let data = {
                province: values.province,
                city: values.city,
                fullAddress: values.fullAddress,
            }

            let userData = { data, token, id: shopeState?.currentShope?.shope[0]?._id }
            dispatch(updateAddressShope(userData))
            setIsOpenAdd(false)
        },
    })

    return (
        <section className='m-5 p-5 bg-slate-200 rounded-xl space-y-10'>
            <div className='bg-white rounded-xl  w-max p-5 space-y-3 flex flex-col items-center justify-between'>
                <h1 className='text-center font-semibold text-xl'>Shope Avatar</h1>
                {
                    shopeState?.currentShope?.shope[0]?.avatar
                        ?
                        <img className='rounded-full h-32 w-32 object-cover' src={shopeState?.currentShope?.shope[0]?.avatar} alt="" />
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
            <div className='w-1/2 space-y-4'>
                <h1 className='font-semibold text-lg'>Shope Info</h1>
                <div>
                    <p className='font-semibold'>Telephone</p>
                    <p>{shopeState?.currentShope?.shope[0]?.telephone}</p>
                </div>
                <div>
                    <p className='font-semibold'>Shope Name</p>
                    <p>{shopeState?.currentShope?.shope[0]?.shopeName}</p>
                </div>
                <button onClick={() => handleOpenInfo()} className='p-2 bg-green-500 text-white rounded-xl text-sm'>Change Info</button>
            </div>
            <div>
                <h1 className='font-bold mb-2 text-lg'>Shope Address</h1>
                <div className='flex gap-5 mb-2'>
                    <div>
                        <p className='font-semibold'>province</p>
                        <p> {shopeState?.currentShope?.shope[0]?.addresses[0].province}</p>
                    </div>
                    <div>
                        <p className='font-semibold'>city</p>
                        <p> {shopeState?.currentShope?.shope[0]?.addresses[0].city}</p>
                    </div>
                    <div>
                        <p className='font-semibold'>full address</p>
                        <p> {shopeState?.currentShope?.shope[0]?.addresses[0].fullAddress}</p>
                    </div>
                </div>
                <button onClick={() => { setIsOpenAdd(true), dispatch(getAllProvince(token)) }} className='p-2 bg-green-500 text-white rounded-xl text-sm'>Change Address</button>
            </div>
            <Modal
                isOpen={isOpen}
                closeModal={(e) => closeModal(e.target.id)}
                text='Change Shope Info'
            >
                <div className='space-y-3 text-black'>
                    <Input
                        type="text"
                        name="shopeName"
                        label="Shope Name"
                        placeholder='...'
                        value={shopeName}
                        onChange={e => setShopeName(e.target.value)}
                    />
                    <Input
                        type="text"
                        name="telephone"
                        label="Telephone"
                        placeholder='...'
                        value={telephone}
                        onChange={e => setTelephone(e.target.value)}
                    />
                    <Button
                        onClick={() => handleUpdateInfo()}
                        name='Change Info'
                        color='green'
                        w='full'
                        type='reset' />
                </div>
            </Modal >
            <div id='container' onClick={(e) => closeModal(e.target.id)} className={`bg-black bg-opacity-20 fixed inset-0 -top-16 z-10 min-h-screen w-full  ${isOpenAdd === true ? "flex justify-center items-center" : "hidden"}`}>
                <div className='w-96 bg-white border rounded-xl '>
                    <form onSubmit={formik.handleSubmit} className='space-y-3 w-96 px-5 py-5 bg-white rounded-lg'>
                        <h1 className='text-center font-semibold text-xl'>Add Address</h1>
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
        </section>
    )
}

export default Address