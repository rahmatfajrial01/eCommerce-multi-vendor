import React from 'react'

const Order = () => {
    return (
        <section>
            <div className='container mx-auto space-y-2'>
                <div className='flex gap-5 w-full justify-between '>
                    <div className='h-5 bg-green-500 w-full'>WaitingPayment</div>
                    <div className='h-5 bg-green-500 w-full'>beingpackaged</div>
                    <div className='h-5 bg-green-500 w-full'>sended</div>
                    <div className='h-5 bg-green-500 w-full'>delivery</div>
                    <div className='h-5 bg-green-500 w-full'>history</div>
                    <div className='h-5 bg-green-500 w-full'></div>
                </div>
                <div className='h-36 flex gap-2 '>
                    <div className='w-1/6 bg-blue-500'></div>
                    <div className='w-5/6 bg-blue-500'></div>
                </div>
                <div className='h-36 flex gap-2 '>
                    <div className='w-1/6 bg-blue-500'></div>
                    <div className='w-5/6 bg-blue-500'></div>
                </div>

            </div>
        </section>
    )
}

export default Order