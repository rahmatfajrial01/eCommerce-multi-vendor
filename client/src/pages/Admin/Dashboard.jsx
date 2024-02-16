import React from 'react'

const Dashboard = () => {
    return (
        <section className='w-full mt-4 px-4'>
            <div className='flex gap-5'>
                <div className='flex justify-between w-full bg-slate-200 rounded-xl  p-3'>
                    <p>Admin</p>
                    <p>5</p>
                </div>
                <div className='flex justify-between w-full bg-slate-200 rounded-xl p-3'>
                    <p>Seller</p>
                    <p>5</p>
                </div>
                <div className='flex justify-between w-full bg-slate-200 rounded-xl p-3'>
                    <p>Buyer</p>
                    <p>5</p>
                </div>
                <div className='flex justify-between w-full bg-slate-200 rounded-xl p-3'>
                    <p>Product</p>
                    <p>5</p>
                </div>
            </div>

        </section>
    )
}

export default Dashboard