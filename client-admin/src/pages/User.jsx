import React from 'react'

const User = () => {
    return (
        <section className='mt-4 px-4 overflow-x-auto  w-full'>
            <div className='overflow-x-auto'>
                <table className='border w-full text-nowrap'>
                    <thead>
                        <tr className='border-2'>
                            <th className='text-start p-2'>no</th>
                            <th className='text-start p-2 '>User</th>
                            <th className='text-start p-2'>Role</th>
                            <th className='text-start p-2'>Status</th>
                            <th className='text-start p-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-2 p-2'>
                            <td className='p-2'>1</td>
                            <td className='p-2'>anton fergusos asdas  asdasd adasdsad</td>
                            <td className='p-2'>User</td>
                            <td className='p-2'>actives</td>
                            <td className='p-2'>detail</td>
                        </tr>
                        <tr className='border-2'>
                            <td className='p-2'>2</td>
                            <td className='p-2'>budi</td>
                            <td className='p-2'>User</td>
                            <td className='p-2'>actives</td>
                            <td className='p-2'> detail</td>
                        </tr>
                        <tr className='border-2'>
                            <td className='p-2'>3</td>
                            <td className='p-2'>yanton</td>
                            <td className='p-2'>User</td>
                            <td className='p-2'>actives</td>
                            <td className='p-2'>detail</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default User