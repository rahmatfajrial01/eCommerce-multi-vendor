import React, { useState } from 'react'
import Select from 'react-select'



const Product = () => {
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

    let result = []

    for (let i = 0; i < color?.length; i++) {
        for (let j = 0; j < size?.length; j++) {
            for (let k = 0; k < type?.length; k++) {
                result += color[i].value + ' ' + size[j].value + ' ' + type[k].value + '-'
            }
        }
    }

    console.log(result.split('-').slice(0, -1))
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

    return (
        <section className='pt-5 space-y-5'>
            <div>
                <label htmlFor="">color</label>
                <Select
                    onChange={handleColor}
                    isMulti
                    options={options} />
            </div>
            <div>
                <label htmlFor="">size</label>
                <Select
                    onChange={handleSize}
                    isMulti
                    options={options2} />
            </div>
            <div>
                <label htmlFor="">size</label>
                <Select
                    onChange={handleType}
                    isMulti
                    options={options3} />
            </div>
            <div className='flex flex-col'>
                {/* {
                    result &&
                    result?.split("-")?.slice(0, -1)?.map((item, index) =>
                        <div key={index} className='flex gap-3 border p-1'>
                            <div className='flex flex-col p-1'>
                                <label className='font-semibold'>variation</label>
                                <label htmlFor="">{item ? item : "no data"}</label>
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
                } */}
            </div>
        </section>


    )
}

export default Product