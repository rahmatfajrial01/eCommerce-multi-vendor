import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Button } from '../../components/Button'
import Input from '../../components/Input'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductCategory } from '../../features/category/productCategorySlice'
import { getAllBrand } from '../../features/brand/brandSlice'
import { TiDeleteOutline } from 'react-icons/ti'


const Product = () => {
    const token = useSelector(state => state?.auth?.user?.token)
    const productCatState = useSelector(state => state?.productCategory)
    const brandState = useSelector(state => state?.brand)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllProductCategory())
        dispatch(getAllBrand())
    }, [])
    console.log(brandState.allBrand)


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
        // formik.setFieldValue('image', e.currentTarget.files[0]);
    }
    const handleResetPic = () => {
        setPicture('');
        // formik.setFieldValue('image', "");
    }

    return (
        <section className='p-5'>
            <div className='space-y-5'>
                <div className='bg-slate-200 p-5 rounded-xl'>
                    <div className='space-y-5'>
                        <Input
                            type="text"
                            name="title"
                            label="Product Name"
                            placeholder='...'
                        />
                        <Input
                            type="text"
                            name="desc"
                            label="Description"
                            placeholder='...'
                        />
                        <div className='text-sm'>
                            <label htmlFor="">Category</label>
                            <select className='w-full p-2 rounded-xl '>
                                <option>Choose</option>
                                {
                                    productCatState.allProductCategory && productCatState.allProductCategory.map((item, index) =>
                                        <option value={item._id} >{item?.title}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className='text-sm'>
                            <label htmlFor="">Brand</label>
                            <select className='w-full p-2 rounded-xl '>
                                <option>Choose</option>
                                {
                                    brandState.allBrand && brandState.allBrand.map((item, index) =>
                                        <option value={item._id} >{item?.title}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className='text-sm space-y-3'>
                            <label htmlFor="">Condition</label>
                            <div className='space-x-1'>
                                <input name='con' type="radio" />
                                <label htmlFor="">New</label>
                            </div>
                            <div className='space-x-1'>
                                <input name='con' type="radio" />
                                <label htmlFor="">Second</label>
                            </div>
                        </div>
                        <Input
                            type="number"
                            name="price"
                            label="Price"
                            placeholder='...'
                        />
                        <Input
                            type="number"
                            name="qty"
                            label="Qty"
                            placeholder='...'
                        />

                        <div className='w-36'>
                            {
                                picture
                                    ?
                                    <div className='relative'>
                                        <label htmlFor="img" className='flex justify-center bg-white'>
                                            <img className='h-32' src={URL.createObjectURL(picture)} alt="" />
                                            <TiDeleteOutline onClick={handleResetPic} className='text-4xl text-red-500 absolute top-2 right-2 bg-white rounded-full cursor-pointer' />
                                        </label>
                                    </div>
                                    :
                                    <label htmlFor="img" className='flex h-32 items-center justify-center p-20 bg-white rounded-xl'>
                                        <div>Click Here</div>
                                    </label>
                            }
                            {/* {formik.errors.image && formik.touched.image ? <p className='text-red-500'>{formik.errors.image}</p> : null} */}
                            <input onChange={handleChoose} type="file" id='img' className='hidden' />
                        </div>
                    </div>
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



            </div>
        </section >


    )
}

export default Product