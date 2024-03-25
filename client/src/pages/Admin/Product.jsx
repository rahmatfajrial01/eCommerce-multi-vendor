import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Button } from '../../components/Button'
import Input from '../../components/Input'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductCategory } from '../../features/category/productCategorySlice'
import { getAllBrand } from '../../features/brand/brandSlice'
import { TiDeleteOutline } from 'react-icons/ti'
import * as yup from 'yup';
import { useFormik } from 'formik'
import { createProduct, getSingleProduct, resetState, updateProduct } from '../../features/product/productSlice'
import { useNavigate } from 'react-router-dom'
import { GrUpdate } from 'react-icons/gr'


const Product = () => {
    const token = useSelector(state => state?.auth?.user?.token)
    const productCatState = useSelector(state => state?.productCategory)
    const brandState = useSelector(state => state?.brand)
    const shopeState = useSelector(state => state?.shope)
    const productState = useSelector(state => state?.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getSlug = location?.pathname?.split('/')[3]

    console.log(productState?.singleProduct)

    useEffect(() => {
        dispatch(getAllProductCategory())
        dispatch(getAllBrand())
    }, [])

    useEffect(() => {
        dispatch(getSingleProduct(getSlug))
    }, [])
    // console.log(shopeState?.currentShope?.shope[0]?._id)


    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const options2 = [
        { value: 'sm', label: 'sm' },
        { value: 'md', label: 'md' },
        { value: 'lg', label: 'lg' }
    ]
    const options3 = [
        { value: 'premium', label: 'premium' },
        { value: 'basic', label: 'basic' },
    ]

    let [color, setColor] = useState([{ value: '', label: '' }])
    let [size, setSize] = useState([{ value: '', label: '' }])
    let [type, setType] = useState([{ value: '', label: '' }])

    let [varian, setVariant] = useState(false)
    let [varianColor, setVariantColor] = useState(false)
    let [varianSize, setVariantSize] = useState(false)
    let [varianType, setVariantType] = useState(false)

    let result = []

    for (let i = 0; i < color?.length; i++) {
        for (let j = 0; j < size?.length; j++) {
            for (let k = 0; k < type?.length; k++) {
                result += color[i].value + " " + size[j].value + " " + type[k].value + "-"
            }
        }
    }

    // console.log(result.length > 1 && result.split('-').slice(0, -1))
    // console.log(result.split('-').slice(0, -1))

    let handleColor = (e) => {
        setColor(e)
    }
    let handleSize = (e) => {
        setSize(e)
    }
    let handleType = (e) => {
        setType(e)
    }

    let handleVariant = () => {
        setVariant(click => !click)
        handleReset()
    }

    let handleReset = () => {
        setColor([{ value: '', label: '' }])
        setSize([{ value: '', label: '' }])
        setType([{ value: '', label: '' }])
        setVariantColor(false)
        setVariantSize(false)
        setVariantType(false)
    }

    //color
    let handleVariantColor = () => {
        setVariantColor(true)
    }
    let handleVariantColorfalse = () => {
        setColor([{ value: '', label: '' }])
        setVariantColor(false)
    }

    //size
    let handleVariantSize = () => {
        setVariantSize(true)
    }
    let handleVariantSizefalse = () => {
        setSize([{ value: '', label: '' }])
        setVariantSize(false)
    }

    //type
    let handleVariantType = () => {
        setVariantType(true)
    }
    let handleVariantTypefalse = () => {
        setType([{ value: '', label: '' }])
        setVariantType(false)
    }

    const [picture, setPicture] = useState('')
    const handleChoose = (e) => {
        const file = e.target.files[0];
        setPicture(file);
        formik.setFieldValue('image', e.currentTarget.files[0]);
    }
    const handleResetPic = () => {
        setPicture('');
        formik.setFieldValue('image', "");
    }


    const Schema = yup.object({
        title: yup.string().required('Product Name is required'),
        description: yup.string().required('Description is required'),
        price: yup.number().required('Price is required'),
        weight: yup.number().required('Weight is required'),
        category: yup.string().required('Category is required'),
        brand: yup.string().required('brand is required'),
        quantity: yup.number().required('quantity is required'),
        tag: yup.string().required('tag is required'),
        image: yup.mixed().required("image is required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: productState?.singleProduct?.title || '',
            description: productState?.singleProduct?.description || '',
            price: productState?.singleProduct?.price || '',
            weight: productState?.singleProduct?.weight || '',
            category: productState?.singleProduct?.category || '',
            brand: productState?.singleProduct?.brand || '',
            quantity: productState?.singleProduct?.quantity || '',
            tag: productState?.singleProduct?.tag || '',
            image: productState?.singleProduct?.images?.url || '',
        },
        validationSchema: Schema,
        onSubmit: (values, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2));
            // console.log(value)
            // if (productCatState?.productCategory) {
            // const data = { token, values, id: productCatState.productCategory._id }
            // dispatch(updateProductCategory(data))
            // } else {

            const data = new FormData()
            data.append('title', values.title)
            data.append('description', values.description)
            data.append('price', values.price)
            data.append('weight', values.weight)
            data.append('category', values.category)
            data.append('brand', values.brand)
            data.append('quantity', values.quantity)
            data.append('tag', values.tag)
            data.append('shope', shopeState?.currentShope?.shope[0]?._id)
            data.append('shopeName', shopeState?.currentShope?.shope[0]?.shopeName)
            data.append('image', values.image)
            if (productState?.singleProduct) {
                let dataProducts = { token, data, id: productState?.singleProduct._id }
                dispatch(updateProduct(dataProducts))
                // console.log(dataProducts)
            } else {
                let dataProducts = { token, data }
                dispatch(createProduct(dataProducts))
            }
            // resetForm()
            // }
        },
    });

    useEffect(() => {
        if (productState.productCreated !== null && productState.isError === false) {
            navigate('/admin/list-product')
            dispatch(resetState())
        } else if (productState.productUpdated !== null && productState.isError === false) {
            navigate('/admin/list-product')
            dispatch(resetState())
        }
    }, [productState?.productCreated, productState?.productUpdated])

    return (
        <section className='p-5'>
            <div className='space-y-5'>
                <div className='bg-slate-200 p-5 rounded-xl'>
                    <form onSubmit={formik.handleSubmit} className='space-y-5 text-sm'>
                        <div>
                            <Input
                                type="text"
                                name="title"
                                label="Product Name"
                                placeholder='...'
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.title && formik.touched.title ? <p className='text-red-500'>{formik.errors.title}</p> : null}
                        </div>
                        <div>
                            <Input
                                type="text"
                                name="description"
                                label="Description"
                                placeholder='...'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.description && formik.touched.description ? <p className='text-red-500'>{formik.errors.description}</p> : null}
                        </div>
                        <div className='text-sm'>
                            <div>
                                <label htmlFor="">Category</label>
                                <select
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='w-full p-2 rounded-xl'>
                                    <option value=''>Choose</option>
                                    {
                                        productCatState.allProductCategory && productCatState.allProductCategory.map((item, index) =>
                                            <option key={index} value={item._id} >{item?.title}</option>
                                        )
                                    }
                                </select>
                                {formik.errors.category && formik.touched.category ? <p className='text-red-500'>{formik.errors.category}</p> : null}
                            </div>
                        </div>
                        <div className='text-sm'>
                            <label htmlFor="">Brand</label>
                            <select
                                name="brand"
                                value={formik.values.brand}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='w-full p-2 rounded-xl '>
                                <option value=''>Choose</option>
                                {
                                    brandState.allBrand && brandState.allBrand.map((item, index) =>
                                        <option key={index} value={item._id} >{item?.title}</option>
                                    )
                                }
                            </select>
                            {formik.errors.brand && formik.touched.brand ? <p className='text-red-500'>{formik.errors.brand}</p> : null}
                        </div>
                        <div
                            value={formik.values.tag}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='text-sm space-y-3'>
                            <label htmlFor="">Tag</label>
                            <div className='space-x-1'>
                                <input checked={formik.values.tag === 'Featured'} name='tag' value="Featured" type="radio" readOnly />
                                <label htmlFor="">Featured</label>
                            </div>
                            <div className='space-x-1'>
                                <input checked={formik.values.tag === "Basic"} name='tag' value="Basic" type="radio" readOnly />
                                <label htmlFor="">Basic</label>
                            </div>
                            {formik.errors.tag && formik.touched.tag ? <p className='text-red-500'>{formik.errors.tag}</p> : null}
                        </div>
                        <div>
                            <Input
                                type="number"
                                name="price"
                                label="Price"
                                placeholder='...'
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.price && formik.touched.price ? <p className='text-red-500'>{formik.errors.price}</p> : null}
                        </div>
                        <div>
                            <Input
                                type="number"
                                name="weight"
                                label="Weight"
                                placeholder='...'
                                value={formik.values.weight}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.weight && formik.touched.weight ? <p className='text-red-500'>{formik.errors.weight}</p> : null}
                        </div>
                        <div>
                            <Input
                                type="number"
                                name="quantity"
                                label="Qty"
                                placeholder='...'
                                value={formik.values.quantity}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.quantity && formik.touched.quantity ? <p className='text-red-500'>{formik.errors.quantity}</p> : null}
                        </div>

                        <div className='w-36'>
                            {
                                picture
                                    ?
                                    <div className='relative'>
                                        <div className='flex justify-center bg-white'>
                                            <img className='h-32' src={URL.createObjectURL(picture)} alt="" />
                                        </div>
                                        <label htmlFor="img" >
                                            {
                                                productState?.singleProduct
                                                    ?
                                                    <GrUpdate size={40} className='text-black absolute top-2 right-2 bg-white rounded-full cursor-pointer p-2' />
                                                    :
                                                    <TiDeleteOutline onClick={handleReset} className='text-4xl text-red-500 absolute top-2 right-2 bg-white rounded-full cursor-pointer' />
                                            }
                                        </label>
                                    </div>
                                    :
                                    productState?.singleProduct?.images?.url
                                        ?
                                        <div className='relative'>
                                            <div className='flex justify-center bg-white'>
                                                <div>
                                                    <img className='h-32' src={productState?.singleProduct?.images?.url} alt="" />
                                                </div>
                                                <label htmlFor="img">
                                                    {/* {
                                                    brandState?.isLoading
                                                        ?
                                                        <AiOutlineLoading3Quarters size={40} className='text-black absolute top-2 right-2 animate-spin  bg-white rounded-full p-2' />
                                                        : */}
                                                    <GrUpdate size={40} className='text-black absolute top-2 right-2 bg-white rounded-full cursor-pointer p-2' />
                                                    {/* } */}
                                                </label>
                                            </div>
                                        </div>
                                        :
                                        <label htmlFor="img" className='flex h-32 items-center justify-center p-20 bg-white rounded-xl'>
                                            <div>Click Here</div>
                                        </label>
                            }
                            {/* {formik.errors.image && formik.touched.image ? <p className='text-red-500'>{formik.errors.image}</p> : null} */}
                            <input onChange={handleChoose} type="file" id='img' className='hidden' />
                            {formik.errors.image && formik.touched.image ? <p className='text-red-500'>{formik.errors.image}</p> : null}

                        </div>
                        <Button
                            color='green'
                            type='submit'
                            name={productState.isLoading ? "Loading..." : "Submit"}
                        />
                    </form>
                </div>

                <div className='p-5 bg-slate-200 rounded-xl space-y-5'>
                    <div className='flex'>
                        <Button
                            color='green'
                            type='button'
                            name={varian ? "No Variant" : "More Variant"}
                            onClick={handleVariant} />
                    </div>
                    {
                        varian &&
                        <>
                            <div className='flex gap-3'>
                                <div className='flex items-center gap-1'>
                                    <Button
                                        name="color"
                                        color='blue'
                                        type='button'
                                        onClick={handleVariantColor}
                                    />
                                    {/* <label htmlFor="">Color</label> */}
                                </div>
                                <div className='flex items-center gap-1'>
                                    <Button
                                        name="size"
                                        color='blue'
                                        type='button'
                                        onClick={handleVariantSize}
                                    />
                                    {/* <label htmlFor="">Size</label> */}
                                </div>
                                <div className='flex items-center gap-1'>
                                    <Button
                                        name="type"
                                        color='blue'
                                        type='button'
                                        onClick={handleVariantType}
                                    />
                                    {/* <label htmlFor="">Type</label> */}
                                </div>
                                <Button
                                    color='red'
                                    type='button'
                                    name={"Reset"}
                                    onClick={handleReset} />
                            </div>
                            <div className='space-y-1'>
                                {
                                    varianColor &&
                                    <>
                                        <label htmlFor="">color</label>
                                        <div className='flex gap-3'>
                                            <div className='w-5/6'>
                                                <Select
                                                    onChange={handleColor}
                                                    isMulti
                                                    options={options} />
                                            </div>
                                            <button className='' onClick={handleVariantColorfalse}>X</button>
                                        </div>
                                    </>
                                }
                                {
                                    varianSize &&
                                    <>
                                        <label htmlFor="">Size</label>
                                        <div className='flex gap-3'>
                                            <div className='w-5/6'>
                                                <Select
                                                    onChange={handleSize}
                                                    isMulti
                                                    options={options2} />
                                            </div>
                                            <button className='' onClick={handleVariantSizefalse}>X</button>
                                        </div>
                                    </>
                                }
                                {
                                    varianType &&
                                    <>
                                        <label htmlFor="">Type</label>
                                        <div className='flex gap-3'>
                                            <div className='w-5/6'>
                                                <Select
                                                    onChange={handleType}
                                                    isMulti
                                                    options={options3} />
                                            </div>
                                            <button className='' onClick={handleVariantTypefalse}>X</button>
                                        </div>
                                    </>
                                }
                                {
                                    varianColor || varianSize || varianType ?
                                        <div className='flex flex-col'>
                                            {
                                                result?.length > 0 &&
                                                result?.split("-")?.slice(0, -1)?.map((item, index) =>
                                                    <div key={index} className='flex gap-3 border p-1'>
                                                        <div className='flex flex-col p-1'>
                                                            <label className='font-semibold'>variation</label>
                                                            <label htmlFor="">{item ? item : ""}</label>
                                                        </div>
                                                        <div className='flex flex-col p-1'>
                                                            <label className='font-semibold' htmlFor="">harga</label>
                                                            <input type="text" className='border' />
                                                        </div>
                                                        <div className='flex flex-col p-1'>
                                                            <label className='font-semibold' htmlFor="">stock</label>
                                                            <input type="text" className='border' />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        :
                                        ""
                                }
                            </div>
                        </>
                    }
                </div>



            </div >
        </section >


    )
}

export default Product