import React from 'react'
import { Button } from '../../components/Button'
import DataTable from '../../components/DataTable'
import Input from '../../components/Input'

const Category = () => {
    return (
        <section className='mt-4 px-4 overflow-x-auto space-y-3 w-full'>
            <div className='flex gap-3'>
                <Input
                    type="text"
                    name="category"
                    placeholder='Category...'
                />
                <Button
                    type='submit'
                    color='green'
                    name='Submit' />
            </div>
            <DataTable
                headerTitle={['Category', 'Created At', 'Action']}
            />
            {/* <div className='overflow-x-auto'>
                <table className='border w-full text-nowrap'>
                    <thead>
                        <tr className='border-2'>
                            <th className='text-start p-2'>no</th>
                            <th className='text-start p-2 '>Category</th>
                            <th className='text-start p-2'>Created AT</th>
                            <th className='text-start p-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-2 p-2'>
                            <td className='p-2'>1</td>
                            <td className='p-2'>anton </td>
                            <td className='p-2'>User</td>
                            <td className='p-2'>detail</td>
                        </tr>
                        <tr className='border-2'>
                            <td className='p-2'>2</td>
                            <td className='p-2'>budi</td>
                            <td className='p-2'>User</td>
                            <td className='p-2'> detail</td>
                        </tr>
                        <tr className='border-2'>
                            <td className='p-2'>3</td>
                            <td className='p-2'>yanton</td>
                            <td className='p-2'>User</td>
                            <td className='p-2'>detail</td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
        </section>
    )
}

export default Category