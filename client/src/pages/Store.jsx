import React from 'react'

const Store = () => {
    return (
        <section>
            <div className='flex gap-3 container mx-auto'>
                <div className=' w-1/5 flex flex-col gap-2'>
                    <div className='h-10 bg-green-500'></div>
                    <div className='h-52 bg-green-500'></div>
                    <div className='h-52 bg-green-500'></div>
                    <div className='h-52 bg-green-500'></div>
                </div>
                <div className='w-4/5 flex flex-col gap-3'>
                    <div className='h-10 bg-green-500'></div>
                    <div className=' grid grid-cols-5 gap-2'>
                        <div className='h-40 bg-green-500'></div>
                        <div className='h-40 bg-green-500'></div>
                        <div className='h-40 bg-green-500'></div>
                        <div className='h-40 bg-green-500'></div>
                        <div className='h-40 bg-green-500'></div>
                        <div className='h-40 bg-green-500'></div>
                        <div className='h-40 bg-green-500'></div>
                        <div className='h-40 bg-green-500'></div>
                        <div className='h-40 bg-green-500'></div>
                        <div className='h-40 bg-green-500'></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Store