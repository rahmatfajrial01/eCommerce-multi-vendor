import React from 'react'

const Detail = () => {
    return (
        <section>
            <div className='flex gap-1 pt-4 container mx-auto'>
                <div className='h-96 w-1/2 flex gap-1 border'>
                    <div className='w-1/5 flex flex-col gap-1'>
                        <div className='h-20 bg-green-500'></div>
                        <div className='h-20 bg-green-500'></div>
                        <div className='h-20 bg-green-500'></div>
                        <div className='h-20 bg-green-500'></div>
                        <div className='h-20 bg-green-500'></div>
                    </div>
                    <div className='bg-green-500 w-4/5'></div>
                </div>
                <div className='h-96 bg-green-500 w-1/2'></div>
            </div>
        </section>
    )
}

export default Detail