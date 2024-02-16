import React, { useState } from 'react'
import { Button } from '../../components/Button'
import DataTable from '../../components/DataTable'
import Input from '../../components/Input'
import { TiDeleteOutline } from "react-icons/ti";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Banner = () => {
    const [picture, setPicture] = useState('')
    const handleChoose = (e) => {
        const file = e.target.files[0];
        setPicture(file);
    }

    const handleReset = () => {
        setPicture('');
    }

    return (
        <section className='p-5 space-y-5'>
            <div>admin / banner</div>
            <div className='flex gap-5 p-5 bg-slate-200 rounded-xl '>
                <div className='w-full'>
                    {
                        picture
                            ?
                            <div className='relative'>
                                <label htmlFor="img" className='flex justify-center bg-white'>
                                    <img className='h-80' src={URL.createObjectURL(picture)} alt="" />
                                    <TiDeleteOutline onClick={handleReset} className='text-4xl text-red-500 absolute top-2 right-2 bg-white rounded-full cursor-pointer' />
                                </label>
                            </div>
                            :
                            <label htmlFor="img" className='flex h-80 items-center justify-center p-20 bg-white rounded-xl'>
                                <div>Click Here</div>
                            </label>
                    }
                    <input onChange={handleChoose} type="file" id='img' className='hidden' />
                </div>
                <div className='space-y-4'>
                    <Input
                        type="text"
                        name="bannerType"
                        label="Banner Type"
                        placeholder='...'
                    />
                    <Input
                        type="text"
                        name="bannerName"
                        label="Banner Name"
                        placeholder='...'
                    />
                    <Button
                        name='submit'
                        color='green'
                        w='full'
                    />
                </div>

            </div>
            <DataTable
                headerTitle={['Banner Name', 'Created At', 'Action']}
            >
                <tr className='border-2 p-2'>
                    <td className='p-2'>Main Banner</td>
                    <td className='p-2'>one day</td>
                    <td className='p-2 flex gap-3 '>
                        <FaTrashAlt className='cursor-pointer hover:text-red-500' />
                        <FaEdit className='cursor-pointer hover:text-yellow-500' />
                    </td>
                </tr>
            </DataTable>
        </section>
    )
}

export default Banner